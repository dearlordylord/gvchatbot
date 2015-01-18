;(function() {
  var heal = function() {voice('лечись жуй корешки пей зеленку')};
  var hit = function() {voice('бей дважды')};

  var prana = function() {
    return Number($('.p_bar[title*=прана] > .p_val')[0].style.width.slice(0, -1));
  };

  var voice = function(what) {
    $('#god_phrase').val(what); $('#voice_submit').click();
  };

  var refill = function() {
    $($('#acc_links_wrap a')[0]).click();
  };

  var tick = function() {
    var prana = prana();
    if (prana <= 25) {
      refill();
    }
  };

  setInterval(tick, 1000);

  // TODO how to find which turn it is: compare hp between first two turns
})();

