{
const polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();

socket.on('connect', function() {
  socket.on('phone chord message', function(data){
    polySynth.triggerAttackRelease(data.notes, "2n");
  })
});
}
