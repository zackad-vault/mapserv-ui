/*!
 * Openlayers 3 with OpenStreetMap as base map
 */
var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var view = new ol.View({
    maxZoom: 21,
    projection: 'EPSG:4326',
    center: [106.95, -6.26],
    zoom: 10
});

var map = new ol.Map({
    layers: [
        osm
    ],
    target: 'map_canvas',
    controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: true
        })
    }),
    view: view
});

var wmsLayers = [];
