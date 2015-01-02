var bot = require('./botville.js');

var express = require('express');
var _ = require('underscore');

var app = express();

var config = {};
try {
  var args = process.argv.slice(2);
  config = _.find(require('./config.json').accounts, function(a) {
    return a.id === Number(args[0]);
  });
} catch (e) {
}

app.use(express.static(__dirname + '/static'));
//app.get('/', function(req, res) {
//  res.render('static/index.html');
//});

//var app = require('http').createServer(app);

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://' + (process.env['MONGODB_LOGIN'] || config.mongodbLogin) + ':' +
  (process.env['MONGODB_PASSWORD'] || config.mongodbPassword) + '@ds029831.mongolab.com:29831/heroku_app21019611';

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

MongoClient.connect(mongoUrl, function(err, db) {

  if (err) console.error(err);

  db.collection('gmessages', function(err, gmessages) {

    if (err) return console.error(err);

    console.log('connected to mongo');

    gmessages.ensureIndex( { id: 1 }, { unique: true, dropDups: true }, function(err) {
      if (err) return console.error(err);

      bot.on('chat', function(msg) {
        gmessages.insert(msg, function(err) {
          if (err) return console.error(err);
          else {
            if (!msg) {
              console.warn('what the fuck')
            }
            emitter.emit('chat', msg);
          }
        });
      });


      io.sockets.on('connection', function (socket) {

        var callback = function(m) {
          if (m) socket.emit('chat', m);
        };

        gmessages.find().sort({timestamp: 1}).each(function(err, m) {
          if (err) return console.error(err);
          if (!m) {
            console.warn('what the fuck 2')
          }
          callback(m);
        });

        emitter.on('chat', callback);

        socket.on('close', function () {
          emitter.removeListener('chat', callback);
        });
      });
    });



  });



});

