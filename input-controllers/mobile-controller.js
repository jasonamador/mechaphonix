function getNote(number) {
  if (number > 382.5) return 'b5'
  if (number > 360) return 'a5'
  if (number > 337.5) return 'g4'
  if (number > 315) return 'f4'
  if (number > 292.5) return 'e4'
  if (number > 270) return 'd4'
  if (number > 247.5) return 'c4'
  if (number > 225) return 'b3'
  if (number > 202.5) return 'a3'
  if (number > 180) return 'g3'
  if (number > 157.5) return 'f3'
  if (number > 135) return 'e3'
  if (number > 112.5) return 'd3'
  return 'c3'

}

function getHarmony(base, harmony) {
  if (Math.abs(harmony) > 67.5) return getNote((base + 120))
  if (Math.abs(harmony) > 45) return getNote((base + 80))
  if (Math.abs(harmony) > 22.5) return getNote((base + 40))
  return getNote(base)
}

module.exports = function(socket) {
  console.log('set up socket');
  socket.on('orientation input', function(data){
    console.log(data);
    let notes = [
      // getNote(data.alpha),
      getNote(data.beta),
      getHarmony(data.beta, data.gamma)
    ]

    socket.emit('play self', {
      notes: notes
    })

    socket.broadcast.emit('play composer', {
      notes: notes
    })
  })

  socket.on('impact input', function(data){
    console.log(data);
    let notes = [
      getNote(0)
    ]

    socket.emit('play self', {
      notes: notes
    })

    socket.broadcast.emit('play composer', {
      notes: notes
    })
  })
}
