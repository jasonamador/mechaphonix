/*
SOUNDS
*/

/*
Some adapter stuff
*/
let degrees = [1, 2, 3, 5, 6, 8, 9, 10];
let scalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
let notes = ['a1', 'a#1', 'b1', 'c2', 'c#2', 'd2', 'd#2', 'e2', 'f2', 'f#2', 'g2', 'g#2', 'a2', 'a#2', 'b2', 'c3', 'c#3', 'd3', 'eb3', 'e3', 'f3', 'f#3', 'g3', 'g#3', 'a3', 'a#3', 'b3', 'c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'a#4', 'b4', 'c5'];

/*
The instrument objects
*/
let blue = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
  update : function(message) {
    this.panner.pan.value = message.x * 2 - 1;
    this.filter.frequency.value = message.y * 800;
  },
  init : function() {
    this.source.volume.value = -12;
    this.source.chain(this.filter, this.panner, Tone.Master);
    this.source.start();
  },
}
let white = {
  source : new Tone.DuoSynth(),
  panner : new Tone.Panner(),
  prevNote : '',
  update : function(message) {
    this.panner.pan.value = message.x - 0.5;
    this.note = notes[scalePattern[degrees[Math.floor(message.y * 6)] - 1] + 3 + 12];
    this.source.triggerAttackRelease(this.note, '2n');
    this.prevNote = this.note;
  },
  init : function() {
    this.source.volume.value = -12;
    this.source.portamento = 0.1;
    this.source.chain(this.panner, Tone.Master);
  },
}
let green = {
  source : new Tone.DuoSynth(),
  panner : new Tone.Panner(),
  prevNote : '',
  update : function(message) {
    this.panner.pan.value = message.x - 0.5;
    this.note = notes[scalePattern[degrees[Math.floor(message.y * 8)] - 1] + 8 + 12];
    this.source.triggerAttackRelease(this.note, '2n');
    this.prevNote = this.note;
  },
  init : function() {
    this.source.volume.value = -12;
    this.source.portamento = 0.1;
    this.source.chain(this.panner, Tone.Master);
  },
}

blue.init();
white.init();
green.init();

socket.on('liquid message', (message) => {
  if (message.blue) {
    blue.update(message.blue);
  }
  if (message.white) {
    white.update(message.white);
  }
  if (message.green) {
    green.update(message.green);
  }
});
