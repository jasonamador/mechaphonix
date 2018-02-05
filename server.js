const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// function to translate raw acceleration data into notes for tone.js
function getNote(number) {
  if (number > 20) return 'b6'
  if (number > 19) return 'a6'
  if (number > 18) return 'g5'
  if (number > 17) return 'f5'
  if (number > 16) return 'e5'
  if (number > 15) return 'd5'
  if (number > 14) return 'c5'
  if (number > 13) return 'b5'
  if (number > 12) return 'a5'
  if (number > 11) return 'g5'
  if (number > 10) return 'f5'
  if (number > 9) return 'e5'
  if (number > 8) return 'd5'
  if (number > 7) return 'c5'
  if (number > 6) return 'b4'
  if (number > 5) return 'a4'
  if (number > 4) return 'g4'
  if (number > 3) return 'f4'
  if (number > 2) return 'e4'
  if (number > 1) return 'd4'
  if (number > 0) return 'c4'
  if (number > -1) return 'b3'
  if (number > -2) return 'a3'
  if (number > -3) return 'g3'
  if (number > -4) return 'f3'
  if (number > -5) return 'e3'
  if (number > -6) return 'd3'
  if (number > -7) return 'c3'
  if (number > -8) return 'b2'
  if (number > -9) return 'a2'
  if (number > -10) return 'g2'
  if (number > -11) return 'f2'
  if (number > -12) return 'e2'
  if (number > -13) return 'd2'
  if (number > -14) return 'c2'
  if (number > -15) return 'b1'
  if (number > -16) return 'a1'
  if (number > -17) return 'g1'
  if (number > -18) return 'f1'
  if (number > -19) return 'e1'
  return 'd1'
}

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
