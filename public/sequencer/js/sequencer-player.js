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
  'c4' : '/samples/crash.mp3',
  'c#4' : '/samples/floor_tom.mp3',
  'd4' : '/samples/mid_tom.mp3',
  'd#4' : '/samples/high_tom.mp3',
  'e4' : '/samples/hi_hat_open.mp3',
  'f4' : '/samples/hi_hat_closed.mp3',
  'f#4' : '/samples/snare.mp3',
  'g4' : '/samples/kick.mp3'
}, function() {
  console.log('samples loaded');
}).toMaster();

function start() {
  sequences.forEach((s) => {
    s.start();
  });
}

socket.on('sequencer message', function(message) {
  if (message.add) {
    sequences[message.sequence].add(message.time, samplerNotes[message.sequence]);
  }
  if (message.add === false) {
    sequences[message.sequence].remove(message.time);
  }
  if (message.start) {
    start();
  }
  if (message.stop) {
    sequences.forEach((s) => {
      s.stop();
    });
  }
});
