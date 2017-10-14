(function exampleCode() {
	"use strict";

	brfv4Example.initCurrentExample = function(brfManager, resolution) {
		brfManager.init(resolution, resolution, brfv4Example.appId);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {
		brfManager.update(imageData);
		draw.clear();

		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
		draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		var faces = brfManager.getFaces();

		for(var i = 0; i < faces.length; i++) {

			var face = faces[i];

			if(	face.state === brfv4.BRFState.FACE_TRACKING) {
				draw.drawTriangles(	face.candideVertices, face.candideTriangles, false, 1.0, 0xffd200, 0.4);
				draw.drawVertices(	face.candideVertices, 2.0, false, 0xffd200, 0.4);

				draw.drawVertices(	face.vertices, 2.0, false, 0x00a1ff, 0.4);
			}
		}
	};
})();