'use strict';

module.exports = function(emitter, page, opts) {

  emitter.on('chat', function(msg) {
    var nickname = msg.myNickname;
    if (!nickname) {
      console.error('thanks need nickname!');
      return;
    }

    if (msg.text.indexOf('@' + nickname) !== -1) {
      if (msg.text.match(/спасибо/)) {
        page.evaluate(function(props) {
          window.chatMessage('@' + props.user + ': благословил.');
        }, function() {}, {user: msg.user});
      }
    }
  });
};