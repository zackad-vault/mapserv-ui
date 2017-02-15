/**
 * WMS function handlers
 */

function getWMSCapabilities(url, server) {
    loadingStart();
    var capabilitiesRequestUrl = url + '&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            app.info.detail = this.responseText;
            loadingEnd();
            return this.response;
        } else {
            // loadingEnd();
            app.info.detail = "Not Found";
        }
    }
    xhr.open('GET', capabilitiesRequestUrl);
    xhr.send();
}

function getLayerList(server) {
    loadingStart();
    var url = server.url;
    var capabilitiesRequestUrl = url + '&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = (new DOMParser()).parseFromString(this.responseText, "application/xml");
            var layers = result.querySelectorAll('Layer[queryable]');
            var layerList = [];
            layers.forEach(function(item, index){
                layerList.push({
                    name: item.querySelector('Name').innerHTML,
                    title: item.querySelector('Title').innerHTML
                });
            });
            server.layers = layerList;
            log(layerList);
            app.info.detail = this.responseText;
            loadingEnd();
            return this.response;
        } else {
            loadingEnd();
            app.info.detail = "Not Found";
        }
    }
    xhr.open('GET', capabilitiesRequestUrl);
    xhr.send();
}
