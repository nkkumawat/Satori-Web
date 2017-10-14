(function() {
	"use strict";

	if(typeof QuickSettings === "undefined") return;

	var urlMap 	= {
		"basic - face tracking - candide overlay":				"js/examples/face_tracking/candide_overlay.js",
		"intermediate - face tracking - smile detection":		"js/examples/face_tracking/smile_detection.js",
		"intermediate - face tracking - png/mask overlay":		"js/examples/face_tracking/png_mask_overlay.js",
		"advanced - face tracking - ThreeJS example":			"js/examples/face_tracking/ThreeJS_example.js",
		"advanced - face tracking - face texture overlay":		["assets/brfv4_face_textures.js", "js/examples/face_tracking/face_texture_overlay.js"]
	};
	var labels = [];
	for (var key in urlMap) { labels.push(key); } // Fill in the labels.

	function onExampleLoaded() {
		brfv4Example.reinit();
	}

	var _isFirstSelect = true;
	function onExampleChosen(data) {

		if(_isFirstSelect) return;

		var url = urlMap[data.value];

		if(url) {
			if(typeof url === "string") {
				brfv4Example.loader.loadExample([url], onExampleLoaded);
			} else {
				brfv4Example.loader.loadExample(url, onExampleLoaded);
			}
		} else {
			if(data.index >= 0) {
				brfv4Example.gui.exampleChooser.setValuesFromJSON({ "_example": data.index + 1});
			}
		}
	}

	if(!brfv4Example.gui.exampleChooser) {

		QuickSettings.useExtStyleSheet();

		brfv4Example.gui.exampleChooser = QuickSettings.create(
			2, 2, "Example Chooser", brfv4Example.dom.createDiv("_settingsRight"))
			.setWidth(250)
			.addHTML("Switch between examples", "Which example do you want to try? Use the drop down to choose another example.").hideTitle("Switch between examples")
			.addDropDown("_example", labels, onExampleChosen)
			.hideTitle("_example")
			.setValuesFromJSON({ "_example": 1}); // "basic - face tracking - track single face"

		_isFirstSelect = false;
	}
})();