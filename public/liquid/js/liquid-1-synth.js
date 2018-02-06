/*
SOUNDS
*/

/*
Some adapter stuff
*/
let degrees = [1, 3, 5, 7, 9, 11, 13];
let scalePattern = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]
let notes = ['a2', 'a#2', 'b2', 'c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3', 'g3', 'g#3', 'a3', 'a#3', 'b3', 'c4', 'c#4', 'd4', 'eb4', 'e4', 'f4', 'f#4', 'g4', 'g#4', 'a4', 'a#4', 'b4', 'c5']

let blue = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
  update : function(message) {
    this.panner.pan.value = message.x * 2 - 1;
    this.filter.frequency.value = message.y * 800;
  },
  init : function() {
    this.source.chain(this.filter, this.panner, Tone.Master);
  },
  start : function() {
    this.source.start();
  }
}
let red = {
  source : new Tone.Noise('pink'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
  update : function(message) {
    this.panner.pan.value = -(message.x) * 2 + 1;
    this.filter.frequency.value = message.y * 1200;
  },
  init : function() {
    this.source.chain(this.filter, this.panner, Tone.Master);
  },
  start : function() {
    this.source.start();
  }
}
let green = {
  source : new Tone.PluckSynth(),
  panner : new Tone.Panner(),
  prevNote : '',
  update : function(message) {
    this.panner.pan.value = message.x - 0.5;
    this.note = notes[scalePattern[degrees[Math.floor(message.x * 7)]] + Math.floor(message.y * 5)];
    if (this.prevNote != this.note) {
      this.source.triggerAttackRelease(this.note, '2n');
      this.prevNote = this.note;
      console.log(this.source.portamento);
    }
  },
  init : function() {
    this.source.volume.value = -12;
    this.source.portamento = 0.25;
    this.source.chain(this.panner, Tone.Master);
  },
}
let orange = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
  update : function(message) {
    this.panner.pan.value = message.x * 2 - 1;
    this.filter.frequency.value = message.y * 800;
  },
  init : function() {
    this.volume = this.source.volume.value = -24;
    this.cutoff = this.filter.frequency.value = 100,
    this.pan = this.panner.pan.value;
    this.source.chain(this.filter, this.panner, Tone.Master);
  },
  start : function() {
    this.source.start();
  }
}

blue.init();
blue.start();
red.init();
red.start();
green.init();
orange.init();
orange.start();

socket.on('liquid-1 message', (message) => {
  console.log(message);
  if (message.blue) {
    blue.update(message.blue);
  }
  if (message.red) {
    red.update(message.red);
  }
  if (message.green) {
    green.update(message.green);
  }
  if (message.orange) {
    orange.update(message.orange);
  }
});
