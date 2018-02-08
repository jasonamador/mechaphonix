const socket = io()
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let minimumImpact = -5
let resetImpact = -1
let unmuted = false
let state = 'rest'

// start audio context for mobile devices
StartAudioContext(Tone.context, '#play')

function toggleMute() {
  unmuted = !unmuted
  document.getElementById('play').innerHTML = unmuted? 'MUTE': 'UNMUTE'
}

// setup swipe interface
$(function(){
  console.log('making swipe event');
  // Bind the swipeHandler callback function to the swipe event on div.box
  $( "#selector" ).on( "swipe", swipeHandler );

  // Callback function references the event target and adds the 'swipe' class to it
  function swipeHandler( event ){
    console.log('swipe detected');
    let swipe = event.special.swipe
    let direction = swipe.handleSwipe(swipe.start,swipe.stop)
    socket.emit('log', direction);
  }
});

// establish socket connection
socket.on('connect', function() {
  // play the notes this device produced
  // socket.on('play notes self', function(data){
  //   console.log(data);
  //   if (unmuted) polySynth.triggerAttackRelease(data.notes, "2n");
  // })

  // react to changes in device acceleration
  window.ondevicemotion = function(event) {
    // get acceleration data
    let acceleration
    if (event.acceleration.x) {
      acceleration = event.acceleration
      accelerationy = acceleration.y
    } else {
      acceleration = event.accelerationIncludingGravity
      accelerationy = acceleration.y - 9.81
    }

    // socket.emit('log', accelerationy);

    // if acceleration is high in the negative z, set state to struck
    if (state == 'ready' && (acceleration.y) > -minimumImpact) {
      socket.emit('phone drum message', {note: 'd4', acceleration});
      state = 'struck'
    }

    // if acceleration is low in the negative z, set state to rest
    if (state == 'struck' && (acceleration.y) > -resetImpact) {
      state = 'rest'
    }

    // if acceleration is high in the positive z, set state to ready
    if (state == 'rest' && (acceleration.y) < resetImpact) {
      state = 'ready'
    }

    // emit a message to the server containing the new position data
  };
});
