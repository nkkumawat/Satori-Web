(function exampleCode() {
    "use strict";
    
    var numFacesToTrack = 2;
    
    brfv4Example.initCurrentExample = function (brfManager, resolution, draw) {
        
        brfManager.init(resolution, resolution, brfv4Example.appId);
        brfManager.setNumFacesToTrack(numFacesToTrack);
        
        var maxFaceSize = resolution.height;
        
        if (resolution.width < resolution.height) {
            maxFaceSize = resolution.width;
        }
        
        brfManager.setFaceDetectionParams(maxFaceSize * 0.20, maxFaceSize * 1.00, 12, 8);
        brfManager.setFaceTrackingStartParams(maxFaceSize * 0.20, maxFaceSize * 1.00, 32, 35, 32);
        brfManager.setFaceTrackingResetParams(maxFaceSize * 0.15, maxFaceSize * 1.00, 40, 55, 32);
        
        prepareImages(draw);
        
        draw.clickArea.addEventListener("click", onClicked);
        
        draw.clickArea.mouseEnabled = true;
    };
    
    brfv4Example.updateCurrentExample = function (brfManager, imageData, draw) {
        
        brfManager.update(imageData);
        
        draw.clear();
        
        var faces = brfManager.getFaces();
        
        for (var i = 0; i < faces.length; i++) {
            
            var face = faces[ i ];
            var baseNode = _baseNodes[ i ];
            
            if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
                face.state === brfv4.BRFState.FACE_TRACKING) {
                // Face Tracking results: 68 facial feature points
                // Set position to be nose top and calculate rotation.
                
                baseNode.x = face.points[ 27 ].x;
                baseNode.y = face.points[ 27 ].y;
                
                baseNode.scaleX = (face.scale / 480) * (1 - toDegree(Math.abs(face.rotationY)) / 110.0);
                baseNode.scaleY = (face.scale / 480) * (1 - toDegree(Math.abs(face.rotationX)) / 110.0);
                baseNode.rotation = toDegree(face.rotationZ);
                
                baseNode.alpha = 1.0;
                
            } else {
                
                baseNode.alpha = 0.0;
            }
        }
    };
    
    function onClicked(event) {
        var i = _images.indexOf(_image) + 1;
        
        if (i === _images.length) {
            i = 0;
        }
        
        _image = _images[ i ];
        changeImage(_image, i);
    }
    
    function changeImage(bitmap, index) {
        
        bitmap.scaleX = _imageScales[ index ];
        bitmap.scaleY = _imageScales[ index ];
        
        bitmap.x = -parseInt(bitmap.getBounds().width * bitmap.scaleX * 0.50);
        bitmap.y = -parseInt(bitmap.getBounds().height * bitmap.scaleY * 0.45);
        
        for (var i = 0; i < numFacesToTrack; i++) {
            
            var baseNode = _baseNodes[ i ];
            baseNode.removeAllChildren();
            
            if (i === 0) {
                baseNode.addChild(bitmap);
            } else {
                baseNode.addChild(bitmap.clone());
            }
        }
    }
    
    function prepareImages(draw) {
        
        draw.imageContainer.removeAllChildren();
        
        var i = 0;
        var l = 0;
        
        for (i = 0, l = numFacesToTrack; i < l; i++) {
            var baseNode = new createjs.Container();
            draw.imageContainer.addChild(baseNode);
            _baseNodes.push(baseNode);
        }
        
        for (i = 0, l = _imageURLs.length; i < l; i++) {
            _images[ i ] = new createjs.Bitmap(_imageURLs[ i ]);
            
            if (i === 0) {
                _image = _images[ i ];
                _image.image.onload = function () {
                    changeImage(_image, 0);
                }
            }
        }
    }
    
    var _imageURLs = [ "assets/brfv4_lion.png", "assets/brfv4_img_glasses.png", "assets/1.png", "assets/2.png", "assets/3.png", "assets/4.png", "assets/5.png", "assets/6.png", "assets/7.png" ];
    
    var _imageScales = [ 3.3, 1.0, 1.3, 1.55, 1.35, 1.5, 0.7, 1.1, 1.3 ];
    
    var _images = [];
    var _image = null;
    
    var _baseNodes = [];
    
    var toDegree = brfv4.BRFv4PointUtils.toDegree;
})();