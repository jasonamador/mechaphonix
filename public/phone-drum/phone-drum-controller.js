$.mobile.autoInitializePage = false;

const socket = io()
const context = new AudioContext();

// set previous variables and minimum degree change needed to emit a new message
let struckForce = 15
let readyForce = 5
let restForce = 10
let unmuted = false
let state = 'rest'
let instruments = [
  {
    name: '<-  triangle  ->',
    note: 'c4',
    color: '#477998'
  },
  {
    name: '<-  drum  ->',
    note: 'd4',
    color: '#477998'
  },
  {
    name: '<-  shaker  ->',
    note: 'e4',
    color: '#477998'
  }
]
let instrument = 0
setInstrument(instrument)

// start audio context for mobile devices
StartAudioContext(Tone.context, '#play')

function toggleMute() {
  unmuted = !unmuted
  document.getElementById('play').innerHTML = unmuted? 'MUTE': 'UNMUTE'
}


// setup swipe interface
$(function(){
  // Bind the swipeleftHandler callback function to the swipe event on div.box
  $(window).on( "swipeleft", swipeleftHandler );
  // Callback function references the event target and adds the 'swipeleft' class to it
  function swipeleftHandler( event ){
    instrument = (instrument + 1) % 3
    setInstrument(instrument)
  }

  $(window).on( "swiperight", swiperightHandler );
  // Callback function references the event target and adds the 'swipeleft' class to it
  function swiperightHandler( event ){
    instrument = (instrument + 2) % 3
    setInstrument(instrument)
  }
});

function setInstrument(instrument) {
  $('#selector').html(instruments[instrument].name);
  $('#selector').css( "background-color", instruments[instrument].color);
}

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
      acceleration = Math.sqrt(event.acceleration.x * event.acceleration.x +
                     event.acceleration.y * event.acceleration.y +
                     event.acceleration.z * event.acceleration.z)

    } else {
      acceleration = Math.sqrt(event.accelerationIncludingGravity.x * event.accelerationIncludingGravity.x +
                     event.accelerationIncludingGravity.y * event.accelerationIncludingGravity.y +
                     event.accelerationIncludingGravity.z * event.accelerationIncludingGravity.z) - 9.81
    }

    // if acceleration is high in the negative z, set state to struck
    if (state == 'ready' && acceleration > struckForce) {
      socket.emit('phone drum message', {note: instruments[instrument].note, acceleration});
      state = 'struck'
    }

    // if acceleration is low in the negative z, set state to rest
    if (state == 'struck' && acceleration < restForce) {
      if (instrument == 1) {
        state = 'rest'
      } else {
        state = 'ready'
      }
    }

    // if acceleration is high in the positive z, set state to ready
    if (state == 'rest' && acceleration > readyForce) {
      state = 'ready'
    }
  };
});
