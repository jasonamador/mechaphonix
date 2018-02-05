/*
LIGHT TRACKER
*/

window.onload = function() {
  /*
  color getter
  */

  let video = document.getElementById('video');
  function getColorAt(webcam, x, y) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = video.width;
    canvas.height = video.height;
    context.drawImage(video, 0, 0, video.width, video.height);

    var pixel = context.getImageData(x, y, 1, 1).data;
    return {r: pixel[0], g: pixel[1], b: pixel[2]};
  }
  video.addEventListener("click", function (e) {
    var color = getColorAt(video, e.offsetX, e.offsetY);
    console.log(color.r, color.g, color.b);
  });

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
    event.data.forEach(function(rect) {
      let centerx = rect.x + rect.width / 2;
      let centery = rect.y + rect.width / 2;

      switch (rect.color) {
        case "green" : {
          drawGreen(centerx, centery);
          break;
        }
        case "red" : {
          drawRed(centerx, centery);
          break;
        }
        case "orange" : {
          drawOrange(centerx, centery);
          break;
        }
        case "blue" : {
          drawBlue(centerx, centery);
          break;
        }
        default:
      }
    });
  });
};
