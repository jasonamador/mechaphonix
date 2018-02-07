const socket = io()
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let minimumImpact = 15
let resetImpact = 5
let unmuted = false
let state = 'rest'

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


    // if (Math.abs(acceleration.x) > minimumImpact) {
    //   socket.emit('phone drum message', {note: 'c4', acceleration});
    // }
    // if (Math.abs(acceleration.y) > minimumImpact) {
    //   socket.emit('phone drum message', {note: 'd4', acceleration});
    // }
    // if (Math.abs(acceleration.z) > minimumImpact) {
    //   socket.emit('phone drum message', {note: 'e4', acceleration});
    // }

    // if (Math.abs(acceleration.x) > minimumImpact) {
    //   socket.emit('phone drum message', {note: 'c4', acceleration});
    // }
    // if (Math.abs(acceleration.y) > minimumImpact) {
    //   socket.emit('phone drum message', {note: 'd4', acceleration});
    // }

    // if acceleration is high in the negative z, set state to struck
    if (state == 'ready' && acceleration.z < -minimumImpact) {
      socket.emit('phone drum message', {note: 'c4', acceleration});
      state = 'struck'
    }

    // if acceleration is low in the negative z, set state to rest
    if (state == 'struck' && acceleration.z < -resetImpact) {
      state = 'rest'
    }

    // if acceleration is high in the positive z, set state to ready
    if (state == 'rest' && acceleration.z > minimumImpact) {
      state = 'ready'
    }

    // emit a message to the server containing the new position data
  };
});
