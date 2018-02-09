{
const pan = new Tone.Panner(1);
const polySynth = new Tone.PolySynth(2);
const delay = new Tone.Delay('8n');

polySynth.voices.forEach((synth) => {
  synth.envelope.attack = 0.3;
  synth.envelope.decay = 0.2;
  synth.envelope.sustain = 0.9;
  synth.envelope.release = 0.7;
});

polySynth.fan(delay, Tone.Master);
delay.chain(pan, Tone.Master)

socket.on('connect', function() {
  socket.on('phone chord message', function(data){
    polySynth.triggerAttackRelease(data.notes, "2n");
  })
});
}
