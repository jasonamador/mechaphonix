const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
// set the serial port bellow to whatever port your arduino is on
const port = new SerialPort('/dev/cu.usbmodem1451');
const parser = new Readline();
// set the host bellow to whatever port your server is listening on
const socket = require('socket.io-client')('http://localhost:3000');


socket.on('connect', function(){
  port.pipe(parser);
  parser.on('data', function(raw) {
    eeg = raw.trim().split(',')

    if (eeg.length == 11) {
      console.log(eeg[3],eeg[4],eeg[5],eeg[6],eeg[7],eeg[8],eeg[9],eeg[10]);
      socket.emit('eeg input', {
        // signal: eeg[0],
        // attention: eeg[1],
        // meditation: eeg[2],
        delta: eeg[3]
        // theta: eeg[4],
        // lowAlpha: eeg[5],
        // highAlpha: eeg[6],
        // lowBeta: eeg[7],
        // highBeta: eeg[8],
        // lowGamma: eeg[9],
        // highGamma: eeg[10]
      })
    }
  })
});
