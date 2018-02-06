function getNote(number) {
  // if (number < 2) return 'a5'
  // if (number < 4) return 'g5'
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
  //if (number < 250000) return 'b2'
  // if (number < 40000) return 'a2'
  // if (number < 60000) return 'g2'
  // if (number < 80000) return 'f2'
  // if (number < 100000) return 'e2'
  // if (number < 200000) return 'd2'
  // if (number < 400000) return 'c2'
  // if (number < 600000) return 'b1'
  // if (number < 800000) return 'a1'
  // if (number < 1000000) return 'g1'
  // if (number < 2000000) return 'f1'
  // if (number < 4000000) return 'e1'
  // return 'd1'
}

module.exports = function(socket) {
  console.log('set up socket');
  socket.on('eeg input', function(data){
    console.log(data);
    console.log((data.delta + data.theta)/2)
    let notes = [
      getNote((parseInt(data.delta) + parseInt(data.theta) + parseInt(data.highGamma) + parseInt(data.lowGamma))/2),
      getNote((parseInt(data.lowAlpha) + parseInt(data.highAlpha) + parseInt(data.highGamma))/3),
    ]
      console.log(notes)
    socket.emit('play self', {
      notes: notes
    })

    socket.broadcast.emit('play composer', {
      notes: notes
    })
  });
}
