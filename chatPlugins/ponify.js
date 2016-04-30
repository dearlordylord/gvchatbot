'use strict';

var API_ROOT = 'https://derpiboo.ru/';

var IMGUR_ID = process.env['IMGUR_ID'];
var IMGUR_SECRET = process.env['IMGUR_SECRET'];

if (!IMGUR_ID || !IMGUR_SECRET) {
  console.error('IMGUR_ID or IMGUR_SECRET env variables are not set; ponify plugin wont be loaded');
  return null;
}

var imgur = require('imgur');
imgur.setClientId(IMGUR_ID);



var _ = require('underscore');
var rp = require('request-promise');

module.exports = function(emitter, page, opts) {

  emitter.on('chat', function(msg) {
    var nickname = msg.myNickname;
    if (!nickname) {
      console.error('ponify need nickname!');
      return;
    }

    if (msg.text.indexOf('@' + nickname) === 0) {
      if (msg.text.match(/пони/i)) {
        page.evaluate(function() {
          window.chatMessage('подгружаю пони...');
        });
        random().then(function(url) {
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

module.exports.help = 'Модуль пони. Напиши "@ник_бота дай мне пони" для получения свежей пони.'

var getRequest = function(api, query) {
  var path = api + '.json?' + query;
  return rp({
    url: API_ROOT + path,
    json: true
  });
};

var makeSearchQuery = function(tags, params) {
  params = params || {};
  var COMMA = '%2C';
  var tagsString = tags.map(function(tag) {
    return tag.replace(' ', '+');
  }).join(COMMA);
  params['q'] = tagsString;
  return _.map(params, function(v, k) {
    return k + '=' + v;
  }).join('&');
};

var random = function() {
  var randomQuery = makeSearchQuery(['-suggestive', '-explicit', '-semi-grimdark', '-grimdark'], {
    min_score: 88,
    random_image: true
  });
  return getRequest('search', randomQuery).then(function(res) {
    return getRequest(res.id);
  }).then(function(image) {
    return 'https:' + image.image;
  }).then(imgur.uploadUrl)
    .then(function(json) {
      return json.data.link;
    });
};

