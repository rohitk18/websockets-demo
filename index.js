var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000,()=>{
    console.log("Listening to requests on port 4000...");
});
app.use(express.static('ui'));
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});
var io = socket(server);
io.set('origins', "*:*");

// making socket connection with clients
io.on('connection', (socket) => {
    // make connection with clients via sockets
    console.log('made socket connection', socket.id);

    // event listeners
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})