// make connection to server
var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message'),
    username = document.getElementById('username'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback=document.getElementById('feedback');

// push events
btn.addEventListener('click', () => { 
    socket.emit('chat', {
        message: message.value,
        username: username.value
    });
});
message.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
})

// event listeners from server made by other clients
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.username + ":</strong> " + data.message + "</p>"; 
});
socket.on('typing', (data) => {
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});