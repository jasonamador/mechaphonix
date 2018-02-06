/*
Liquid Controller
*/
const socket = io();

/*
Some adapter stuff
*/
let degrees = [1, 3, 5, 7, 9, 11, 13];
let scalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]
let notes = ['a2', 'a#2', 'b2', 'c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3', 'g3', 'g#3', 'a3', 'a#3', 'b3', 'c4', 'c#4', 'd4', 'eb4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'a#4', 'b4', 'c5']
let prevNote = '';

window.onload = function() {
  /*
  Set up some colors
  */
  tracking.ColorTracker.registerColor('green', (r, g, b) => {
    return (g > 100 && r < 100 && b < 100);
  });
  tracking.ColorTracker.registerColor('red', (r, g, b) => {
    return (g < 50 && r > 150 && b < 50);
  });
  tracking.ColorTracker.registerColor('orange', (r, g, b) => {
    return (g > 190 && r > 90 && b < 100);
  });
  tracking.ColorTracker.registerColor('blue', (r, g, b) => {
    return (g < 100 && r < 100 && b > 130);
  });
  var tracker = new tracking.ColorTracker(['red', 'green', 'orange', 'blue']);
  tracking.track('#video', tracker, { camera: true });


  tracker.on('track', function(event) {
    let message = {};
    event.data.forEach(function(rect) {
      let x = (rect.x + rect.width / 2);
      let y = (rect.y + rect.width / 2);
      switch (rect.color) {
        case 'green' : drawGreen(x, y); break;
        case 'red' : drawRed(x, y); break;
        case 'blue' : drawBlue(x, y); break;
        case 'orange' : drawOrange(x, y); break;
      };
      let note = notes[scalePattern[degrees[Math.floor(x * 7)]] + Math.floor(y * 5)];
      let pan = (x / canvas.width) * 2 - 1;
      let cutoff = (y / canvas.height) * 800;
      message[rect.color] = {pan, note, cutoff};
    });
    socket.emit('liquid-1 message', message);
  });
}
