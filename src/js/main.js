/**
 * Globar variable and configuration
 */
var DEBUG = true;

/*!
 * Vue Application
 */
var app = new Vue({
    el: '#app',
    data: {
        server: {
            layers: [],
            name: "",
            url: ""
        },
        input: {
            name: "",
            url: ""
        },
        info: {
            detail: '',
            summary: ''
        }
    },
    methods: {
        addWMSHost: addWMSHost,
        clearLocalStorage: clearLocalStorage,
        editItem: editItem,
        exampleHost: exampleHost,
        getWMSCapabilities: getWMSCapabilities,
        removeItem: removeItem,
        showLayerList: showLayerList,
        showOnMap: showOnMap,
        updateLayer: updateLayer
    }
});

checkExistingHost();
