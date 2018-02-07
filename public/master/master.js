var socket = io();

Tone.Transport.start();

const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();

socket.on('connect', function() {
  console.log('conected');
  socket.on('play notes master', function(data){
    console.log('playing notes:', data);
    polySynth.triggerAttackRelease(data.notes, "2n");
  })
});
