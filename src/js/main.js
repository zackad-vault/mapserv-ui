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
        server: [],
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
        exampleHost: exampleHost,
        editItem: editItem,
        removeItem: removeItem,
        getWMSCapabilities: getWMSCapabilities,
        showLayerList: showLayerList,
        showOnMap: showOnMap,
        updateLayer: updateLayer
    }
});

checkExistingHost();
