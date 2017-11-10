var config = {
    error: {
        general: ''
            + '<==================================================>.\n'
            + ' An error has occured, please check your url again.\n'
            + '<==================================================>.\n'
    },
    url: {
        query: {
            capability: '/&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'
        }
    },
    view: {
        projection: 'EPSG:4326',
        center: [107.4, -6.74],
        zoom: 2,
        maxZoom: 22,
        minZoom: 1
    }
};
module.exports = config;
