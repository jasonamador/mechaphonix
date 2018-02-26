const socket = io()
// const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();
// var autoFilter = new Tone.AutoFilter("2n").toMaster().start();
var tremolo = new Tone.Tremolo(9, 0.75).toMaster().start();
var dist = new Tone.Distortion(0.8).toMaster();
var oscillator = new Tone.Oscillator().connect(tremolo).connect(dist).start();


// set previous variables and minimum degree change needed to emit a new message
let prevAlpha = 180;
let prevBeta = 180;
let prevGamma = 0;
let minimumDelta = 22.5;
let unmuted = false

// function getNote(number) {
//   if (number > 382.5) return 'b5'
//   if (number > 360) return 'a5'
//   if (number > 337.5) return 'g4'
//   if (number > 315) return 'f4'
//   if (number > 292.5) return 'e4'
//   if (number > 270) return 'd4'
//   if (number > 247.5) return 'c4'
//   if (number > 225) return 'b3'
//   if (number > 202.5) return 'a3'
//   if (number > 180) return 'g3'
//   if (number > 157.5) return 'f3'
//   if (number > 135) return 'e3'
//   if (number > 112.5) return 'd3'
//   return 'c3'
// }

// function getHarmony(harmony) {
//   if (Math.abs(harmony) > 67.5) {
//     autoFilter.frequency.value = "6n"
//   } else if (Math.abs(harmony) > 45) {
//     autoFilter.frequency.value = "4n"
//   } else if (Math.abs(harmony) > 22.5) {
//     autoFilter.frequency.value = "3n"
//   } else {
//     autoFilter.frequency.value = "2n"
//   }
// }

// start audio context for mobile devices
StartAudioContext(Tone.context, '#play')

function toggleMute() {
  unmuted = !unmuted
  document.getElementById('play').innerHTML = unmuted? 'mute': 'unmute'
}

// establish socket connection
socket.on('connect', function() {
  // play the notes this device produced
  // socket.on('phone chord message', function(data){
  //   console.log(data);
  //   if (unmuted) polySynth.triggerAttackRelease(data.notes, "2n");
  // })

  // react to changes in device orientation
  window.ondeviceorientation = function(event) {
    // socket.emit('log', autoFilter)
    // socket.emit('log', {test:"test"})
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

    tremolo.frequency.value = Math.floor(gamma + 90);

    oscillator.frequency.value = alpha / 90 + 1;

    dist.distortion.value = Math.floor((beta - 90) / 180);


    // set the previous values to the current values
    // prevAlpha = alpha
    // prevBeta = beta
    // prevGamma = gamma
    //
    // getHarmony(gamma)

    // emit a message to the server containing the new position data
  };
});
