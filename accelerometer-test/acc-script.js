const socket = io()
const polySynth = new Tone.PolySynth(1, Tone.Synth).toMaster();
const context = new AudioContext();

let display = new Vue({
  el: '#display',
  data: {
    acceleration_x: 'NA',
    acceleration_y: 'NA',
    acceleration_z: 'NA',
    notes: 'NA',
    context: 'off'
  }
})

$(function() {
  // Handler for .ready() called.
  StartAudioContext(Tone.context, '#play').then(function(){
    console.log('context on');
    display.context = 'on'
    polySynth.triggerAttackRelease('C4', "2n");
  })
});

//callback is invoked when the AudioContext.state is 'running'
socket.on('connect', function() {
  socket.on('play', function(data){
    display.notes = data
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
