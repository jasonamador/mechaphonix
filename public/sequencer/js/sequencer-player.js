/*
setting up the stuff
*/
let samplerNotes = ['c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4', 'g4'];
let sequences = [];
let patterns = [];

for (let i = 0; i < samplerNotes.length; i++) {
  patterns.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  sequences.push(new Tone.Sequence((time, note) => {
    sampler.triggerAttack(note);
  }, patterns[i], '16n'));
}

let sampler = new Tone.Sampler({
  'c4' : '/samples/crash.mp3',
  'c#4' : '/samples/floor_tom.mp3',
  'd4' : '/samples/hi_hat_closed.mp3',
  'd#4' : '/samples/hi_hat_closed.mp3',
  'e4' : '/samples/kick.mp3',
  'f4' : '/samples/snare.mp3',
  'f#4' : '/samples/tom1.mp3',
  'g4' : '/samples/tom1.mp3'
}, function() {
  console.log('samples loaded');
}).toMaster();

function start() {
  sequences.forEach((s) => {
    s.start();
  });
  Tone.Transport.start();
}

/*
listeners
*/
document.getElementById('startButton').addEventListener('click', (e) => {
  e.preventDefault();
  start();
});

document.getElementById('stopButton').addEventListener('click', (e) => {
  e.preventDefault();
  Tone.Transport.stop();
});

document.getElementById('sequencer').addEventListener('click', (e) => {
  if (!e.target.classList.contains('row')) {
    e.target.classList.toggle('on');
    let sAndT = e.target.id.split('-').map((el) => parseInt(el));
    let sequence = sAndT[0];
    let time = sAndT[1];
    sequences[sequence].add(time, samplerNotes[sequence]);
  }
});
