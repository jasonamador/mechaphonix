let degrees = [1, 3, 5, 7, 9, 11, 13];
let scalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]
let notes = ['a2', 'a#2', 'b2', 'c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3', 'g3', 'g#3', 'a3', 'a#3', 'b3', 'c4', 'c#4', 'd4', 'eb4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'a#4', 'b4', 'c5']
let prevNote = '';

module.exports = function(socket) {
  socket.on('tracker data', (message) => {
      let note = notes[scalePattern[degrees[Math.floor(message.x * 7)]] + Math.floor(message.y * 5)];
      if (note != prevNote) {
        prevNote = note;
        switch(message.color) {
          case 'blue': socket.emit('blue message', {note}); break;
          case 'red': socket.emit('red message', {note}); break;
          case 'green': socket.emit('green message', {note}); break;
          case 'orange': socket.emit('orange message', {note}); break;
          default: break;
        }
      }
    });
}
