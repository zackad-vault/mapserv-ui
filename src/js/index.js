'use strict';

import '../scss/style.scss';
import '../index.html';
import Vue from 'vue';
import Map from 'ol/map';
import View from 'ol/view';
import Proj from 'ol/proj';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/osm';

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello'
    }
});

var map = new Map({
    target: 'map_canvas',
    view: new View({
        center: Proj.fromLonLat([107.4, -6.74]),
        zoom: 4
    }),
    layers: [
        new Tile({
            source: new OSM()
        })
    ]
});
