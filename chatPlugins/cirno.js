'use strict';

//http://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=cirno+-nude+-pussy+-ass+-breasts&pid=1

var _ = require('underscore');
var rp = require('request-promise');
var xml2js = require('xml2js');
var q = require('q');

var cirnoRequest = 'http://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=cirno+-nude+-pussy+-ass+-breasts&pid=';

var cirno = function() {
  var page = Math.round(Math.random() * 100);
  return rp(cirnoRequest + page).then(function(res) {
    return q.nfcall(xml2js.parseString, res);
  }).then(function(res) {
    return res.posts.post[Math.round(Math.random() * (res.posts.post.length - 1))].$.file_url;
  });
};

cirno();

module.exports = function(emitter, page, opts) {

  emitter.on('chat', function(msg) {
    var nickname = msg.myNickname;
    if (!nickname) {
      console.error('cirno need nickname!');
      return;
    }

    if (msg.text.indexOf('@' + nickname) === 0) {
      if (msg.text.match(/сырн[оуыа]/i)) {
        page.evaluate(function() {
          window.chatMessage('подгружаю сырну...');
        });
        cirno().then(function(url) {
          page.evaluate(function(opts) {
            window.chatMessage('@' + opts.user + ': ' + opts.url);
          }, function() {}, {user: msg.user, url: url});
        }, function(e) {
          page.evaluate(function() {
            window.chatMessage('ошибка: ' + e);
          });
        }).done();
      }
    }
  });
};

module.exports.help = 'Модуль Сырны: написавшему "@ник_бота: сырна/сырну/сырны" воздастся.';