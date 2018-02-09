paper.install(window);
let x1= 720;
let y1=350;
let path;
let r = 0.5;
let g = 0.5;
let b = 0.5;
let color = new Color(r, g, b);
window.onload = function(){
console.log("window loaded");
  paper.setup("myCanvas");

  path =new Path.Circle(new Point(x1,y1), 50);
 path.fillColor=color;
console.log(path)

paper.view.draw()
}
  // {
  //   center: new Point(100, 100),
  //   radius: 30,
  //   strokeColor:'black'
  // });



// MIDI signal controller
function midiPaper(midi) {
  console.log(midi);
  console.log(midi.vel)
  console.log(midi.note)
  console.log(path)
  if(midi.cc === 224){
    if(midi.vel > 64){
      path.position = new Point(x1,(y1-midi.vel));
    }
  }
  if(midi.cc === 153 && midi.note === 50 && midi.vel > 0){
      color.r =  0.5;
  }
  if(midi.cc == 153 && midi.note === 45 && midi.vel > 0){

  }

}
