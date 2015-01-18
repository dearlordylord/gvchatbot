var socket = io.connect(window.location.hostname);

var escapeHTML = (function () {
  'use strict';
  var chr = { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' };
  return function (text) {
    return text.replace(/[\"&<>]/g, function (a) { return chr[a]; });
  };
}());

var linkify = function(text) {
  var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '">' + url + '</a>';
  })
};

var pageElement = function() {
  return document.querySelector("#pageForm").elements['page'];
};

socket.on('chat', function(ms) {
  if (!Array.isArray(ms)) {
    if (pageElement().value === 0) return; // do not append if we look at archive
    ms = [ms];
  }
  ms.forEach(function(msg) {
    var li = document.createElement('li');
    li.innerHTML = linkify(escapeHTML('[' + msg.timestamp + ']' + msg.user +  ': ' + msg.text));
    document.querySelector('#messages').appendChild(li);
  });

});

socket.emit('page', 0);

window.init = function() {
  pageElement().value = 0;
};

var clear = function() {
  var messages = document.querySelector('#messages');
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
};

window.paging = function(f) {
  var page = f.elements['page'].value;
  if (!page) page = 0;
  page = Number(page) || 0;
  clear();
  socket.emit('page', page);
};