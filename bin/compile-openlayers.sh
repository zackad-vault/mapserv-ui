#!/bin/bash
if [[ "$(docker images -q zackad/openlayers-compiler 2> /dev/null)" == "" ]]; then
	echo "zackad/openlayers-compiler image is not found, pulling from docker hub ...";
	docker pull zackad/openlayers-compiler:latest;
else
	echo "zackad/openlayers-compiler image found.";
fi
echo "Compiling openlayers library ... "
docker run --rm --user $(id -u):$(id -g) --volume $(pwd):/build zackad/openlayers-compiler:latest src/ol-custom.json src/js/ol.js
