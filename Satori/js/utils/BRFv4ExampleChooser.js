(function() {
	"use strict";

	if(typeof QuickSettings === "undefined") return;

	var urlMap 	= {
		"Candide":		"js/examples/candide_overlay.js",
		// "Smile detection":		"js/examples/smile_detection.js",
		"Face Draw":	"js/examples/png_mask_overlay.js",
		//"3D example":			"js/examples/ThreeJS_example.js",
		//"Face texture":			["assets/brfv4_face_textures.js", "js/examples/face_texture_overlay.js"]
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

	var mode_change = $('.mode-changer');

	mode_change.click(function () {
		var value = this.name;
		var index = this.about;
		var filters = $('.images');
		var change_mode = $('.change-mode');
		change_mode.html(value);
        if(_isFirstSelect) return;
        if(value === "Face Draw" ) {
           filters.addClass("disp-on");
           filters.removeClass("disp-off");
        }else {
            filters.addClass("disp-off");
            filters.removeClass("disp-on");
        }

        var url = urlMap[value];

        if(url) {
            if(typeof url === "string") {
                brfv4Example.loader.loadExample([url], onExampleLoaded);
            } else {
                brfv4Example.loader.loadExample(url, onExampleLoaded);
            }
        } else {
            if(data.index >= 0) {
                brfv4Example.gui.exampleChooser.setValuesFromJSON({ "_example": index + 1});
            }
        }
    });



	if(!brfv4Example.gui.exampleChooser) {

		// QuickSettings.useExtStyleSheet();
        //
		// brfv4Example.gui.exampleChooser = QuickSettings.create(
		// 	2, 2, "Example Chooser", brfv4Example.dom.createDiv("_settingsRight"))
		// 	.setWidth(250)
		// 	// .addHTML("Switch between examples", "Which example do you want to try? Use the drop down to choose another example.").hideTitle("Switch between examples")
		// 	.addDropDown("_example", labels, onExampleChosen)
		// 	.hideTitle("_example")
		// 	.setValuesFromJSON({ "_example": 0	}); // "basic - face tracking - track single face"

		_isFirstSelect = false;
	}
})();