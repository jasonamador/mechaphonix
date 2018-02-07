const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let minimumImpact = 2
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
  socket.on('play notes self', function(data){
    console.log(data);
    if (unmuted) polySynth.triggerAttackRelease(data.notes, "2n");
  })

  // react to changes in device acceleration
  window.ondevicemotion = function(event) {
    // get acceleration data
    let accelerationX = event.acceleration.x;
    let accelerationY = event.acceleration.y;
    let accelerationZ = event.acceleration.z;

    // if impact not high enough, stop
    if ((Math.abs(accelerationX) < minimumImpact) &&
        (Math.abs(accelerationY) < minimumImpact) &&
        (Math.abs(accelerationZ) < minimumImpact)
    ) return

    notes = [
      'C4'
    ]

    // emit a message to the server containing the new position data
    socket.emit('phone drum input', {
      notes: notes
    })
  };
});
