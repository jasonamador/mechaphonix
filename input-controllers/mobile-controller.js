function getNote(number) {
  if (number > 340) return 'd5'
  if (number > 320) return 'c5'
  if (number > 300) return 'b5'
  if (number > 280) return 'a5'
  if (number > 260) return 'g4'
  if (number > 240) return 'f4'
  if (number > 220) return 'e4'
  if (number > 200) return 'd4'
  if (number > 180) return 'c4'
  if (number > 160) return 'b3'
  if (number > 140) return 'a3'
  if (number > 120) return 'g3'
  if (number > 100) return 'f3'
  if (number > 80) return 'e3'
  if (number > 60) return 'd3'
  if (number > 40) return 'c3'
  if (number > 20) return 'b2'
  if (number > 0) return 'a2'
  if (number > -20) return 'g2'
  if (number > -40) return 'f2'
  if (number > -60) return 'e2'
  if (number > -80) return 'd2'
  return 'c2'
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
