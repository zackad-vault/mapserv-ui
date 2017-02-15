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
        editItem: editItem,
        removeItem: removeItem,
        getCapabilities: getWMSCapabilities,
        showList: getLayerList,
        showOnMap: showOnMap,
        updateLayer: updateLayer
    }
});

checkExistingHost();
