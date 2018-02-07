const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// setup input controllers
const mobileController = require('./input-controllers/mobile-controller.js')
const eegController = require('./input-controllers/eeg-controller.js')

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/instrument.html');
});

app.get('/composer', function(req, res){
  res.sendFile(__dirname + '/public/composer.html');
});

app.get('/sequencer', function(req, res){
  res.render('sequencer');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  console.log('connected')
  mobileController(socket)
  eegController(socket)

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
