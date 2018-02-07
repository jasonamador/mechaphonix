const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/instrument.html');
});

app.get('/sequencer', function(req, res){
  res.render('sequencer');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  console.log('connected')

  socket.on('phone drum input', (message) => {
    socket.emit('play notes self', message);
    socket.broadcast.emit('play notes master', message);
  });

  socket.on('phone chord input', (message) => {
    socket.emit('play notes self', message);
    socket.broadcast.emit('play notes master', message);
  });

  socket.on('eeg input', (message) => {
    console.log('senging eeg notes:', message.notes);
    socket.broadcast.emit('play notes master', message);
  });

  socket.on('liquid-1 message', (message) => {
    // socket.emit('liquid-1 message', message);
    socket.broadcast.emit('liquid-1 message', message);
  });

  socket.on('sequencer message', (message => {
    // socket.emit('sequencer message', message);
    socket.broadcast.emit('sequencer message', message);
  }));
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
