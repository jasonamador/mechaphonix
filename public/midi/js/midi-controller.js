let phaser = new Tone.Phaser().toMaster();
phaser.octaves.value = 5;
let synth = new Tone.PolySynth().connect(phaser);


navigator.requestMIDIAccess()
  .then(function(access) {
    // Get lists of available MIDI controllers
    const inputs = access.inputs.values();
    const outputs = access.outputs.values();

    for (var i = inputs.next(); i && !i.done; i = inputs.next()) {
      i.value.onmidimessage = (message) => {
        let noteNumber = message.data[1];
        let note = Tone.Frequency(noteNumber, 'midi').toNote();
        let velocity = message.data[2];
        if (message.data[0] === 144) {
          if (velocity != 0) {
            synth.triggerAttack(note);
          } else {
            synth.triggerRelease(note);
          }
        }
        if (message.data[0] === 224) {
          synth.set('detune', ((velocity - 64) / 64) * 1200);
        }
        if (message.data[0] === 176) {
          phaser.frequency.value = velocity / 7;
        }

        console.log(message.data);
      }
    }

     access.onstatechange = function(e) {
       // Print information about the (dis)connected MIDI controller
       console.log(e.port.name, e.port.manufacturer, e.port.state);
     };
  });
