function getNote(number) {
  if (number < 2) return 'a5'
  if (number < 4) return 'g5'
  if (number < 6) return 'f5'
  if (number < 8) return 'e5'
  if (number < 10) return 'd5'
  if (number < 20) return 'c5'
  if (number < 30) return 'b4'
  if (number < 40) return 'a4'
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
  return 'd1'
}

module.exports = function(socket) {
  console.log('set up socket');
  socket.on('eeg input', function(data){
    console.log(data);
    let notes = [
      getNote(data.delta),
      getNote(data.theta),
      getNote(data.lowAlpha),
      getNote(data.highAlpha),
      getNote(data.lowBeta),
      getNote(data.highBeta),
      getNote(data.lowGamma),
      getNote(data.highGamma)
    ]

    socket.emit('play self', {
      notes: notes
    })

    socket.broadcast.emit('play composer', {
      notes: notes
    })
  });
}
