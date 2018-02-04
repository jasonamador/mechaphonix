const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let summary = {
  attention: [],
  meditation: [],
  delta: [],
  theta: [],
  lowAlpha: [],
  highAlpha: [],
  lowBeta: [],
  highBeta: [],
  lowGamma: [],
  highGamma: [],
  count: 0
}
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/site.html');
});

function getNote(number) {
  if (number < 2) return 'a5'
  if (number < 4) return 'g5'
  if (number < 6) return 'f5'
  if (number < 8) return 'e5'
  if (number < 10) return 'd5'
  if (number < 20) return 'c5'
  if (number < 40) return 'b4'
  if (number < 60) return 'a4'
  if (number < 80) return 'g4'
  if (number < 100) return 'f4'
  if (number < 200) return 'e4'
  if (number < 400) return 'd4'
  if (number < 600) return 'c4'
  if (number < 800) return 'b3'
  if (number < 1000) return 'a3'
  if (number < 2000) return 'g3'
  if (number < 4000) return 'f3'
  if (number < 6000) return 'e3'
  if (number < 8000) return 'd3'
  if (number < 10000) return 'c3'
  if (number < 20000) return 'b2'
  if (number < 40000) return 'a2'
  if (number < 60000) return 'g2'
  if (number < 80000) return 'f2'
  if (number < 100000) return 'e2'
  if (number < 200000) return 'd2'
  if (number < 400000) return 'c2'
  if (number < 600000) return 'b1'
  if (number < 800000) return 'a1'
  if (number < 1000000) return 'g1'
  if (number < 2000000) return 'f1'
  if (number < 4000000) return 'e1'
  if (number < 6000000) return 'd1'
  if (number < 8000000) return 'c1'
}

io.on('connection', function(socket){
  console.log('connected to client');
  socket.on('eeg data', function(eeg){
    let notes = [
      // getNote(eeg.attention)
      getNote(eeg.delta),
      getNote(eeg.theta),
      getNote(eeg.lowAlpha),
      getNote(eeg.highAlpha),
      getNote(eeg.lowBeta),
      getNote(eeg.highBeta),
      getNote(eeg.lowGamma),
      getNote(eeg.highGamma)
    ]

    console.log('data is', eeg);
    console.log('sending notes', notes);

    socket.broadcast.emit('play', {
      notes: notes
    })
    // summary.attention.push(eeg.attention)
    // summary.meditation.push(eeg.meditation)
    // summary.delta.push(eeg.delta)
    // summary.theta.push(eeg.theta)
    // summary.lowAlpha.push(eeg.lowAlpha)
    // summary.highAlpha.push(eeg.highAlpha)
    // summary.lowBeta.push(eeg.lowBeta)
    // summary.highBeta.push(eeg.highBeta)
    // summary.lowGamma.push(eeg.lowGamma)
    // summary.highGamma.push(eeg.highGamma)
    // summary.count += 1
    //
    // if (summary.count % 10 == 0) {
    //   console.log('***** summary for count ', (summary.count - 10), '*****');
    //   console.log('attention',(summary.count - 10),Math.max(...summary.attention),Math.floor(summary.attention.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.attention))
    //   console.log('meditation',(summary.count - 10),Math.max(...summary.meditation),Math.floor(summary.meditation.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.meditation))
    //   console.log('delta',(summary.count - 10),Math.max(...summary.delta),Math.floor(summary.delta.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.delta))
    //   console.log('theta',(summary.count - 10),Math.max(...summary.theta),Math.floor(summary.theta.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.theta))
    //   console.log('lowAlpha',(summary.count - 10),Math.max(...summary.lowAlpha),Math.floor(summary.lowAlpha.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.lowAlpha))
    //   console.log('highAlpha',(summary.count - 10),Math.max(...summary.highAlpha),Math.floor(summary.highAlpha.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.highAlpha))
    //   console.log('lowBeta',(summary.count - 10),Math.max(...summary.lowBeta),Math.floor(summary.lowBeta.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.lowBeta))
    //   console.log('highBeta',(summary.count - 10),Math.max(...summary.highBeta),Math.floor(summary.highBeta.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.highBeta))
    //   console.log('lowGamma',(summary.count - 10),Math.max(...summary.lowGamma),Math.floor(summary.lowGamma.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.lowGamma))
    //   console.log('highGamma',(summary.count - 10),Math.max(...summary.highGamma),Math.floor(summary.highGamma.reduce((p,c,_,a) => p + c/a.length,0)),Math.min(...summary.highGamma))
    //
    //   let count = summary.count
    //
    //   summary = {
    //     attention: [],
    //     meditation: [],
    //     delta: [],
    //     theta: [],
    //     lowAlpha: [],
    //     highAlpha: [],
    //     lowBeta: [],
    //     highBeta: [],
    //     lowGamma: [],
    //     highGamma: [],
    //     count: count
    //   }
    //
    //   io.emit('summary', {
    //     count: count
    //   })
    // }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
