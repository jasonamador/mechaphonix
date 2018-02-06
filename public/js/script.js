const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

let alpha = 0;
let beta = 0;
let gamma = 0;

StartAudioContext(Tone.context, '#play')

socket.on('connect', function() {
  socket.on('play self', function(data){
    console.log(data);
    polySynth.triggerAttackRelease(data.notes, "2n");
  })

  window.ondeviceorientation = function(event) {
    if ((Math.abs(event.alpha - alpha) < 5 ||
        Math.abs(event.alpha + 360 - alpha) < 5) &&
        (Math.abs(event.beta - beta) < 5 ||
        Math.abs(event.beta + 360 - beta)) < 5 &&
        (Math.abs(event.gamma - gamma) < 5 ||
        Math.abs(event.gamma + 180 - gamma)) < 5
    ) return

    alpha = event.alpha
    beta = event.beta
    gamma = event.gamma
    socket.emit('phone input', {
      alpha: alpha,
      beta: beta,
      gamma: gamma
    })
  };
});
