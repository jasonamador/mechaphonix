const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// setup input controllers
const mobileController = require('./input-controllers/mobile-controller.js')
const liquidController = require('./input-controllers/liquid-controller.js')

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/master', function(req, res){
  res.sendFile(__dirname + '/public/master.html');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  console.log('connected');
  mobileController(socket);
  liquidController(socket);

  // socket.on('eeg data', function(eeg){
  //   let notes = [
  //     getNote(eeg.delta),
  //     getNote(eeg.theta),
  //     getNote(eeg.lowAlpha),
  //     getNote(eeg.highAlpha),
  //     getNote(eeg.lowBeta),
  //     getNote(eeg.highBeta),
  //     getNote(eeg.lowGamma),
  //     getNote(eeg.highGamma)
  //   ]
  //
  //   socket.broadcast.emit('play', {
  //     notes: notes
  //   })
  // });
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
