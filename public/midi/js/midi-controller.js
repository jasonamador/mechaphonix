const socket = io();

{
  // first we need to connect to a new socket
  socket.on('connect', () => {
    init();
  })

  /*
  Initialize the MIDI interface
  */
  function init() {
    console.log('init')
    navigator.requestMIDIAccess()
      .then(function(midi) {
        const inputs = midi.inputs.values();

        // I don't quite understand this loop, but it works to get all the inputs
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          // i is the input, so we are collecting messages from all of the available inputs
          handleInput(input);
        }

        midi.onstatechange = function(e) {
          // Print information about the (dis)connected MIDI controller
          // console.log(e.port.name, e.port.manufacturer, e.port.state);
        };
      });
  }

  /*
  Translates the MIDI input and send a socket message
  */
  function handleInput(input) {
    input.value.onmidimessage = (message) => {
      console.log('handleInput');
      let socketMessage = {
        cc : message.data[0],
        note: message.data[1],
        vel: message.data[2],
      };

      socket.emit('midi message', socketMessage);
    }
  }
}
