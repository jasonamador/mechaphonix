{

const sampler = new Tone.Sampler({
  'a4' : '/samples/shaker.mp3',
  'b4' : '/samples/cowbell.wav',
  'c4' : '/samples/clap.wav',
  'd4' : '/samples/large_drum.mp3',
  'e4' : '/samples/snare.wav',
  'f4' : '/samples/triangle.mp3'
}, () => {
  socket.on('phone drum message', (message) => {
    sampler.triggerAttack(message.note);
    console.log(message.acceleration);
  });
}).toMaster();

}
