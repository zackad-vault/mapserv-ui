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

/**
 * VueJS application object instantiation
 * @type {Vue}
 */
var app = new Vue({
    el: '#app',
    data: {
        zoomLevel: '',
        mapCenter: '',
        srs: ''
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
    view: new View({
        center: [107.4, -6.74],
        zoom: 2,
        maxZoom: 22,
        minZoom: 1,
        projection: 'EPSG:4326'
    }),
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
map.getView().on(['change'], updateStatus);

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
