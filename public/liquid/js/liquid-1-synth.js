/*
SOUNDS
*/
let blue = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
  init : function() {
    this.source.chain(this.filter, this.panner, Tone.Master);
  },
  start : function() {
    this.source.start();
  }
}
let red = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
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
let green = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
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
let orange = {
  source : new Tone.Noise('white'),
  filter : new Tone.Filter(100),
  panner : new Tone.Panner(),
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
green.start();
orange.init();
orange.start();

socket.on('liquid-1 message', (message) => {
  if (message.blue) {
    blue.filter.frequency.value = message.blue.cutoff;
    blue.panner.pan.value = message.blue.pan;
  }

  if (message.red) {
    red.filter.frequency.value = message.red.cutoff;
    red.panner.pan.value = message.red.pan;
  }

  if (message.green) {
    green.filter.frequency.value = message.green.cutoff;
    green.panner.pan.value = message.green.pan;
  }

  if (message.orange) {
    orange.filter.frequency.value = message.orange.cutoff;
    orange.panner.pan.value = message.orange.pan;
  }
});
