$(function(){
    var peer_id, name, conn;
    
    var peer = new Peer({
        host: '192.168.137.1',
        port: 9001,
        path: '/peerjs',
        debug: 3,
        config: {'iceServers': [
            { url: 'stun:stun1.l.google.com:19302' },
            { url: 'turn:numb.viagenie.ca',
                credential: 'muazkh', username: 'webrtc@live.com' }
        ]}
    });
    
    peer.on('open', function(){
        $('#peer_id').text(peer.id);
    });
    
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    function getVideo(callback){
        navigator.getUserMedia({audio: true, video: true}, callback, function(error){
            console.log(error);
            alert('An error occured. Please try again');
        });
    }
    
    getVideo(function(stream){
        window.localStream = stream;
        onReceiveStream(stream, 'my-camera');
    });
    
    function onReceiveStream(stream, element_id){
        var video = $('#' + element_id + ' video')[0];
        video.src = window.URL.createObjectURL(stream);
        window.peer_stream = stream;
    }
    
    $('#login').click(function(){
        name = $('.name-user').html();
        peer_id = $('#Name').val();
        if(peer_id){
            conn = peer.connect(peer_id, {metadata: {
                'username': name
            }});
            console.log('now calling: ' + peer_id);
            console.log(peer);
            var call = peer.call(peer_id, window.localStream);
            call.on('stream', function(stream){
                window.peer_stream = stream;
                onReceiveStream(stream, 'peer-camera');
            });
        }
    });
    
    peer.on('connection', function(connection){
        conn = connection;
        peer_id = connection.peer;
        window.MyId = peer.id;
        window.PeerId = peer_id;
    });
    
    peer.on('call', function(call){
        onReceiveCall(call);
    });
    
    function onReceiveCall(call){
        call.answer(window.localStream);
        call.on('stream', function(stream){
            window.peer_stream = stream;
            onReceiveStream(stream, 'peer-camera');
        });
    }
});
