var brfv4Example = {

	appId: "excal2017",
	loader: { queuePreloader: null },
	imageData: {
		webcam: { stream: null },
		picture: {}
	},
	dom: {},
	gui: {},
	drawing: {},
	drawing3d: {
		t3d: {}
	},
	stats: {}
};

var brfv4 = {locateFile: function(fileName) { return "js/libs/brf/BRFv4_JS_trial.js.mem"; }};

brfv4Example.start = function() {

	brfv4Example.loader.preload([

		"js/libs/brf/BRFv4_JS_trial.js",						// BRFv4 SDK

        "js/libs/adapter/adapter-latest.js",

		"js/libs/quicksettings/quicksettings.min.css",			// gui elements
		"js/libs/quicksettings/quicksettings.js",

		"js/libs/highlight/highlight_tomorrow.css",				// code highlighter
		"js/libs/highlight/highlight.pack.js",

		"js/libs/createjs/easeljs-0.8.2.min.js",				// canvas drawing lib
		"js/libs/threejs/three.js",								// ThreeJS: a 3D engine

		"js/utils/BRFv4DOMUtils.js",							// DOM handling

		"js/utils/BRFv4DrawingUtils_CreateJS.js",				// BRF result drawing
		"js/utils/BRFv4Drawing3DUtils_ThreeJS.js",				// ThreeJS 3d object placement.

		"js/utils/BRFv4SetupWebcam.js",							// webcam handling
		"js/utils/BRFv4SetupExample.js",						// overall example setup

		"js/utils/BRFv4PointUtils.js",							// some calculation helpers
  
		"js/utils/BRFv4ExampleChooser.js",						// gui: choose an example

		"js/examples/candide_overlay.js"		// start with this example

	], function() {
		brfv4Example.init("webcam");
	});
};

brfv4Example.trace = function(msg, error) {
	if(typeof window !== 'undefined' && window.console) {
		var now = (window.performance.now() / 1000).toFixed(3);
		if(error) {	window.console.error(now + ': ', msg); }
		else { window.console.log(now + ': ', msg); }
	}
};

(function () {
	"use strict";

	var loader = brfv4Example.loader;

	loader.preload = function (filesToLoad, callback) {

		if (loader.queuePreloader !== null || !filesToLoad) {
			return;
		}

		function onPreloadProgress(event) {
			loader.setProgressBar(event.loaded, true);
		}

		function onPreloadComplete(event) {
			loader.setProgressBar(1.0, false);
			if(callback) callback();
		}

		var queue = loader.queuePreloader = new createjs.LoadQueue(true);
		queue.on("progress", onPreloadProgress);
		queue.on("complete", onPreloadComplete);
		queue.loadManifest(filesToLoad, true);
	};

	loader.loadExample = function (filesToLoad, callback) {

		function onProgress(event) {
			loader.setProgressBar(event.loaded, true);
		}

		function onComplete(event) {
			loader.setProgressBar(1.0, false);
			if(callback) callback();
		}

		var queue = loader.queueExamples = new createjs.LoadQueue(true);
		queue.on("progress", onProgress);
		queue.on("complete", onComplete);
		queue.loadManifest(filesToLoad, true);
	};

	loader.setProgressBar = function(percent, visible) {
		var bar = document.getElementById("_progressBar");
		if(!bar) return;

		if(percent < 0.0) percent = 0.0;
		if(percent > 1.0) percent = 1.0;

		var width = Math.round(percent * 640);
		var color = 0xe7e7e7;

		bar.style.width = width + "px";
		bar.style.backgroundColor = "#" + color.toString(16);
		bar.style.display = visible ? "block" : "none";
	};
})();