/*
setting up the stuff
*/
let samplerNotes = ['c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4', 'g4'];
let sequences = [];

for (let i = 0; i < samplerNotes.length; i++) {
  sequences.push(new Tone.Sequence((time, note) => {
    sampler.triggerAttack(note);
  }, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], '16n'));
}

let sampler = new Tone.Sampler({
  'c4' : '/samples/tom1_long.wav',
  'c#4' : '/samples/clap.wav',
  'd4' : '/samples/cowbell.wav',
  'd#4' : '/samples/hi_hat_closed.wav',
  'e4' : '/samples/snare.wav',
  'f4' : '/samples/kick2.mp3',
  'f#4' : '/samples/kick.wav',
  'g4' : '/samples/large_drum.mp3'
}, function() {
  console.log('samples loaded');
}).toMaster();

socket.on('sequencer message', function(message) {
  if (message.add) {
    sequences[message.sequence].add(message.time, samplerNotes[message.sequence]);
  }
  if (message.add === false) {
    sequences[message.sequence].remove(message.time);
  }
  if (message.start) {
  sequences.forEach((s) => {
    s.start();
  });
  }
  if (message.stop) {
    sequences.forEach((s) => {
      s.stop();
    });
  }
});
