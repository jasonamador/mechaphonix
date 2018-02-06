const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let prevAlpha = 180;
let prevBeta = 180;
let prevGamma = 0;
let minimumDelta = 22.5;
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
  socket.on('play self', function(data){
    console.log(data);
    if (unmuted) polySynth.triggerAttackRelease(data.notes, "2n");
  })

  // react to changes in device orientation
  window.ondeviceorientation = function(event) {
    // adjust raw values so the device starts out in the middle of the range
    let alpha = (event.alpha + 180) % 360
    let beta = (event.beta + 180) % 360
    let gamma = event.gamma

    // if the divece has not rotated the minimum degrees from the last position, don't continue
    if ((Math.abs(alpha - prevAlpha) < minimumDelta ||
        Math.abs(alpha + 360 - prevAlpha) < minimumDelta) &&
        (Math.abs(beta - prevBeta) < minimumDelta ||
        Math.abs(beta + 360 - prevBeta)) < minimumDelta &&
        (Math.abs(gamma - prevGamma) < minimumDelta ||
        Math.abs(gamma + 180 - prevGamma)) < minimumDelta
    ) return

    // set the previous values to the current values
    prevAlpha = alpha
    prevBeta = beta
    prevGamma = gamma

    // emit a message to the server containing the new position data
    socket.emit('orientation input', {
      alpha: alpha,
      beta: beta,
      gamma: gamma
    })
  };
});
