const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('instruments');
});
app.get('/sequencer', function(req, res){
  res.render('sequencer');
});
app.get('/midi', function(req, res){
  res.render('midi');
});
app.get('/master', function(req, res){
  res.render('master');
});
app.get('/phone-chord', function(req, res){
  res.render('phone-chord');
});
app.get('/phone-drum', function(req, res){
  res.render('phone-drum');
});
app.get('/liquid', function(req, res){
  res.render('liquid');
});

// the code below creates a new socket for every connection to the server socket, so socket refers to whatever device made the connection.
io.on('connection', function(socket){
  console.log('connected')

  socket.on('log', (message) => {
    console.log('log:', message);
  });

  socket.on('pulse message', (message) => {
    console.log('pulse is:', message);
  });

  socket.on('phone drum message', (message) => {
    // socket.emit('phone drum message', message);
    socket.broadcast.emit('phone drum message', message);
  });

  socket.on('phone chord message', (message) => {
    // socket.emit('phone chord message', message);
    socket.broadcast.emit('phone chord message', message);
  });

  socket.on('eeg message', (message) => {
    console.log('sending eeg notes:', message.notes);
    socket.broadcast.emit('eeg message', message);
  });

  socket.on('liquid message', (message) => {
    // socket.emit('liquid-1 message', message);
    socket.broadcast.emit('liquid message', message);
  });

  socket.on('sequencer message', (message => {
    // socket.emit('sequencer message', message);
    socket.broadcast.emit('sequencer message', message);
  }));

  socket.on('midi message', (message) => {
    // socket.emit('midi message', message);
    socket.broadcast.emit('midi message', message);
    console.log(message);
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});
