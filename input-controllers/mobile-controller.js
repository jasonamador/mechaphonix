function getNote(number) {
  if (number > 150) return 'g4'
  if (number > 140) return 'f4'
  if (number > 130) return 'e4'
  if (number > 120) return 'd4'
  if (number > 110) return 'c4'
  if (number > 100) return 'b3'
  if (number > 90) return 'a3'
  if (number > 80) return 'g3'
  if (number > 70) return 'f3'
  if (number > 60) return 'e3'
  if (number > 50) return 'd3'
  if (number > 40) return 'c3'
  if (number > 30) return 'b2'
  if (number > 20) return 'a2'
  if (number > 10) return 'g2'
  if (number > 0) return 'f2'
  if (number > -10) return 'e2'
  if (number > -20) return 'd2'
  if (number > -30) return 'c2'
  if (number > -40) return 'b1'
  if (number > -50) return 'a1'
  if (number > -60) return 'g1'
  if (number > -70) return 'f1'
  if (number > -80) return 'e1'
  return 'd1'
}

module.exports = function(socket) {
  console.log('set up socket');
  socket.on('phone input', function(data){
    console.log(data);
    let notes = [
      getNote(data.alpha),
      getNote(data.beta),
      getNote(data.gamma)
    ]

    socket.emit('play self', {
      notes: notes
    })

    socket.broadcast.emit('play master', {
      notes: notes
    })
  })
}
