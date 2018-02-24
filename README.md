# [Mechaphonix](https://mechaphonix.herokuapp.com)
### An experimental multimedia performance tool
Mechaphonix is a collaborative multimedia performance platform which allows users to use a number of unique control devices including the camera, accelerometer and a simple EEG to create music together in real-time over the internet.

This experiment has following components:
## Client Side
### [Master](https://mechaphonix.herokuapp.com/master)
"Master" interprets all of the [socket.io](https://socket.io) messages from any connected performers and outputs the sound using the amazing [Tone.js](http://tonejs.github.io) library which elegantly sugar coats the Web Audio API.

### [MIDI](https://mechaphonix.herokuapp.com/midi)
"MIDI" takes all MIDI signals that the browser is getting via the Web MIDI API and turns them into JSON objects that are sent to the server then broadcasted to all of the "Master"s using [socket.io](https://socket.io).

### [Liquid](https://mechaphonix.herokuapp.com/liquid)
"Liquid" uses the webcam, a great library called [tracking.js](https://trackingjs.com), and a cool WebGL liquid simulator by [PavelDoGreat](https://codepen.io/PavelDoGreat) to control three different sounds with three different colored LEDs and get some beautiful interactive visuals.  Relative coordinates of each of the tracked LEDs are broadcasted to the Masters.



This will consist of a simple menu to choose what controller you are using based on what peripherals the device has available to it (accellerometer, camera, mic), and the code that will actually send the signals through the WebSocket.
### ChucK
[ChucK](http://chuck.cs.princeton.edu/) is going to actually be making the noise.  All of its input will come from the MIDI that the Node server is emitting and create the sounds on the master device.  ChucK is a live coding environment, so we will have a number of synthesizers saved, but that code can be modified on the fly to create totally unique sounds.  It will also provide some visualizations.
### Initial wireframe
![img_4247](https://user-images.githubusercontent.com/8572233/35753959-46ab540a-0827-11e8-989b-924d4a2f37f6.JPG)

### DIY EEG tutorials
We made our eeg device out of a Nurosky MindFlex toy and an arduino by following this tutorial: http://www.frontiernerds.com/brain-hack

Other EEG devices should work similarly but will require changes to mind-app.js in order to recive your data from your EGG.

![img_4251](https://user-images.githubusercontent.com/8572233/35826225-bf4336dc-0a7d-11e8-8243-cfac2b832661.JPG)


# CRAZY SOUNDS, PRETTY LIGHTS, INTERACTIVITY
