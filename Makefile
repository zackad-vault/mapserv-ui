help:
	@echo "MapServer UI"
	@echo "Avalaible command"
	@echo " - make                  show this help"
	@echo " - make start-develop    install all the necessary assets and configure it"
	@echo " - make compile          compile project for production environment"
	@echo " - make livereload       autoreload browser when source file is changed"
	@echo " - make watch            compile stylesheet in realtime"
	@echo " - make ol-custom        compile custom (minimal) openlayers library"
	@echo "--------------------------------------------------------------------------"
	@sh bin/tool-checking.sh

start-develop: install-assets copy-assets

install-assets:
	bower install

copy-assets:
	@echo "Copying nesessary assets into src diretory ...\n"
	mkdir -p src/assets/skeleton/scss/
	mkdir -p src/css/
	mkdir -p src/fonts/
	mkdir -p src/js/
	mkdir -p src/scss/
	cp src/assets/vue/dist/vue.js src/js/vue.js
	cp src/assets/font-awesome/fonts/* src/fonts/
	cp src/assets/openlayers/ol.js src/js/ol.js
	cp src/assets/openlayers/ol.css src/assets/openlayers/ol.scss
	cp src/assets/skeleton/css/skeleton.css src/assets/skeleton/scss/skeleton.scss
	@echo "... OK"

compile: clean compile-sass copy-fonts compile-js compile-layout
	mkdir -p dist/img/
	cp src/img/favicon.png dist/img/favicon.png

compile-sass:
	mkdir -p dist/css/
	sass src/scss/style.scss:dist/css/style.min.css --style compressed

compile-js:
	mkdir -p dist/js/
	minify --output dist/js/main.min.js \
		src/js/ol.js \
		src/assets/vue/dist/vue.min.js \
		src/js/_function.js \
		src/js/_wms.js \
		src/js/_map.js \
		src/js/main.js

compile-layout:
	grep -vwE "(data-dev=\"true\")" src/index.html > dist/index.html

ol-custom:
	@echo "Compiling custom openlayers library ... "
	@sh bin/compile-openlayers.sh
	@echo "done."

copy-fonts:
	@echo "Copying font-awesome ... "
	mkdir -p dist/fonts/
	cp src/assets/font-awesome/fonts/* dist/fonts/
	@echo "done."

livereload:
	bundle exec guard

watch:
	sass --watch src/scss/style.scss:src/css/style.min.css --style compressed

clean:
	rm -rf dist/*
