paper.install(window);



let path;

let pt1 =(670, 300);
let pt2 =(670, 400);
let pt3 =(570, 400);
let pt4 =(570, 300);
window.onload = function(){
console.log("window loaded");
  paper.setup("myCanvas");

path =new Path();
path.strokeColor = 'black';
path.add(new Point(pt1));
path.add(new Point(400, 670));
path.add(new Point(570, 400));
path.add(new Point(570, 300));

path.closed = true;

paper.view.draw()
}

// MIDI signal controller
function midiPaper(midi) {
  console.log(midi);
  console.log(midi.vel)
  console.log(midi.note)
  console.log(path)
  if(midi.cc === 224){
    // if(midi.vel > 64){
    //   path.position = new Point(300,(400-(midi.vel + 2)));
    // }
    // if(midi.vel < 64){
    //   path.position = new Point(x,(y1 - (midi.vel +2)));
    // }
  }
  // if(midi.cc === 176){
  //   path.position = new Point((x1 - midi.vel), y1)
  // }
  //
  // if(midi.cc === 176 &&)
  // if(midi.cc === 153 && midi.note === 50 && midi.vel > 0){
  //   path.colorFill = "blue"
  // }
  // if(midi.cc == 153 && midi.note === 45 && midi.vel > 0){
  //
  // }

}
