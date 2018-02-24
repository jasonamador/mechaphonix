# [Mechaphonix](https://mechaphonix.herokuapp.com)
### An experimental multimedia performance tool
Mechaphonix is a collaborative multimedia performance platform which allows users to use a number of unique control devices including the camera, accelerometer and a simple EEG to create music together in real-time over the internet.

## Try It
You can just go to (https://mechaphonix.herokuapp.com) and play around!  Remember that only [Master](https://mechaphonix.herokuapp.com/master) actually makes sound, and all of the other routes allow you to send the messages to it.
If you want to run it locally just clone this repo, run `npm install && bower install`, and you should then be able to run `node server.js` and access the application via (http://localhost:3000) and have additional performers browse to `the.ip.on.your.network:3000` to interact with it.

This experiment has following components:
## Client Side
### [Master](https://mechaphonix.herokuapp.com/master)
"Master" interprets all of the [socket.io](https://socket.io) messages from any connected performers and outputs the sound using the amazing [Tone.js](http://tonejs.github.io) library which elegantly sugar coats the Web Audio API.

### [MIDI](https://mechaphonix.herokuapp.com/midi)
"MIDI" takes all MIDI signals that the browser is getting via the Web MIDI API and turns them into JSON objects that are sent to the server then broadcasted to all of the "Master"s using [socket.io](https://socket.io).

### [Liquid](https://mechaphonix.herokuapp.com/liquid)
"Liquid" uses the webcam, a great library called [tracking.js](https://trackingjs.com), and a cool WebGL liquid simulator by [PavelDoGreat](https://codepen.io/PavelDoGreat) to control three different sounds with three different colored LEDs and get some beautiful interactive visuals.  Relative coordinates of each of the tracked LEDs are broadcasted to any Master connections to interpret and create sounds.

### [Phone Chord](https://mechaphonix.herokuapp.com/phone-chord)
"Phone Chord" takes input from a device with an accelerometer and a compass to convert 3D orientation into tones.  It sends raw orientation data and turns it into two note signals that it broadcasts to all Master connections.

### [Phone Drum](https://mechaphonix.herokuapp.com/phone-drum)
"Phone Chord" takes input from a device with an accelerometer and a compass to convert 3D orientation into tones.  It sends raw orientation data and turns it into two note signals that it broadcasts to all Master connections.

### [Sequencer](https://mechaphonix.herokuapp.com/sequencer)
"Sequencer" is a super simple drum sequencer interface that sends signals to all connected Masters that add and remove sample triggers to a sampler.  It's a simple drum machine.

### EEG
We made our eeg device out of a Nurosky MindFlex toy and an arduino by following this tutorial: http://www.frontiernerds.com/brain-hack

Other EEG devices should work similarly but will require changes to mind-app.js in order to recive your data from your EGG.

![img_4251](https://user-images.githubusercontent.com/8572233/35826225-bf4336dc-0a7d-11e8-8243-cfac2b832661.JPG)

## Server Side
### Just a Simple Express Server
We created some routes to serve the client side applications, which once loaded interact with the Express.js server only through [socket.io](https://socket.io) connections.  It's a hub for the socket messages.

# CRAZY SOUNDS, PRETTY LIGHTS, INTERACTIVITY
