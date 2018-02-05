const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

$(function() {
  StartAudioContext(Tone.context, '#play')
});

socket.on('connect', function() {
  socket.on('play', function(data){
    console.log(data);
    polySynth.triggerAttackRelease(data.notes, "2n");
  })

  window.ondevicemotion = function(event) {
    display.acceleration_x = event.accelerationIncludingGravity.x;
    display.acceleration_y = event.accelerationIncludingGravity.y;
    display.acceleration_z = event.accelerationIncludingGravity.z;

    socket.emit('acceleration data', {
      source: 'acceleration',
      x: event.accelerationIncludingGravity.x,
      y: event.accelerationIncludingGravity.y,
      z: event.accelerationIncludingGravity.z
    })
  }
});
