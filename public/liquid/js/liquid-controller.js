/*
Liquid Controller
*/
const socket = io();


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
  tracking.ColorTracker.registerColor('blue', (r, g, b) => {
    return (g < 100 && r < 100 && b > 130);
  });
  var tracker = new tracking.ColorTracker(['red', 'green', 'blue']);
  tracking.track('#video', tracker, { camera: true });

  /*
  Color Tracker Handler
  */
  tracker.on('track', function(event) {
    let message = {};
    if (event.data.length > 0) {
      event.data.forEach(function(rect) {
        let x = (rect.x + rect.width / 2);
        let y = (rect.y + rect.width / 2);
        switch (rect.color) {
          case 'green' : drawGreen(x, y); break;
          case 'red' : drawRed(x, y); break;
          case 'blue' : drawBlue(x, y); break;
        };
        x = (canvas.width - x) / canvas.width;
        y = (canvas.height - y) / canvas.height;
        message[rect.color] = {x, y};
      });
      socket.emit('liquid-1 message', message);
    }
  });
}
