/*!
 * Openlayers 3 with OpenStreetMap as base map
 */

/**
 * Open Street Map as base map
 * @type {ol.layer.Tile}
 */
var osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});

/**
 * Declare map view object with Geographic Coordinate System (longitude, lattitude)
 * @type {ol.View}
 */
var view = new ol.View({
    maxZoom: 21,
    projection: 'EPSG:4326',
    center: [106.95, -6.26],
    zoom: 10
});

/**
 * Instantiate openlayers map
 * @type {ol.Map}
 */
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

/**
 * Declare wms layer and add it to map
 * @type {ol.layer.Tile}
 */
var wmsLayer = new ol.layer.Tile();
map.addLayer(wmsLayer);
