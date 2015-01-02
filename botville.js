'use strict';

var phantom = require('phantom');

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();


var args = process.argv.slice(2);
var env = process.env;
var moment = require('moment');
var _ = require('underscore');

var fs = require('fs');

var godvilleUrl = env['GODVILLE_URL'] || 'http://godville.net';

var config;

try {
  config = require('./config.json');
} catch (e) {

}

var acc = function() {
  if (config) {
    return _.find(config.accounts, function(a) {
      return a.id === Number(args[0]);
    });
  } else { // heroku deploy
    return {
      login: env['LOGIN'],
      password: env['PASSWORD'],
      good: env['GOOD']
    }
  }
}();

acc.godvilleUrl = godvilleUrl;

if (acc) {
  initAccount(acc);
} else {
  console.warn('provide account id in arguments and in config file');
  phantom.exit();
}


function initAccount(account) {

  var l = account.login;
  var p = account.password;

  var name = require('./lib/transliterate.js')(l);

  function log(msg, type) {
    try {
      if (type === 'chat') {
        emitter.emit('chat', msg);
        msg = msg.text;
      }
      var heroMsg = '[' + moment().format() + '] ' + msg;
      //if (!isJournal) {
      console.log(l + ': ' + heroMsg);
      //  fs.write('./logs/' + name + '.log', '\n', 'a');
      //  fs.write('./logs/' + name + '.log', heroMsg, 'a');
      //} else {
      //  fs.write('./logs/' + name + '_journal.log', '\n', 'a');
      //  fs.write('./logs/' + name + '_journal.log', heroMsg, 'a');
      //}


    } catch(e) {
      console.log(e);
    }
  }

  phantom.create({parameters: {'cookies-file': 'cookies.txt'}}, function(ph) {
    ph.createPage(function (page) {
      ph.createPage(function (news) {
        initPages(page, news);
      });
    });
  });

  var initPages = function(page, news) {
    page.set('onResourceReceived', function(resource) {
    });

    page.open(account.godvilleUrl + '/superhero', function(status) {
      page.get('url', function(url) {

        page.set('onConsoleMessage', function(msg) {
          if (msg.indexOf('_JOURNAL_') === 0) log(msg.slice('_JOURNAL_'.length, msg.length), 'journal');
          else if (msg.indexOf('__CHAT__') === 0) {
            msg = msg.slice('__CHAT__'.length, msg.length);
            var msgs = msg.split(';');
            var text = msgs.slice(0, -3).join(';');
            var timestamp = Number(msgs.slice(-3, -2)[0]);
            var user = msgs.slice(-2, -1)[0];
            var id = Number(msgs.slice(-1)[0]);
            log({
              text: text,
              timestamp: timestamp,
              user: user,
              id: id
            }, 'chat');
          }
          else log(msg);
        });

        page.set('onUrlChanged', function(url) {
          log('url changed: ' + url);
          if (url == (account.godvilleUrl + '/news')) { // sometimes redirecting with (possibly) reason that news is changed, but not everytime!
            page.onLoadFinished = function() {
              page.evaluate(function(account) {
                document.location = account.godvilleUrl + '/superhero';
              }, function(err) {console.error(err);}, account);
            };
          } else {
            page.set('onLoadFinished', function() {
              log('superhero page load finished');
              try {
                initHeroBot(account);
              } catch (e) {
                // 502 error?
                initAccount(account);
              }
            });
          }
        });

        page.set('onNavigationRequested', function(url, type, willNavigate, main) {
          console.log('Trying to navigate to: ' + url);
          console.log('Caused by: ' + type);
          console.log('Will actually navigate: ' + willNavigate);
          console.log("Sent from the page's main frame: " + main);
        });

        console.warn('page url is: ' + url)
        if (url == account.godvilleUrl + '/login') {
          log('login promt');
          page.render('example_login.png');
          page.evaluate(function(args) {
            $('#username').val(args.login);
            $('#password').val(args.password);
            $('.input_btn').click();
          }, function(err, title) {console.error(err);}, {
            login: l,
            password: p
          });
        } else {
          log('we are logged in already');
          initHeroBot(account);
        }
      });

      log('superhero page opened: ' + status);




      // Sintoi break module
      var lastBreak = moment.unix(0);

      emitter.on('chat', function(msg) {
        var time = moment.unix(msg.timestamp);
        var isSong = msg.text.split('\n').length > 2;
        console.warn(msg.text.split('\n').length)
        if (isSong && time.diff(lastBreak, 'minutes') > 1) {
          lastBreak = time;
          page.evaluate(function() {
            $('.frbutton_pressed .frInputArea textarea').val('брейк');
            $('.frbutton_pressed .frInputArea textarea').trigger($.Event("keypress", { which: 13}));
          });
        }
      });



      function initHeroBot(account) {
        setInterval(function() {
          page.render('example.png');
        }, 10000);
        log('initializing hero bot...');
        page.injectJs('node_modules/underscore/underscore.js');
        page.injectJs('node_modules/moment/moment.js');
        page.evaluate(function(account) {

          var lastMessageTimestamp = 0;
          var lastMessageId = 0;

          $(document).ajaxComplete(function(event, xhr, settings) {
            if (settings.url === 'http://godville.net/fbh/feed') {
              if (xhr.responseJSON && xhr.responseJSON.msg) {
                xhr.responseJSON.msg.forEach(function(msg) {
                  var time = moment(msg.t).unix();
                  var id = msg.id;
                  if (lastMessageTimestamp > time || lastMessageId === id) return;
                  lastMessageTimestamp = time;
                  lastMessageId = id;
                  var user = msg.u;
                  var text = msg.m;

                  console.log('__CHAT__' + text + ';' + time + ';' + user + ';' + id);
                })

              }

            }

          });

          $('.frbutton').click(); // open 'friends'
          $('.fr_line_top:contains(Гильдсовет)').click(); // load guild chat




          console.log('evaluating')

          var isGoodGod = !!account.good;

          var game = [];

          function getGame() {
            $.get('news', function(r) {
              var g = $(r).find('.game h2').filter(function(i, e) {return $(e).text() == 'Разыскиваются'}).parent().find('a').map(function(i, e){return e.innerHTML}).toArray();
              g.push.apply(g, ['Андед-Мороз', 'Сатан-Клаус']);
              if (g[0] !== game[0]) {
                game = g;
                console.log('Daily game changed: ' + game);
              }
            });

          }

          // game = дичь
          (function scheduleGetGame() {
            // check every (hour+2minutes) for new game in news
            var nextRun = moment().startOf('hour').add(1, 'h').add(2, 'm').diff(moment());
            setTimeout(scheduleGetGame, nextRun);
            getGame();
          })();

          var lastNews = '';
          var lastLog = [];
          var isFirstRun = true;

          var SECONDS_BETWEEN_YELLS = 60;
          var getRandom = function(items) {return items[Math.floor(Math.random()*items.length)]};
          var digWords = {verbs: ['копай'],  nouns: ['клад', 'золото']};
          var cancelQuestWords = {verbs: ['отмени', 'брось'],  nouns: ['квест', 'задание']};
          var questWords = {verbs: ['выполняй быстрее', 'делай скорее', 'выполняй скорее', 'делай быстрее'],  nouns: ['задание', 'квест']};
          var violateWords = ['шакал', 'червь', 'ничтожество', 'нехороший человек', 'свинья'];

          var lastYell = 0;
          var bricks = 0;
          var interHandler = setInterval(init, 5000);

          function init() {

            if (document.URL !== account.godvilleUrl + '/superhero') {
              console.log('url changed, restarting bot');
              clearInterval(interHandler); return;
            }

            var newsElement = document.querySelectorAll('.f_news')[0] || {innerHTML: ''};
            var diaryElements = $('#diary .d_content .line');

            var ln = newsElement.innerHTML;
            var ll = diaryElements.map(
              function(i, e) {return {time: $(e).find('.d_time').text(), msg: $(e).find('.d_msg').text(), isInf: !!$(e).find('.d_msg .m_infl').length}}
            );
            var newInLog = [];
            _.find(ll, function(o) {
              if (_.isEqual(o, lastLog[0])) return true;
              newInLog.push(o);
              return false;
            });
            newInLog.reverse().forEach(function(e) {
              console.log('_JOURNAL_'+ e.time + ' - ' + e.msg);
            });
            if (!$('#m_fight_log').length && lastNews === ln && _.isEqual(lastLog, _.select(ll, function(m) {return !m.isInf}))) return;
            lastNews = ln;
            lastLog = ll;
            if (isFirstRun) {isFirstRun = false; return;}

            var now = Math.round(new Date().getTime() / 1000);
            var gold, prana, charges, fatItems, hp, bossHp, absHp, absBossHp;

            /*


             '<div id="o_info" class="block"><div class="block_h"><span class="l_slot"> <span class="b_handle m_hover" style="display: none;" title="Переместить блок">●</span> </span><div class="block_title">Противник</div><span class="r_slot"><span class="h_min m_hover" style="display: none;">↑</span></span></div><div class="block_content"><div class="line" id="o_hk_name"><div class="l_capt">Имя</div><div class="l_val"><a href="http://wiki.godville.net/Тяжеловестник" target="_blank" title="Перейти к описанию этого класса монстров в Энциклобогии">Тяжеловестник</a></div></div><div class="line" id="o_hk_motto"><div class="l_capt">Девиз</div><div class="l_val h_motto">Героев и зрелищ!</div></div><div class="line" id="o_hk_inventory_num"><div class="l_capt">Инвентарь</div><div class="l_val">6 / 25</div><div class="p_bar" title="инвентарь — 24%"><div class="p_val" style="background-color: rgb(136, 45, 23); width: 24%;"></div></div></div><div class="line" id="o_hl1"><div class="l_capt">Здоровье</div><div class="l_val">857 / 1043</div><div class="p_bar" title="здоровье — 82%"><div class="p_val" style="background-color: rgb(0, 128, 0); width: 82%;"></div></div></div><div class="line" id="o_hk_gold_we"><div class="l_capt">Золота</div><div class="l_val">аж 17026 монет</div></div><div class="line" id="o_hk_bricks_cnt" style="display:none;"><div class="l_capt">Кирпичей для храма</div><div class="l_val">0</div></div><div class="line"><div class="l_capt">Способности</div><div class="l_val"><a href="http://wiki.godville.net/Босс-монстры#.D0.A1.D0.BF.D0.BE.D1.81.D0.BE.D0.B1.D0.BD.D0.BE.D1.81.D1.82.D0.B8" target="_blank" title="Перейти к описанию в Энциклобогии">Бойкий, Тащущий, Мощный</a></div></div><div class="line"></div></div></div>'

             */
            var getState = function() {
              gold = parseInt($('#hk_gold_we .l_val').text().replace(/^\D+/g, ''));
              prana = parseInt($('.gp_val').text());
              charges = parseInt($('.acc_val').text());
              fatItems = $('#inv_block_content li').filter(function(i, e){return $(e).css('display') != 'none' && $(e).css('font-weight') == 'bold'});
              var b = parseFloat($('#hk_bricks_cnt .l_val').text());
              if (bricks && bricks != b) {
                console.log('Got bricks: ' + (b - bricks));
              }
              bricks = b;
              var h = $('#hk_health .l_val').text();
              hp = 100 * eval(h);
              absHp = parseInt(h);
              var bh = $('#o_hl1 .l_val').text();
              bossHp = 100*eval(bh);
              absBossHp = parseInt(bh);
            };
            getState();

            var news = $('.f_news').text();

            var isBoss = !!$('#opps').length || !!$('#m_fight_log').length;

            var isTemple = function() {
              return !!$('#hk_retirement').length;
            };

            var isTrade = (function() {
              if (!news) return false;
              //'торговец', 'Получил...за', 'Вытребовал за', 'Поменял...на'  // n золотых монет, n монет, 'торговца'
              // По старой привычке отдаёт чай «Хана» бесплатно...
              if (['Хотел бы я посмотреть на идиота, которому будут впаривать купленный у меня хлам.',
                  'Занимался любимым делом — сбывал честно награбленное.'].indexOf(news) !== -1) return true;
              var other = ['Толпа зевак набилась в лавку', 'Хм, судя по цене — и впрямь бриллиантовая',
                'В приступе внезапной щедрости'];
              for (var i = 0; i < other.length; i++) {
                if (news.indexOf(other[i]) !== -1) return true;
              }
              var n = news.toLowerCase();
              return n.match(/\d.*монет/) ||
                n.match(/\d.*золот/) ||
                (n.indexOf('торгов') !== -1) ||
                (n.indexOf('бесплатно') !== -1);

            })();

            var foundBoss = (function() {
              //['Аккуратно тычет лопатой в землю...', '«Лопаты к бою!»'].indexOf(news) !== -1;
              // Прислушивается к возне под землёй... Создалась лопатовая ситуация...
              if (news.toLowerCase().indexOf('лопат') !== -1) return true;
              if (['Прислушивается к возне под землёй...'].indexOf(news) !== -1) return true;
              return false;
            })();

            var doDeed = function(isGood, reason) {
              if (!isGood) isGood = false; // just reminder
              var influence = isGood ? 'Heal' : 'Lightning';
              console.log("Gold: " + gold + ", Prana: " + prana + ", hp: " + hp + " ; Send " + influence + "!");
              if (reason) console.log('Reason: ' + reason);
              isGood ? $('.enc_link').click() : $('.pun_link').click();
              setTimeout(function() {
                getState();
                setTimeout(function() {
                  console.log("Gold: " + gold + ", Prana: " + prana + " ; after " + influence);
                }, 100);
              }, 2000);
            };
            var doEvil = function(reason) {doDeed(false, reason)};
            var doGood = function(reason) {doDeed(true, reason)};
            var doMiracle = function() {$('.mir_link').click()};
            var recharge = function() {
              //if (charges < 150) return; // TODO safety
              console.log("Charges: " + charges + ", Prana: " + prana + " ; Recharging!");
              $('.dch_link').click();
              setTimeout(function() {
                getState();
                setTimeout(function() {
                  console.log("Charges: " + charges + ", Prana: " + prana + " ; after recharging");
                }, 100);
              }, 1000);
            };
            var getFatItem = function(names) {
              if (typeof names === 'string') names = [names];
              for (var i = 0; i < fatItems.length; i++) {
                var item = fatItems[i];
                if (names.indexOf($(item).text()) !== -1) {
                  item = $(item);
                  item.use = function() {
                    this.find('a').click();
                  };
                  return item;
                }
              }
              return null;
            };
            var getPhilosopherStone = function() {
              return getFatItem(['философский камень (@)', 'алхимический превращатель (@)', 'трансмутирующую установку (@)']);
            };
            var getHeal = function() {
              return getFatItem(['мешочек энергии дзынь (@)', 'активируемый уголь (@)', 'витаминоискатель (@)', 'оттопыриватель чакр (@)', 'сглаживатель биополя (@)']);
            };
            var getBomb = function() {
              return getFatItem(["весёлую мину (@)", "водоворотную бомбу (@)", "киллер-сюрприз (@)", "консервированный файрболл (@)", "кубик огня (@)", "подрывной элемент (@)", "систему наведения порчи (@)", "шариковую молнию (@)", "эскалатор насилия (@)"]);
            };
            var getBossItem = function() {
              return getFatItem([
                'конструктор босса (@)', 'эссенцию геройской дурости (@)', 'зелье беспричинной храбрости (@)', 'стравинку (@)',
                'карту вредных ископаемых (@)', 'лопату для самокопания (@)', 'волшебную палку-копалку (@)', 'накопальню (@)',
                'чёртика в табакерке (@)'
              ]);
            };
            var getPriceless = function() {
              return getFatItem('бесценный дар');
            };
            var getCoolThings = function() {
              var ct = ['комплект еловых иголок (@)', 'мешок Сатан-Клауса (@)', 'бутыль шампанского (@)', 'антифризовую сосульку (@)', 'разрывной фейерверк (@)', 'тазик оливье (@)', 'кулёк конфетти (@)', 'ёлочный шарик (@)',
                'волшебную лампу паладина (@)', 'коробок с вопросиком (@)', 'коробочку с надписью «Не открывать!» (@)', 'сундук мертвеца (@)', 'чёрный ящик (@)', 'чёрный-чёрный ящик (@)', 'ящик пандоры (@)', 'чудо в перьях (@)',
                'слезинку бога в янтаре (@)', 'усилитель божественной воли (@)', // accs
                'бездвоздмездный подарок (@)', 'коробок с ленточкой (@)', 'новогоднее обращение Администратора Годвилля (@)', 'подарок судьбы (@)', 'подарочный сертификат (@)', 'юбилейный золотой (@)',
                'золотую тыкву (@)',
                'заводчик друзей (@)', 'фенечку нежданной дружбы (@)', 'особое приглашение (@)',
                'инвайт на Годвилль (@)',
                'купон на мини-квест (@)', 'пакет с секретным заданием (@)'
              ];
              var res = [];
              for (var i = 0; i < fatItems.length; i++) {
                var item = fatItems[i];
                if (ct.indexOf($(item).text()) !== -1) {
                  item = $(item);
                  item.use = function() {
                    this.find('a').click();
                  };
                  res.push(item);
                }
              }
              if (res.length == 0) return null;
              else {
                res.use = function() {
                  for (var i = 0; i < this.length; i++) {
                    this[i].use();
                  }
                };
                return res;
              }
            };


            var voice = function(text) {
              console.log('sending voice: ' + text);
              $('#god_phrase').val(text);
              $('#voice_submit').click();
              lastYell = now;
            };

            function shuffle(o) {
              for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
              return o;
            }

            var yell = function(words) {
              var yell = '';
              var wrds = shuffle([words.nouns, words.verbs]);
              for (var i = 0; i < 2; i++) {
                yell += getRandom(wrds[i]) + ' ';
              }
              if (Math.random() > 0.4) {
                yell += 'и ';
                for (var i = 0; i < 2; i++) {
                  yell += getRandom(wrds[i]) + ' ';
                }
              }
              return yell + getRandom(violateWords);
            };

            var digYell = function() {
              voice(yell(digWords));
            };

            var cancelQuestYell = function() {
              voice(yell(cancelQuestWords));
            };

            var questYell = function() {
              voice(yell(questWords));
            };

            var healYell = function() {

            };

            var checkIsFight = function() {
              return $('.monster_pb').parent().css('display') != 'none';
            };
            var isFight = checkIsFight();

            var getMonsterName = function() {
              if (!isFight) return 'NOMONSTER';
              return $('.monster_pb').parent().find('.l_val').text();
            };
            var monsterName = getMonsterName();

            var checkMonsterHp = function() {
              var r = $('.monster_pb .p_val');
              return 100 - 100*r.width()/r.parent().width();
            };
            var monsterHp = checkMonsterHp();

            var isGameMonster = (function() {
              if (game.indexOf(monsterName) !== -1) return true;
              if (monsterName) {
                var titles = ['Кирпичный', 'Зажиточный', 'Врачующий', 'Латающий', 'Смертоносный', 'Сюжетный', 'Дарующий', 'Запасливый'];
                for (var i = 0; i < titles.length; i++) {
                  var title = titles[i];
                  if (monsterName.indexOf(title) === 0) return title;
                }
              }
              return false;
            })();

            var isInTown = $('#hk_distance .l_capt').text() == 'Город';

            var isMeltable = !isTrade && !isFight && gold >= 3000;

            var shitQuest = $('.q_name').text().match(/стать \d.*членом гильдии/) && !$('.q_name').text().match(/\(отменено\)/);

            var resurrectLink = $('#cntrl1').children().last();

            if (hp === 0) resurrectLink.click();

            if (!isGoodGod) {
              if (!isBoss) {
                if (getPhilosopherStone() && fatItems.length > 1 && isTrade && !getPriceless()) {
                  if (prana >= 25) {
                    getPhilosopherStone().use();
                  } else {
                    recharge();
                  }
                } else if (getCoolThings()) {
                  getCoolThings().use();
                } else if (isMeltable) { // melt gold
                  console.log(lastNews);
                  //if (getBomb()) getBomb().use(); it's better to sell bombs
                  if (prana >= 25) {
                    doEvil();
                  } else {
                    recharge();
                  }
                } else if (isFight && isGameMonster && monsterHp > hp) {
                  console.log('Found game monster: ' + monsterName);
                  if (isGameMonster === 'Лучезарный' && prana >= 25) {
                    doEvil();
                  } else if (hp <= 10) {
                    if (prana >= 25) {
                      doGood();
                    } else {
                      recharge();
                    }
                  } else {
                    if (prana >= 25) {
                      doEvil();
                    } else {
                      recharge();
                    }
                  }
                } else if (!isFight && !isInTown && getBossItem()) {
                  if (prana >= 50) {
                    getBossItem().use();
                  } else {
                    recharge();
                  }
                } else if (shitQuest && prana >= 5 && !isFight &&  (lastYell + SECONDS_BETWEEN_YELLS < now)) {
                  cancelQuestYell();
                } else if (prana >= 80 && !isFight && !isInTown && hp >= 50 &&  // hp is percent
                  (lastYell + SECONDS_BETWEEN_YELLS < now) && !foundBoss && charges >= 2) {
                  digYell();
                } else if (prana >= 80 && !isInTown && hp < 20) {
                  doGood();
                } else if (prana >= 50 && hp < 10 && getHeal()) {
                  getHeal().use();
                }
              } else {
                // TODO should we interact at all?
                var titles = $($('#o_info .line')[6]).find('.l_val').text().toLowerCase();
                var reason = titles + ' boss';
                var deaf = (titles.indexOf('глушащий') !== -1);
                var parasite = (titles.indexOf('паразитирующий') !== -1);
                var dangerous = (titles.indexOf('мощный') !== -1 ? 1 : 0) + (titles.indexOf('бойкий') !== -1 ? 1 : 0);
                var mirror = (titles.indexOf('лучезарный') !== -1) || (titles.indexOf('неверующий') !== -1);
                // <div id="alls" class="block"><div class="block_h"><span class="l_slot"> <span class="b_handle m_hover" style="display: none;" title="Переместить блок">●</span> </span><div class="block_title">Союзники</div><span class="r_slot"><span class="h_min m_hover" style="display: none;">↑</span></span></div><div class="block_content"><div><div><div class="line"><div class="opp_n">Смашор</div><div class="opp_dropdown fb_round_badge popover-button">▼</div><div class="opp_h">61 / 336</div></div><div class="line"><div class="opp_n">Hanzel</div><div class="opp_dropdown fb_round_badge popover-button">▼</div><div class="opp_h">48 / 136</div></div><div class="line"><div class="opp_n">Скарога</div><div class="opp_dropdown fb_round_badge popover-button">▼</div><div class="opp_h">повержен</div></div></div></div><div class="line"></div></div></div>

                var allies = $('#alls').find('.line .opp_n').parent();
                var aliveAllies = allies.find('div:contains(/)').length;

                var turn = parseInt($('#m_fight_log .block_title').text().match(/\d+/)[0]);
                var bossTurn = turn % 2 === 0;
                var myTurn = !bossTurn;

                if (aliveAllies && myTurn) {
                  if (hp < 50) {
                    if (prana >= 25) {
                      doGood(reason + ' allies: ' + aliveAllies);
                    }
                  }
                } else if (!aliveAllies) {
                  if (myTurn && (hp < 30 || (hp < 50 && !parasite))) {
                    if (prana >= 25) {
                      doGood(reason);
                    }
                  } else if (!mirror && bossTurn) {
                    if (prana >= 25) {
                      doEvil(reason);
                    }
                  }
                }

              }
            } else {
              if (isTemple() && prana >= 50 && isInTown) {
                doMiracle();
              } else if (prana >= 50 && hp < 50) {
                doGood();
              } else if (getCoolThings()) {
                getCoolThings().use();
              } else if (shitQuest && prana >= 5 && !isFight &&  (lastYell + SECONDS_BETWEEN_YELLS < now)) {
                cancelQuestYell();
              }
            }
          }
        }, function(err, title) {
          console.warn('end')
          console.error(title);
          console.error(err);
        }, account);
        log('started');
      }
    });
  };
}


module.exports = emitter;