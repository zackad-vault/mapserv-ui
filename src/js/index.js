'use strict';

import '../scss/style.scss';
import '../index.html';
import Vue from 'vue';
import Map from 'ol/map';
import View from 'ol/view';
import Proj from 'ol/proj';
import Extent from 'ol/extent';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
import TileWMS from 'ol/source/tilewms';
import ScaleLine from 'ol/control/scaleline';
import DefaultControl from 'ol/control';
import NormalizeUrl from 'normalize-url';
import Config from './config.js';

/**
 * VueJS application object instantiation
 * @type {Vue}
 */
var app = new Vue({
    el: '#app',
    data: {
        zoomLevel: '',
        mapCenter: '',
        srs: '',
        wms: {
            baseUrl: '',
            layers: [],
            rawDataCapability: '',
            status: ''
        }
    },
    methods: {
        toggleTransparentBackground: toggleTransparentBackground,
        updateWMSParams: updateWMSParams
    }
});

/**
 * OSL layer tile
 * @type {Tile}
 */
var osmLayer = new Tile({
    source: new OSM()
});

/**
 * Add scale bar into map
 * @type {ScaleLine}
 */
var scaleLine = new ScaleLine();

/**
 * ol.Map object with OSM as base map
 * @type {Map}
 */
var map = new Map({
    target: 'map_canvas',
    view: new View(Config.view),
    layers: [osmLayer],
    controls: DefaultControl.defaults({
        attributionOptions: ({
            collapsible: false
        })
    }).extend([scaleLine])
});

var wmsSource = new TileWMS({
    url: '',
    serverType: 'mapserver',
    params: {
        LAYERS: '',
        TRANSPARENT: true
    }
});

/**
 * wmsLayer object instantiaton with TileWMS
 * @type {Tile}
 */
var wmsLayer = new Tile();

wmsLayer.setSource(wmsSource);

map.addLayer(wmsLayer);

/**
 * Event listener
 */
document.addEventListener('DOMContentLoaded', updateStatus);
document.querySelectorAll('#input .inspect-button')[0].addEventListener('click', inspectWMS);
document.querySelectorAll('#input #url')[0].addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        inspectWMS();
    }
});
map.getView().on(['change'], updateStatus);

function extractLayerInfo(element) {
    var el = element;
    // Bounding box
    var bb = el.querySelectorAll('EX_GeographicBoundingBox > *');
    var boundingBox = [
        parseFloat(bb[0].textContent),
        parseFloat(bb[2].textContent),
        parseFloat(bb[1].textContent),
        parseFloat(bb[3].textContent)
    ];
    return {
        name: el.querySelector('Name').innerHTML,
        title: el.querySelector('Title').innerHTML,
        legendUrl: el.querySelector('Style LegendURL OnlineResource')
            .getAttribute('xlink:href'),
        boundingBox: boundingBox
    }
}

function inspectWMS() {
    resetWMS();
    var wmsUrl = NormalizeUrl(app.wms.baseUrl + Config.url.query.capability);
    wmsSource.setUrl(wmsUrl);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = xhrListener;
    xhr.open('GET', wmsUrl);
    xhr.send();
}

function resetWMS() {
    app.wms.rawDataCapability = '';
    app.wms.layers = [];
    app.wms.status = '';
}

function xhrListener() {
    app.wms.status = this.statusText;
    if (this.status !== 200) {
        app.wms.rawDataCapability = ''
            + Config.error.general
            + this.getAllResponseHeaders();
    } else {
        var result = (new DOMParser())
            .parseFromString(this.responseText, 'application/xml');
        var layers = result.querySelectorAll('Layer[queryable]');
        var layerList = [];
        var layerNames = [];
        var extent = new Extent.createEmpty();
        layers.forEach(function(item, index){
            layerList.push(extractLayerInfo(item));
            layerNames.push(item.querySelector('Name').innerHTML);
            Extent.extend(extent, extractLayerInfo(item).boundingBox);
        });
        map.getView().fit(extent, map.getSize());
        updateStatus();
        wmsSource.updateParams({LAYERS: layerNames});
        toggleTransparentBackground();
        app.wms.layers = layerList;
        app.wms.rawDataCapability = this.responseText;
    }
}

function toggleTransparentBackground() {
    var tgValue = document.querySelector('input[name="transparent"]').checked;
    osmLayer.setVisible(tgValue);
    wmsSource.updateParams({
        TRANSPARENT: tgValue
    });
}

/**
 * update status bar on view change
 */
function updateStatus() {
    app.zoomLevel = map.getView().getZoom();
    var center = map.getView().getCenter();
    center = [center[0].toFixed(6), center[1].toFixed(6)];
    app.mapCenter = center.toString();
    app.srs = map.getView().getProjection().getCode();
}

function updateWMSParams() {
    var checkbox = document.querySelectorAll('#info input:checked');
    var layersName = [];
    checkbox.forEach(function(item, index) {
        layersName.push(item.value);
    });
    wmsSource.updateParams({LAYERS: layersName});
}
