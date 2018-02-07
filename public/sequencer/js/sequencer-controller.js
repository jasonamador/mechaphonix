/*
listeners
*/
const socket = io();

let patterns = [];
for (let i = 0; i < 8; i++) {
  patterns.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
}

document.getElementById('startButton').addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('sequencer message', {start: true});
});

document.getElementById('stopButton').addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('sequencer message', {stop: true});
});

document.getElementById('sequencer').addEventListener('click', (e) => {
  if (!e.target.classList.contains('row')) {
    let sAndT = e.target.id.split('-').map((el) => parseInt(el));
    let sequence = sAndT[0];
    let time = sAndT[1];
    let strength = patterns[sequence][time];
    if (strength < 3) {
      e.target.classList.replace(`strength-${strength}`, `strength-${strength + 1}`);
      patterns[sequence][time]++;
      socket.emit('sequencer message', {sequence, time, add: true});
    } else {
      e.target.classList.replace(`strength-${strength}`, `strength-${0}`);
      patterns[sequence][time] = 0;
      socket.emit('sequencer message', {sequence, time, add: false});
    }
  }
});
