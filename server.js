const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  socket.on('eeg data', function(eeg){
    let notes = [
      getNote(eeg.delta),
      getNote(eeg.theta),
      getNote(eeg.lowAlpha),
      getNote(eeg.highAlpha),
      getNote(eeg.lowBeta),
      getNote(eeg.highBeta),
      getNote(eeg.lowGamma),
      getNote(eeg.highGamma)
    ]

    socket.broadcast.emit('play', {
      notes: notes
    })
  });

  socket.on('acceleration data', function(acceleration){
    let notes = [
      getNote(acceleration.x),
      getNote(acceleration.y),
      getNote(acceleration.z)
    ]

    socket.broadcast.emit('play', {
      notes: notes
    })
  })
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
