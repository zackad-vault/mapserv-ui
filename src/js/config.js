var config = {
    url: {
        query: {
            capability: '/&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities'
        }
    },
    error: {
        general: ''
            + '<==================================================>.\n'
            + ' An error has occured, please check your url again.\n'
            + '<==================================================>.\n'
    }
};
module.exports = config;
