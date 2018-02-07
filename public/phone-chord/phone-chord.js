const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let prevAlpha = 180;
let prevBeta = 180;
let prevGamma = 0;
let minimumDelta = 22.5;
let unmuted = false

function getNote(number) {
  if (number > 382.5) return 'b5'
  if (number > 360) return 'a5'
  if (number > 337.5) return 'g4'
  if (number > 315) return 'f4'
  if (number > 292.5) return 'e4'
  if (number > 270) return 'd4'
  if (number > 247.5) return 'c4'
  if (number > 225) return 'b3'
  if (number > 202.5) return 'a3'
  if (number > 180) return 'g3'
  if (number > 157.5) return 'f3'
  if (number > 135) return 'e3'
  if (number > 112.5) return 'd3'
  return 'c3'
}

function getHarmony(base, harmony) {
  if (Math.abs(harmony) > 67.5) return getNote((base + 120))
  if (Math.abs(harmony) > 45) return getNote((base + 80))
  if (Math.abs(harmony) > 22.5) return getNote((base + 40))
  return getNote(base)
}

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

  // react to changes in device orientation
  window.ondeviceorientation = function(event) {
    // adjust raw values so the device starts out in the middle of the range
    let alpha = (event.alpha + 180) % 360
    let beta = (event.beta + 180) % 360
    let gamma = event.gamma

    // if the divece has not rotated the minimum degrees from the last position, don't continue
    if ((Math.abs(alpha - prevAlpha) <    minimumDelta ||
        Math.abs(alpha + 360 - prevAlpha) < minimumDelta) &&
        (Math.abs(beta - prevBeta) < minimumDelta ||
        Math.abs(beta + 360 - prevBeta) < minimumDelta) &&
        (Math.abs(gamma - prevGamma) < minimumDelta ||
        Math.abs(gamma + 180 - prevGamma) < minimumDelta)
    ) return

    // set the previous values to the current values
    prevAlpha = alpha
    prevBeta = beta
    prevGamma = gamma

    let notes = [
      // getNote(alpha),
      getNote(beta),
      getHarmony(beta, gamma)
    ]

    // emit a message to the server containing the new position data
    socket.emit('phone chord input', {
      notes: notes
    })
  };
});
