'use strict';

module.exports = function(emitter, page, opts) {

  emitter.on('chat', function(msg) {
    if (msg.text === 'ролл') {
      page.evaluate(function(props) {
        window.chatMessage('@' + props.user + ' результат ролла: ' + Math.round(Math.random() * 100) + '/100');
      }, function() {}, {user: msg.user});
    }
  });
};

module.exports.help = 'Модуль ролла. Напиши "ролл" для получения случайного числа.';