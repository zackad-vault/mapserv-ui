'use strict';

import '../scss/style.scss';
import '../index.html';
import Vue from 'vue';
import Map from 'ol/map';
import View from 'ol/view';
import Proj from 'ol/proj';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';
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
            base_url: '',
            rawDataCapability: '',
            status: ''
        }
    }
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
    layers: [
        new Tile({
            source: new OSM()
        })
    ],
    controls: DefaultControl.defaults({
        attributionOptions: ({
            collapsible: false
        })
    }).extend([scaleLine])
});

document.addEventListener('DOMContentLoaded', updateStatus);
document.querySelectorAll('#input .inspect-button')[0].addEventListener('click', inspectWMS);
document.querySelectorAll('#input #url')[0].addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        inspectWMS();
    }
});
map.getView().on(['change'], updateStatus);

function inspectWMS() {
    var wms_url = NormalizeUrl(app.wms.base_url + Config.url.query.capability);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = xhrListener;
    xhr.open('GET', wms_url);
    xhr.send();
}

function xhrListener() {
    console.log(this.statusText);
    app.wms.status = this.statusText;
    if (this.status !== 200) {
        app.wms.rawDataCapability = ''
            + Config.error.general
            + this.getAllResponseHeaders();
    } else {
        app.wms.rawDataCapability = this.responseText;
    }
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
