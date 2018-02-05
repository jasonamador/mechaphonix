const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();


StartAudioContext(Tone.context, '#play')

socket.on('connect', function() {
  socket.on('play', function(data){
    console.log(data);
    polySynth.triggerAttackRelease(data.notes, "2n");
  })

  window.ondevicemotion = function(event) {
    socket.emit('acceleration data', {
      source: 'acceleration',
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y,
      z: event.accelerationIncludingGravity.z
    })
  }
});
