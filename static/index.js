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

var dateFormat = function(ts) {
  var date = new Date(ts * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + '/' + month + '/' + year;
};

var currentPage = 0;

socket.on('chat', function(ms) {
  console.warn(ms);
  if (!Array.isArray(ms)) {
    console.warn(currentPage)
    if (currentPage !== 0) return; // do not append if we look at archive
    ms = [ms];
  }
  ms.forEach(function(msg) {
    var li = document.createElement('li');
    li.innerHTML = linkify(escapeHTML('[' + dateFormat(msg.timestamp) + ']' + msg.user +  ': ' + msg.text));
    document.querySelector('#messages').appendChild(li);
  });
});

socket.emit('page', 0);



window.init = function() {
  pageElement().value = currentPage;
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
  currentPage = page;
  clear();
  socket.emit('page', currentPage);
};

window.createMessage = function(f) {
  var e = f.elements['message'];
  var message = e.value;
  console.warn(message);
  socket.emit('createMessage', message);
  e.value = '';
  return false;
};