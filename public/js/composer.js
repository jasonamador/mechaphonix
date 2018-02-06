const socket = io()
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
const context = new AudioContext();

socket.on('connect', function() {
  socket.on('play composer', function(data){
    console.log(data);
    polySynth.triggerAttackRelease(data.notes, "2n");
  })
});
