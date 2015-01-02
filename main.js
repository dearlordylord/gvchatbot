var bot = require('./botville.js');

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/static'));
//app.get('/', function(req, res) {
//  res.render('static/index.html');
//});

//var app = require('http').createServer(app);



var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

//io.configure(function () {
//  io.set("transports", ["xhr-polling"]);
//  io.set("polling duration", 10);
//});

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
var server = app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

var io = require('socket.io').listen(server);

var messages = [];

bot.on('chat', function(msg) {

  var lastMsg = messages[0];
  console.warn('chat event!')
  console.warn(msg.timestamp)
  if (lastMsg && lastMsg.timestamp >= msg.timestamp) return;
  messages.unshift(msg);
  emitter.emit('chat', msg);

});


io.sockets.on('connection', function (socket) {

  var callback = function(m) {
    socket.emit('chat', m);
  };

  for(var i = messages.length-1; i >= 0; i--) {
    callback(messages[i]);
  }

  emitter.on('chat', callback);

  socket.on('close', function () {
    emitter.removeListener('chat', callback);
  });
});