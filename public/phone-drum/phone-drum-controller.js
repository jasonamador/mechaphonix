const socket = io()
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let minimumImpact = 10
let unmuted = false

// start audio context for mobile devices
StartAudioContext(Tone.context, '#play')

function toggleMute() {
  unmuted = !unmuted
  document.getElementById('play').innerHTML = unmuted? 'mute': 'unmute'
}

// establish socket connection
socket.on('connect', function() {
  // play the notes this device produced
  // socket.on('play notes self', function(data){
  //   console.log(data);
  //   if (unmuted) polySynth.triggerAttackRelease(data.notes, "2n");
  // })

  // react to changes in device acceleration
  window.ondevicemotion = function(event) {
    // get acceleration data
    let acceleration = event.acceleration;

    // if impact not high enough, stop
    // if ((Math.abs(accelerationX) < minimumImpact) &&
    //     (Math.abs(accelerationY) < minimumImpact) &&
    //     (Math.abs(accelerationZ) < minimumImpact)
    // ) return


    if (Math.abs(acceleration.x) > minimumImpact) {
      socket.emit('phone drum message', {note: 'c4', acceleration});
    }
    if (Math.abs(acceleration.y) > minimumImpact) {
      socket.emit('phone drum message', {note: 'd4', acceleration});
    }
    if (Math.abs(acceleration.z) > minimumImpact) {
      socket.emit('phone drum message', {note: 'e4', acceleration});
    }

    // emit a message to the server containing the new position data
  };
});
