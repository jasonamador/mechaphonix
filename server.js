const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.sendStatus(500);
});

app.get('/sequencer', function(req, res){
  res.render('sequencer');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  console.log('connected')

  socket.on('log', (message) => {
    console.log('log:', message);
  });

  socket.on('pulse message', (message) => {
    console.log('pulse is:', message);
  });

  socket.on('phone drum message', (message) => {
    // socket.emit('phone drum message', message);
    socket.broadcast.emit('phone drum message', message);
  });

  socket.on('phone chord message', (message) => {
    // socket.emit('phone chord message', message);
    socket.broadcast.emit('phone chord message', message);
  });

  socket.on('eeg message', (message) => {
    console.log('senging eeg notes:', message.notes);
    socket.broadcast.emit('eeg message', message);
  });

  socket.on('liquid message', (message) => {
    // socket.emit('liquid-1 message', message);
    socket.broadcast.emit('liquid message', message);
  });

  socket.on('sequencer message', (message => {
    // socket.emit('sequencer message', message);
    socket.broadcast.emit('sequencer message', message);
  }));
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
