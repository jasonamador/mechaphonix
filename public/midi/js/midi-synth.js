/*
Set up the sound
*/
let phaser = new Tone.Phaser().toMaster();
phaser.octaves.value = 5;
let synth = new Tone.PolySynth().connect(Tone.Master);
synth.volume.value = -12;

/*
Set up the socket
*/
socket.on('midi message', handleMessage);
/*
our message handler
*/
function handleMessage(message) {
  let note = Tone.Frequency(message.note, 'midi').toNote();
  if (message.cc === 144) {
    if (message.vel != 0) {
      synth.triggerAttack(note);
    } else {
      synth.triggerRelease(note);
    }
  }
  if (message.cc === 224) {
    synth.set('detune', ((message.vel - 64) / 64) * 1200);
  }
  if (message.cc === 176) {
    phaser.frequency.value = message.vel / 7;
  }
}
