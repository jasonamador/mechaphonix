const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/tty.usbmodem1451');
const parser = new Readline();
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('play', function(data){
  console.log('recived:', data);
})

socket.on('connect', function(){
  console.log('connected to server');
  port.pipe(parser);
  parser.on('data', function(raw) {
    eeg = raw.trim().split(',')
    if (eeg.length == 11) {
      socket.emit('eeg data', {
        source: 'eeg',
        signal: eeg[0],
        attention: eeg[1],
        meditation: eeg[2],
        delta: eeg[3],
        theta: eeg[4],
        lowAlpha: eeg[5],
        highAlpha: eeg[6],
        lowBeta: eeg[7],
        highBeta: eeg[8],
        lowGamma: eeg[9],
        highGamma: eeg[10]
      });
    }
  });
  socket.on('summary', function(data){
    console.log('******');
    console.log('last count:', data.count - 10);
    console.log('this count:', data.count);
    console.log('next count:', data.count + 10);
  })
});
