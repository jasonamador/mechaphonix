{

const sampler = new Tone.Sampler({
  'c4' : '/samples/triangle.mp3',
  'd4' : '/samples/large_drum.mp3',
  'e4' : '/samples/shaker.mp3'
}, () => {
  socket.on('phone drum message', (message) => {
    sampler.triggerAttack(message.note);
    console.log(message.acceleration);
  });
}).toMaster();

}
