const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
// set the serial port bellow to whatever port your arduino is on
const port = new SerialPort('/dev/tty.usbmodem1431');
const parser = new Readline();
// set the host bellow to whatever port your server is listening on
const socket = require('socket.io-client')('http://10.8.65.139:3000');

function getNote(number) {
  if (number > 8000000) return 'f3'
  if (number < 8000000 && number > 700000) return 'e3'
  if (number > 700000 && number > 600000) return 'd3'
  if (number < 600000 && number > 500000) return 'c3'
  if (number < 500000 && number > 400000) return 'g4'
  if (number < 400000 && number > 300000) return 'f4'
  if (number < 300000 && number > 200000) return 'e4'
  if (number < 200000 && number > 1000000) return 'd4'
  if (number < 1000000 && number > 95000) return 'c4'
  if (number < 95000 && number > 90000) return 'b3'
  if (number < 90000 && number > 85000) return 'a3'
  if (number < 85000 && number > 80000) return 'g3'
  if (number < 80000 && number > 75000) return 'f3'
  if (number < 75000 && number > 70000) return 'e3'
  if (number < 70000 && number > 65000) return 'd3'
  if (number < 65000 && number > 60000) return 'c3'
  if (number < 60000 && number > 55000) return 'g4'
  if (number < 55000 && number > 50000) return 'f4'
  if (number < 50000 && number > 45000) return 'e4'
  if (number < 45000 && number > 40000) return 'd4'
  if (number < 40000 && number > 35000) return 'c4'
  if (number < 35000 && number > 30000) return 'b3'
  if (number < 30000 && number > 25000) return 'a3'
  if (number < 25000 && number > 20000) return 'g3'
  if (number < 20000 && number > 15000) return 'f3'
  if (number < 15000 && number >  10000) return 'e3'
  if (number < 10000 && number > 5000) return 'd3'
  if (number < 5000 && number >=0 ) return 'c3'
}

socket.on('connect', function(){
  port.pipe(parser);
  parser.on('data', function(raw) {
    eeg = raw.trim().split(',')
    if (eeg.length == 11) {
      console.log('recived eeg signal:', eeg);

      let signal = eeg[0]
      let attention = eeg[1]
      let meditation = eeg[2]
      let delta = eeg[3]
      let theta = eeg[4]
      let lowAlpha = eeg[5]
      let highAlpha = eeg[6]
      let lowBeta = eeg[7]
      let highBeta = eeg[8]
      let lowGamma = eeg[9]
      let highGamma = eeg[10]


      let notes = [
        getNote((parseInt(delta) + parseInt(theta) + parseInt(highGamma) + parseInt(lowGamma))/4),
        getNote((parseInt(lowAlpha) + parseInt(highAlpha) + parseInt(highGamma))/3),
      ]

      console.log('sending notes:', notes);

      socket.emit('eeg message', {
        notes: notes
      })
    }
  })
});
