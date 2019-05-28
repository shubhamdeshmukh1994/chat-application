//This my server
var express = require('express');
var socket = require('socket.io');


var app = express();
var server = app.listen(3001, function(){
    console.log('listening for requests on port 3001,');
});


app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

     // my server is handling client events
    socket.on('chat', function(data){
        //sends data to every connected client
        io.sockets.emit('chat', data);
    });
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
    socket.on('payment',function(data){
        socket.broadcast('payment',data);
    });
    socket.on('btnclicked',function(data){
        console.log("data send")
        socket.broadcast.emit('btnclicked','sent from server');
    })
    
});