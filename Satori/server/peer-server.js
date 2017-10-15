var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9001, path: '/peerjs'});

var express = require('express');
var router = express.Router();

const httpServer = require('http').createServer();

const io = require('socket.io')(httpServer);

io.on('connection', function (socket) {
   socket.on('changePic', function (data) {
       io.sockets.emit('changePic', data);
   });
});

server.listen(9005);