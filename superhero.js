function OrbClient(a) {
  this.g_client = new GClient, this.error_cnt = 0, this.conn_timeout = 0, this.data_rcv_timeout = 0, this.connected = !1, this.transport_name = "comet", this.packet_handler = a, this.transport_enabled = !0
}
function PollClient(a, b, c) {
  this.transport_name = "poll", this.packet_handler = a, this.timer_id = 0, this.url = b, this.period = c, this.connected = !1
}
function WsClient(a, b) {
  this.ws_url = a, this.packet_handler = b, this.retry_cnt = 0, this.transport_name = "websockets", this.ws_conn_interval_id = 0, this.data_rcv_timeout = 0, this.error_cnt = 0
}
function getCookie(a) {
  return document.cookie
}
function gv_error(a) {
  typeof console == "object" && console && window.gv_debug == !0 && console.error(a)
}
function gv_log(a) {
  typeof console == "object" && console && window.gv_debug == !0 && console.log(a)
}
function JsonProto() {
  this.packet_started = !1, this.buffer = "", this.packet_type = null, this.packet_size, this.callback_obj = null, this.state = "disconnected"
}
function SimpleJsonProto() {
}
function start_search(a) {
  function b() {
    a.search_cnt += 1, $.post(base_api_url, {a: get_cmd_id("m5S1KBfBxKhNWuu61EjC")}, function (b) {
      b && b.status == "success" && b.hero && (b.hero.expired ? ($("#search_line1").html(b.hero.search1), a.search_cnt % 5 == 0 && (search2 = $("#search_line2"), search2.html(b.hero.search2), search2.css("display") == "none" && search2.fadeIn())) : a.on_json.apply(a, [b]))
    })
  }

  return window.setInterval(b, 18e4)
}
function ScreenManager() {
  this.screen_created = !1, this.search_displayed = !1, this.search_cnt, this.state = new Hs, this.nm = new NM, this.hints = new Hints, this.ach = new Ach, this.force_msg_update_timer = 0, this.voices = new Voices, this.ui = new UILib, this.block_clbks = {}, this.pending_error = !1, this.page_layout = $.Storage.get("pl"), window.fb_frame ? this.page_layout = "2c" : this.page_layout || (this.page_layout = "3c"), this.page_layout == "3c" ? ($("#main_wrapper").addClass("page_wrapper"), this.h_blocks = {
    left: ["stats", "pet", "pantheons", "invites", "ideabox", "gl3d"],
    center: ["control", "news", "diary"],
    right: ["inventory", "equipment", "skills", "trader"]
  }, this.as_blocks = {
    left: ["alls", "m_info", "m_inventory"],
    center: ["m_control", "m_fight_log"],
    right: ["map", "opps", "o_info", "o_inventory"]
  }) : this.page_layout == "2c" ? ($("#main_wrapper").addClass("page_wrapper_2c"), this.h_blocks = {
    left: ["stats", "ies_block"],
    center: ["control", "news", "diary"]
  }, this.as_blocks = {
    left: ["m_info", "m_inventory", "map"],
    center: ["m_control", "m_opponent", "m_fight_log"]
  }) : ($("#main_wrapper").addClass("page_wrapper_5c"), this.h_blocks = {
    l_left: ["equipment", "skills", "gl3d"],
    left: ["stats", "pet", "trader"],
    center: ["news", "diary"],
    right: ["control", "inventory"],
    r_right: ["pantheons", "ideabox", "invites"]
  }, this.as_blocks = {
    l_left: ["m_inventory"],
    left: ["alls", "m_info"],
    center: ["m_control", "m_fight_log"],
    right: ["map", "opps", "o_info"],
    r_right: ["o_inventory"]
  }), this.blocks_spinner = {
    stats: !0,
    diary: !0,
    inventory: !0,
    control: !0,
    ideabox: !0,
    invites: !0,
    m_fight_log: !0,
    pantheons: !0,
    ies_block: !0,
    pet: !0,
    trader: !0
  };
  var a = $.Storage.get("states");
  this.h_state = {}, a && (this.h_state = jQuery.parseJSON(a));
  var b = $.Storage.get("as_states");
  this.as_state = {}, b && (this.as_state = jQuery.parseJSON(b)), this.d_sort = new Object, this.d_sort.value = $.Storage.get("d_so"), this.d_sort.value || (this.d_sort.value = "up"), jQuery.browser.msie ? this.theme = "th_classic" : (this.theme = $.Storage.get("ui_s"), this.theme == undefined ? this.theme = "th_classic" : this.theme == "th_nightly" && (glow_color = "#474646")), $("head").append($("<link rel='stylesheet' href='" + window.location.protocol + "//" + window.gv_domain + window.gv_port + "/stylesheets/" + this.theme + ".css' type='text/css' media='screen' />")), $("#main_wrapper").addClass(this.skin), this.turbo_image, window.fb_frame ? this.turbo_image = $('<div id="turbo_icon" class="t_icon t_yellow"></div>') : this.turbo_image = $('<li id="turbo_icon" style="display:inline-block;" class="t_icon t_yellow"></li>'), this.turbo_image.attr("title", Loc.TurboDisabled), this.tme = $.Storage.get("tme"), this.tme == undefined && (this.tme = "true", $.Storage.set("tme", this.tme)), window.ampm = $.Storage.get("tampm"), window.ampm == undefined && (Loc.locale == "en" ? window.ampm = "12h" : window.ampm = "24h"), window.fb_frame ? this.ui.create_top_menu_panel(this, this.turbo_image) : $("#menu_bar").show(), this.d_share_enabled = $.Storage.get("d_share_en"), this.d_share_enabled == undefined ? this.d_share_enabled = !0 : this.d_share_enabled = jQuery.parseJSON(this.d_share_enabled);
  var c = $("#m_hero");
  c.html(Loc.shero_menu_item), c.append($('<a style="font-family: verdana,arial,helvetica,code2000,sans-serif,segoe UI Symbol;" href="/hero"></a>').html(Loc.hero_menu_item).attr("title", Loc.hero_menu_item_title)), c.append(this.turbo_image), c.append("|"), this.m_update_timeout = undefined, load_failed_timer && (window.clearTimeout(load_failed_timer), load_failed_timer = undefined);
  var d = status_check(this), e = 0;
  window.setInterval(function () {
    e++, e < 8 ? d() : setTimeout(function () {
      var a = "/news";
      window.fb_frame && (a = "/fb/index"), document.location.href = window.location.protocol + "//" + document.domain + a
    }, 1e3)
  }, 36e5)
}
function randomstring(a) {
  var b = "", c = function () {
    var a = Math.floor(Math.random() * 62);
    if (a < 10)return a;
    if (a < 36)return String.fromCharCode(a + 55);
    return String.fromCharCode(a + 61)
  };
  while (b.length < a)b += c();
  return b
}
function UILib(a) {
}
function WebNotify(a, b) {
  this.state = a, this.sm = b;
  if (supports_local_storage())try {
    this.settings = jQuery.parseJSON(localStorage.getItem("dn_p" + this.state.godn)), this.cache = jQuery.parseJSON(localStorage.getItem("dn_ch" + this.state.godn))
  } catch (c) {
  }
  this.settings || (this.settings = {}), this.cache || (this.cache = {}), b.nm.register("messages_badge", this), this.star_notify = Object();
  var d = this;
  this.permission = null, this.star_notify.update = function () {
    window.isActive == !1 && d.notify("fr_msg", {})
  }, b.nm.register("new_msg_star", this.star_notify)
}
function my_clone(a) {
  if (null == a || "object" != typeof a)return a;
  var b = a.constructor();
  for (var c in a)a.hasOwnProperty(c) && (b[c] = a[c]);
  return b
}
function hash_keys(a) {
  if (a == undefined)return [];
  var b = [];
  for (var c in a)a.hasOwnProperty(c) && b.push(c);
  return b
}
function subtract_arrays() {
  var a = arguments[0], b = [], c = "", d = 1, e = "", f = {};
  arr1keys:for (c in a)for (d = 1; d < arguments.length; d++) {
    f = arguments[d];
    for (e in f)if (f[e] === a[c])continue arr1keys;
    b[c] = a[c]
  }
  return b
}
function Voices() {
  if (supports_local_storage()) {
    this.loaded = !1, this.vdata = localStorage.getItem("gvh"), this.vdata_a = localStorage.getItem("gva"), this.vdata_d = localStorage.getItem("gvd"), this.vdata == null && this.vdata_a == null && (this.default_list = !0);
    try {
      this.vdata = jQuery.parseJSON(this.vdata), this.vdata_a = jQuery.parseJSON(this.vdata_a), this.loaded = !0
    } catch (a) {
      gv_log("failed to voices from cache")
    }
    var b = !1;
    if (this.vdata_d == null)this.vdata_d = [], b = !0; else try {
      this.vdata_d = jQuery.parseJSON(this.vdata_d)
    } catch (a) {
      gv_log("failed to dun voices from cache"), this.vdata_d = []
    }
    if (this.loaded == !1 || this.vdata == null || this.vdata_a == null)this.vdata = [], this.vdata_a = [];
    b && this.add_default_d()
  }
}
function Pantheons(a, b) {
  this.nm = a, this.state = b, this.godname = this.state.godname(), this.nm.register("reset", this), this.old_pantheons = {};
  if (supports_local_storage()) {
    this.use_local_storage = !0, this.group_cnt = localStorage.getItem("p__grp_cnt" + JSON.stringify(this.godname)), this.pantheons = localStorage.getItem("p__grp" + JSON.stringify(this.godname)), this.last_p_updated_at = localStorage.getItem("p__upd_at" + JSON.stringify(this.godname)), this.load_old();
    try {
      this.group_cnt = jQuery.parseJSON(this.group_cnt), this.pantheons = jQuery.parseJSON(this.pantheons), this.last_p_updated_at = jQuery.parseJSON(this.last_p_updated_at)
    } catch (c) {
      this.pantheons = undefined
    }
  }
  var d = (new Date).getTime();
  this.pantheons && this.last_p_updated_at && d - this.last_p_updated_at < 18e5 ? this.loaded = !0 : (this.use_local_storage = !1, this.group_cnt = 0, this.pantheons = {}, this.loaded = !1);
  var e = function (a) {
    return function () {
      a.check_for_updates.call(a)
    }
  };
  this.check_for_updates(), this.interval_id = setInterval(e(this), 6e4)
}
function Messages(a, b) {
  this.nm = a, this.messages = {}, this.guild_messages = {}, this.guild_message_ids = {}, this.to_delete = [], this.to_update = [], this.loaded = !1, this.h_pages = {}, this.godname = b, this.gc_ext_perms = undefined, this.wr_perms = undefined, this.gc_topic = "";
  if (supports_local_storage()) {
    this.use_local_storage = !0, this.friends = localStorage.getItem("fr_arr" + this.godname), this.h_friends = localStorage.getItem("fr_h" + this.godname), this.fr_upd_cnt = localStorage.getItem("fr_up_cnt" + this.godname), this.m_id = localStorage.getItem("fr_mid" + this.godname), this.gc_m_id = localStorage.getItem("gc_mid" + this.godname);
    try {
      this.friends = jQuery.parseJSON(this.friends), this.h_friends = jQuery.parseJSON(this.h_friends), this.fr_upd_cnt = parseInt(jQuery.parseJSON(this.fr_upd_cnt)), this.m_id = jQuery.parseJSON(this.m_id), this.gc_m_id = jQuery.parseJSON(this.gc_m_id), gv_log("loaded friends from cache"), this.loaded = !0
    } catch (c) {
      gv_log("failed to load friends from local cache")
    }
  }
  (this.loaded == !1 || this.friends == null || this.h_friends == null) && this.reset_storage()
}
function Ach() {
  this.messages = {}
}
function Hints() {
  this.new_hints = [], this.hints = {}, this.unknown_ids = {}, this.known_ids = {}, this.queue = [], this.hint_displayed = !1, this.blog_hint_displayed = !1
}
function NM() {
  this.bindings = {}
}
function Hs() {
  this.inventory = {}, this.opps = {}, this.alls = {}, this.equipment = {}, this.skills = {}, this.stats = {}, this.diary = {}, this.diary_l = 0, this.diary_i = {}, this.last_news = {value: ""}, this.pet = {}, this.has_pet = !1, this.search1 = "", this.godn = "", this.cmds = null, this.pets = [], window.time_diff = 0, this.o_stats = {}, this.o_equipment = {}, this.o_inventory = {}, this.a_fight_log = {}, this.d_map = [], this.pet_keys = ["pet_birthday_string", "pet_level", "pet_class", "pet_is_dead", "pet_is_dead_str", "pet_name", "pet_special", "pet_rename"], this.stats_keys = ["name", "godname", "gender", "ggender", "age_str", "gold", "gold_we", "level", "quest", "quest_progress", "exp_progress", "health", "max_health", "inventory_num", "inventory_max_num", "alignment", "motto", "clan", "clan_position", "expired", "diary_last", "temple_completed_at", "pet_completed_at", "ark_completed_at", "town_name", "c_town", "distance", "aura_name", "aura_time", "bricks_cnt", "wood", "godpower", "max_gp", "clan_position", "monsters_killed", "death_count", "arena_won", "arena_lost", "is_arena_available", "d_a", "is_chf_available", "chf_pending", "age_str", "birthday", "accumulator", "quests_completed", "monster_name", "monster_progress", "s_progress", "is_arena_disabled", "arena_send_after", "d_send_after", "chfr_after", "arena_god_cmd_disabled", "arena_fight", "arena_cmd_left", "arena_step_count", "turn_progress", "turn_length", "fight_type", "invites_left", "dir", "gca", "gcak", "perm_link", "retirement", "fight_end", "ab", "daura", "pets", "a_cmd", "pets_max", "g_name", "trader_av", "shop_name", "t_level", "t_level_pr", "t_cmd", "shop_rename"];
  if (this.cache_enabled()) {
    var a = localStorage.getItem("fb_inv"), b = localStorage.getItem("fb_skills"), c = localStorage.getItem("fb_equip");
    try {
      a && (this.inventory = jQuery.parseJSON(a)), b && (this.skills = jQuery.parseJSON(b)), c && (this.equipment = jQuery.parseJSON(c));
      for (var d in this.pet_keys) {
        var e = this.pet_keys[d], f = localStorage.getItem("fb_p_" + e);
        f && f != "undefined" && (this.pet[e] = jQuery.parseJSON(f))
      }
      gv_log("loaded hero state cache")
    } catch (g) {
      gv_log("failed to load hero state cache")
    }
  }
  if (supports_local_storage()) {
    var h = localStorage.getItem("d_i"), i = localStorage.getItem("fb_gn");
    this.lbp = localStorage.getItem("lbp");
    try {
      this.godn = jQuery.parseJSON(i), this.diary_i = jQuery.parseJSON(h)
    } catch (g) {
      gv_log("failed to load diary_i cache")
    }
  }
  this.diary_i || (this.diary_i = {})
}
function jq_check() {
  if (typeof jQuery == "undefined") {
    var a = document.createTextNode(Loc.old_br_no_jq);
    document.getElementById("hero_block").appendChild(a), document.getElementById("hero_block").setAttribute("style", "width:500px;margin-left:auto;margin-right:auto;")
  }
}
var Loc = {
  hero_menu_item: "♲",
  hero_menu_item_title: "открыть устаревшую страницу героя",
  shero_menu_item: "герой",
  hname_capt: "Имя",
  hname_title: "Перейти к персональной странице геро{я|ини}",
  monster_name_link_title: "Перейти к описанию этого класса монстров в Энциклобогии",
  hname_a_capt: "{Герой|Героиня}",
  hname_a_capt_m: "Герой",
  hname_a_capt_f: "Героиня",
  gname_capt: "Имя бога",
  gname_a_capt: "Бог",
  hgen_capt: "Пол",
  age_capt: "Возраст",
  motto_capt: "Девиз",
  alignment_capt: "Характер",
  guild_capt: "Гильдия",
  guild_link_title: "Перейти к гильд-странице",
  hlevel_capt: "Уровень",
  inv_capt: "Инвентарь",
  health_capt: "Здоровье",
  quest_capt: "Задание",
  gold_capt: "Золота",
  m_killed_capt: "Убито монстров",
  death_count_capt: "Смертей",
  win_loss_capt: "Побед / Поражений",
  win_loss_title: "Открыть подробную статистику побед и поражений",
  fight_history: "История сражений",
  last_fight_link: "последняя хроника",
  fight_history_empty: "Cтатистика боев пуста.",
  ext_stats_link: "расширенная статистика",
  bricks_capt: "Кирпичей для храма",
  wood_capt: "Дерева для ковчега",
  retirement_capt: "Сбережения",
  aura_capt: "Аура",
  distance_capt: "Столбов от столицы",
  distance_back_capt: "Столбов до столицы",
  town_capt: "Город",
  network_error: "Ошибка отправки команды. Попробуйте повторить действие позднее.",
  command_send_error: "Ошибка отправки влияния. Перезагрузите страницу и попробуйте еще раз.",
  gender_male: "мужской",
  gender_female: "женский",
  quest_num: "№",
  thing_ending: " шт",
  milestone_ending: "шт",
  town_wiki_title: "Перейти к описанию города {town} в Энциклобогии",
  nearby_town: "Город неподалеку: {town}",
  nearby_town_unkown: "неизвестно",
  i_intro: "В карманах у геро{я|ини} можно найти:",
  i_intro_e: "В карманах у геро{я|ини} пусто.",
  i_intro_o: "В карманах противника можно найти:",
  i_intro_o_e: "В карманах противника пусто.",
  i_intro_monster: "С монстра можно будет снять:",
  item_activate_no_gp: "{desc} (активируется без затрат праны)",
  item_activate_no_duel: "Данный предмет нельзя активировать в дуэли",
  item_activate_no_dungeon: "Данный предмет нельзя активировать в подземелье",
  item_activate_no_travel: "Данный предмет можно активировать только во время дуэли",
  item_activate_desc: "{desc} (требуется {godpower}% праны)",
  item_activate_ne_gp: "{desc} (для активации нужно {godpower}% праны)",
  invites_email_name: "E-mail или игровое имя друга",
  invites_message: "Сообщение",
  invites_count: "Приглашений",
  invites_send_button: "Пригласить друга",
  invite_message: "Присоединяйся! Заведи себе персонального героя, который будет другом моему.",
  ideabox_intro: "Дорогая редакция, я хочу предложить вам:",
  ideabox_selector: "",
  ideabox_other: "другое",
  ideabox_bug_report: "исправить ошибку",
  ideabox_idea: "отличную идею",
  ideabox_payment: "решить проблему с оплатой",
  ideabox_monster: "монстра",
  ideabox_artifact: "трофей",
  ideabox_news_fields: "весть с полей",
  ideabox_diary: "фразу в дневник",
  ideabox_content: "удалить неудачные тексты",
  ideabox_quest: "задание (квест)",
  ideabox_equipment: "снаряжение",
  ideabox_duel: "хронику для дуэли",
  ideabox_dungeon: "хронику подземелья",
  ideabox_newspaper: "текст для газеты",
  ideabox_quest_text: "* Текст квеста",
  ideabox_quest_text_desc: "(по аналогии с текущим заданием геро{я|ини}):",
  ideabox_quest_end: "Фраза завершения квеста",
  ideabox_quest_end_desc: "(от лица геро{я|ини}, в дневник):",
  ideabox_quest_note: "Предложить концовку для существующего квеста можно <a href='/ideabox/quests' target='_blank'>здесь</a>.",
  ideabox_reference: "Пояснение <a href='/forums/show_topic/1237'>отсылки</a>",
  ideabox_reference_desc: "(если ваш текст что-то пародирует):",
  ideabox_bug_report_note: "Чем подробнее и детальнее вы опишете ошибку, тем быстрее мы сможем ее найти и исправить. <b>Не нужно</b> присылать ошибки в гласах чужих богов и во фразах из мода (подробнее — в <a href='/forums/show_topic/41'>FAQ</a>). И стоит убедиться, что эта ошибка не <a href='/forums/show_topic/7?page=last'>обсуждается</a> прямо сейчас.",
  ideabox_idea_note: "Для более успешной генерации идей почитайте <a href='http://wiki.godville.net/%D0%9F%D0%B0%D1%82%D0%B5%D0%BD%D1%82%D0%BD%D0%BE%D0%B5_%D0%B1%D1%8E%D1%80%D0%BE'>патентное бюро</a>. Еще можно обсудить идею на <a href='/forums/show/2'>форуме</a>. Идеи вроде «хочу графику» или «пускай женятся» можно не присылать.",
  ideabox_payment_note: "Если с оплатой произошли какие-либо проблемы, <b>в первую очередь необходимо обратиться в службы поддержки платежных систем</b> (<a href='http://www.roboxchange.com/Environment/Support/SendMsg.aspx?Culture=ru'>сюда</a> для Robokassa, <a href='http://help.xsolla.com'>сюда</a> для Xsolla) — обычно данные о платеже задерживаются там и до нас доходят не сразу. Если вы отправили SMS, то бывает полезно уточнить ее статус в техподдержке вашего сотового оператора. Если же все варианты исчерпаны, то напишите нам, указав максимум деталей (точное дату и время, номера транзакций, суммы и т.п.).",
  ideabox_monster_text: "* Название монстра",
  ideabox_monster_text_desc: "(мужского рода, в именительном падеже и с прописной буквы):",
  ideabox_monster_artifact_text: "Выпадающий трофей",
  ideabox_monster_artifact_text_desc: "(в винительном падеже со строчной буквы, необязательно):",
  ideabox_monster_note: "Пожалуйста, ознакомьтесь с <a href='/forums/show_topic/4'>рекомендациями</a> по придумыванию монстров. И учтите, что отбор проходит меньше 2% предложенного.",
  ideabox_artifact_text: "Название",
  ideabox_artifact_text_desc: "(в винительном падеже со строчной буквы):",
  ideabox_artifact_note: "Пожалуйста, ознакомьтесь с <a  href='/forums/show_topic/4'>рекомендациями</a> по придумыванию трофеев.",
  ideabox_news_fields_text: "Текст вести",
  ideabox_news_fields_text_desc: "(в третьем лице, обычно заканчивается многоточием):",
  ideabox_content_text: "Текст из игры",
  ideabox_content_text_desc: "(фраза, монстр, трофей, умение...), который выглядит сомнительно и его хочется <b>удалить совсем</b>:",
  ideabox_content_reference: "Пояснение для голосующих",
  ideabox_content_reference_desc: "(почему данный текст плох):",
  ideabox_content_note: "<b>Явные ошибки (дубли, опечатки) нужно отправлять в раздел «исправить ошибку»</b>. Для трофея нужно указывать, из какого монстра он выпал. Очень желательно предварительно погуглить сомнительное и взглянуть <a href='/forums/show_topic/1032'>сюда</a> и на последние сообщения <a href='/forums/show_topic/894'>обсуждения</a>.",
  ideabox_diary_note: "Советуем почитать <a href='forums/show_topic/1469'>руководство по фразам</a> и <a href='forums/show_topic/2412'>памятку креативщику</a>. Помимо ящика фразы можно отправлять <a href='/forums/show_topic/3013'>напрямую в игру</a>.",
  ideabox_equipment_type: "Тип снаряжения",
  ideabox_eq_weapon: "Оружие",
  ideabox_eq_shield: "Щит",
  ideabox_eq_head: "Голова",
  ideabox_eq_talisman: "Талисман",
  ideabox_eq_legs: "Ноги",
  ideabox_eq_arms: "Руки",
  ideabox_eq_body: "Тело",
  ideabox_equipment_text: "Название:",
  ideabox_error_max_length: "Жаль, но ваша идея длиннее {len} символов",
  ideabox_error_min_length: "Жаль, но ваша идея короче {len}-х символов",
  ideabox_submit_success: "Нижний ящик пополнен!",
  ideabox_note: "",
  ideabox_approved_link: "Одобренные идеи",
  ideabox_send_button: "Отправить в ящик",
  pantheons_title: "Пантеоны",
  pantheons_search: "Ищем геро{я|иню} в пантеонах...",
  p_refresh_title: "Нажмите, чтобы обновить данные в этом блоке",
  pantheons_place_title: "Посмотреть на геро{я|иню} в пантеоне",
  pantheons_place_change: "Как изменилась позиция в пантеоне с последнего открытия страницы",
  pantheons_bl7: "Пантеоны будут доступны после 7-го уровня.",
  pantheons_no_places: "В ожидании очередного обновления пантеонов...",
  eq_weapon: "Оружие",
  eq_shield: "Щит",
  eq_head: "Голова",
  eq_body: "Тело",
  eq_arms: "Руки",
  eq_legs: "Ноги",
  eq_talisman: "Талисман",
  skill_fight: "боевое",
  skill_trade: "торговое",
  skill_travel: "трансп.",
  skill_level_end: "ур.",
  no_skills: "Умения будут доступны после 15-го уровня.",
  p_name_capt: "Имя",
  p_type_capt: "Вид",
  pet_type_title: "Открыть описание этой породы в Энциклобогии",
  p_level_capt: "Уровень",
  p_age_capt: "Возраст",
  p_status_capt: "Статус",
  p_special: "Особенность",
  locale: "ru",
  monster_title: "Противник",
  gpTitle: "Прана",
  input_voice_hint: "Введите глас божий",
  last_voices_title: "Открыть историю последних гласов",
  send_voice_button: "Изречь",
  last_voices: "Последние гласы",
  last_voices_empty: "Сюда попадают отправленные вами гласы. На данный момент список пуст.",
  last_voices_select: "Выбрать этот глас",
  last_voices_delete: "Удалить этот глас из списка",
  voice_too_long: "Слишком длинный глас. Попробуйте уложиться в 100 символов.",
  encourage_link: "Сделать хорошо",
  encourage_title: "Одарить геро{я|иню} благодатью и сделать е{му|й} что-то хорошее",
  punish_link: "Сделать плохо",
  punish_title: "Прогневаться и сделать геро{ю|ине} или {его|её} противнику что-то плохое",
  miracle_link: "Сделать чудо",
  miracle_title: "Сделать что-то эффектное и весьма полезное",
  to_arena_link: "Отправить на арену",
  to_chf_link: "Послать на тренировку",
  to_dungeon_link: "Направить в подземелье",
  chf_popover_title: "Выбор противника",
  chf_no_friends: "У вас пока нет ни одного друга",
  chf_fr_confirm: "Приглашение на спарринг стоит 50% праны, и результаты такого боя не окажут влияния на рейтинги. Пригласить бога {godname} на тренировочный поединок?",
  chf_pending_title: "Тренировочная дуэль",
  chf_pending_text: "{godname} приглашает вас на тренировочную дуэль. Принять приглашение?",
  chf_button_accept: "Принять",
  chf_button_reject: "Отказаться",
  arena_unavailable_link: "Дуэли временно недоступны",
  arena_avaialble_in: "Арена откроется через",
  dungeon_avaialble_in: "Подземелье откроется через",
  chf_avaialble_in: "Тренировка возможна через",
  arena_avaialble_time: " {hours} ч {minutes} мин",
  arena_avaialble_time_m: " {minutes} мин",
  send_to_arena_confirm: "Отправить геро{я|иню} на арену для дуэли с другим игроком?",
  resurrect_link: "Воскресить",
  resurrect_title: "Воскресить геро{я|иню} в городе (не требует праны)",
  arena_actions: "Доступно влияний: {actions}",
  send_to_arena_title: "Мгновенно излечить геро{я|иню} и телепортировать {его|её} в столицу для дуэли",
  send_to_dungeon_title: "Отправить геро{я|иню} на поиски сокровищ в подземелье",
  send_to_chf_title: "Пригласить друга на тренировочный поединок",
  send_to_arena_disabled_title: "Арена, стычки, боссы и подземелья на профилактике",
  remote_disabled_arena: "Первые два хода пульты обоих богов заморожены...",
  remote_disabled_fight_over: "Для вашего героя бой окончен",
  charges_title: "Заряды:",
  acc_charge: "Аккумулировать",
  acc_discharge: "Восстановить",
  acc_discharge_confirm: "У вас уже есть {godpower}% праны. Вы точно хотите восстановить еще один заряд?",
  acc_title: "Каждым зарядом прано-аккумулятора можно в любой момент восстановить 50% праны",
  charge_desc: "Упаковать 100% праны в один заряд прано-аккумулятора (но не более 3-х зарядов)",
  discharge_desc: "Восстановить 50% праны из одного заряда прано-аккумулятора",
  charge_help_link: "Зарядить",
  charge_help_title: "Подробнее о прано-аккумуляторе, зарядах и способах их получения",
  refresh_title: "Попытаться обновить все данные на странице",
  sort_title: "Изменить порядок записей в дневнике",
  store_pet_link: "Посадить в ковчег",
  store_pet_title: "Посадить питомца в ковчег (требуется 50% праны)",
  store_pet_confirm: "Посадить этого питомца в ковчег при следующем посещении храма?",
  store_pet_pending: "Ждем применения команды при следующем посещении ковчега...",
  store_pet_full_title: "Не хватает места в ковчеге",
  restore_pet_link: "В ковчеге",
  restore_pet_title: "Просмотреть питомцев в ковчеге",
  restore_pet_link_title: "Забрать питомца из ковчега",
  restore_pet_link_no_gp: "Требуется 50% праны",
  restore_pet_link_confirm: "Забрать питомца {name} из ковчега? (требуется 50% праны)",
  set_pet_name_title: "Переименовать питомца",
  pet_name_save_title: "Применить",
  pet_name_cancel_title: "Отменить изменения",
  pet_rename_confirm: "Навсегда дать питомцу имя {name}?",
  set_pet_name_desc: "Внимание! Переименовать каждого питомца можно только один раз. Если новое имя будет нарушать Правила хорошего тона, то вернется старое, а возможность переименования будет потеряна.",
  ark_no_pet: "Геро{й|иня} сейчас без питомца.",
  no_stored_pets: "Ковчег пуст.",
  pets_empty: "пустое стойло",
  t_award_title: "Храмовладелец с {time}!",
  p_award_title: "Зверовод с {time}!",
  a_award_title: "Корабел c {time}!",
  wiki_prefix: "http://wiki.godville.net",
  wiki_aura_prefix: "аура  {name}",
  wiki_aura_title: "Перейти к описанию ауры {name} в Энциклобогии",
  wiki_ab_page: "Босс-монстры#.D0.A1.D0.BF.D0.BE.D1.81.D0.BE.D0.B1.D0.BD.D0.BE.D1.81.D1.82.D0.B8",
  wiki_general_title: "Перейти к описанию в Энциклобогии",
  our_domain: "godville.net",
  shout_up_t: "Этот глас очень интересен и остроумен, а его автор заслуживает награды",
  shout_down_t: "Этот глас не представляет из себя ничего интересного и остроумного",
  shout_ppage: "Перейти к персональной странице автора гласа {author}",
  shout_report: "Сообщить о нарушении",
  shout_report_confirm: "Вы уверены, что этот глас нарушает правила хорошего тона?",
  mod_up_t: "Хорошая фраза, оставляем",
  mod_down_t: "Плохая фраза, удаляем",
  move_hint: "Переместить блок",
  info_b_capt: "{Герой|Героиня}",
  stats_b_capt: "{Герой|Героиня}",
  m_info_b_capt: "{Мой герой|Моя героиня}",
  o_info_b_capt: "Противник",
  alls_b_capt: "Союзники",
  opps_b_capt: "Противники",
  opp_defeated: "повержен",
  inventory_b_capt: "Инвентарь",
  m_inventory_b_capt: "Инвентарь",
  o_inventory_b_capt: "Инвентарь",
  invites_b_capt: "Приглашения",
  pet_b_capt: "Питомец",
  trader_b_capt: "Лавка",
  diary_b_capt: "Дневник {героя|героини}",
  news_b_capt: "Вести с заснеженных полей",
  news_b_capt_short: "Вести с полей",
  news_trader_b_capt: "Вести с прилавка",
  pantheons_b_capt: "Места в пантеонах",
  pantheons_b_capt_short: "Пантеоны",
  gl3d_b_capt: "3D",
  equipment_b_capt: "Снаряжение",
  m_equipment_b_capt: "Снаряжение",
  o_equipment_b_capt: "Снаряжение",
  skills_b_capt: "Умения",
  ability_s_b_capt: "Способность",
  ability_b_capt: "Способности",
  control_b_capt: "Пульт вмешательства в личную жизнь",
  control_b_capt_short: "Пульт",
  ideabox_b_capt: "Нижний ящик",
  map_b_capt: "Карта",
  duel_arena_capt: "Вести с арены",
  duel_arena_travel: "Вести с полей",
  duel_monster_capt: "Хроника боя",
  duel_challenge_capt: "Тренировочный бой",
  duel_dungeon_capt: "Хроника подземелья",
  dual_arena_step: " (шаг {step})",
  window_title: "{godname} и {god_gender} {hero_gender} {hero_name}",
  window_title_gm: "его",
  window_title_gf: "её",
  window_title_hf: "героиня",
  window_title_hm: "герой",
  TurboDisabled: "Турбо-режим отключен. Страница обновляется в обычном режиме. Подробнее о настройке турбо читайте в FAQ",
  TurboWSEnabling: "",
  TurboOnConnected: "Страница обновляется в турбо-режиме (Comet). Подробнее о настройке турбо читайте в FAQ",
  TurboOnConnectedWS: "Страница обновляется в супер-турбо режиме (Websockets). Подробнее о настройке турбо читайте в FAQ",
  TurboOnStatus: "Пытаемся подключиться к серверу в турбо-режиме...",
  TurboReconnect: "Переподключение через ",
  TurboReconnectSec: " сек.",
  TurboConnectionError: "Ошибка подключения к серверу в турбо-режиме",
  TurboConnectionErrorWS: "Ошибка подключения к серверу через WebSockets.",
  TurboConnectionCode: "код: ",
  TurboConnectionCodeDesc: 'Пожалуйста, ознакомьтесь с <a href="http://godville.net/forums/show_topic/593">подсказками</a> по настройке турбо. А еще можно открыть <a href="http://websocketstest.com">тестовую страницу</a> и сообщить в нижний ящик ваш Result ID.',
  TurboConnectionErrorTooltip: "Ошибка подключения к серверу в турбо-режиме (страница обновляется в обычном режиме). ",
  TurboConnectionTempErrorStatus: "Ошибка включения турбо-режима (страница обновляется в обычном режиме). Подробнее о настройке турбо читайте в FAQ",
  hints_faq_link: "Подробнее обо всех аспектах жизни {героя|героини} можно прочитать в <a target='_blank' href='/help/faq'>FAQ</a>.",
  hints_more_link: "Подробности — <a href='{url}'>здесь</a>.",
  hint_close: "закрыть",
  hint_prev: "< предыдущая",
  hint_next: "следующая >",
  blog_notif_capt: "Не может быть!",
  blog_notif_message: "В <a target='_blank' href='/blog/post/{id}'>блоге</a> появилось новое сообщение от демиургов!",
  h_voice1: "Молись мне, смертный!",
  h_voice2: "Бей врага с размахом, {мой герой|моя героиня}!",
  h_voice3: "Не забудь залечить раны перед подвигами.",
  h_voice4: "Проверь, нет ли клада под ногами?",
  a_voice1: "Приветствую, мой славный соперник!",
  a_voice2: "В атаку!",
  a_voice3: "Подлечись!",
  a_voice4: "Защищайся!",
  a_voice5: "Молись мне!",
  d_voice1: "Идите на север",
  d_voice2: "Идите на юг",
  d_voice3: "Идите на восток",
  d_voice4: "Идите на запад",
  fr_button: "Друзья",
  fr_no_friends: "Кажется, у {вашего героя|вашей героини} еще нет знакомых.",
  fr_loading: "Загружаем список знакомых...",
  fr_invite_friend: "Пригласить друга",
  fr_invites_message: "Текст приглашения",
  friend_filter_placeholder: "Быстрый поиск",
  fr_delete_friend_title: "Удалить знакомого из списка друзей и перестать получать от него сообщения",
  fr_friend_delete_confirm: "Друзья могут пригодиться {герою|героине} в странствиях. Вы точно хотите удалить этого игрока из списка знакомых?",
  fr_chat_no_messages: "Переписка с данным другом отсутствует.",
  fr_chat_close_title: "Закрыть окно переписки",
  fr_msg_delete_title: "Удалить сообщение",
  fr_msg_delete_all_title: "Удалить переписку с этим другом",
  fr_msg_delete_all_confirm: "Удалить всю переписку с этим другом?",
  fr_chat_to_ppage: "Открыть личную страницу в новом окне",
  fr_new_messages_helper_title: "Есть новые сообщения",
  fr_more_messages: "Следующие 25 сообщений...",
  fr_loading_messages: "Идет загрузка сообщений...",
  fr_msg_too_long: "Сообщение слишком длинное.",
  fb_fr_invite_header: "Пригласить друга",
  fb_fr_invites_desc: "У вас {count} приглашений. С помощью каждого из них можно пригласить одного друга.",
  fr_fr_invite_confirm: "Пригласить {name} в качестве друга?",
  fb_fr_invite_fb_header: "Пригласить из Facebook",
  fb_fr_invite_success: "Друг был добавлен в ваш список",
  fb_fr_invite_send: "Приглашение отправлено",
  fb_fr_invite_af: "Этот бог уже есть в списке ваших друзей",
  fb_fr_invite_ni: "Извините, но у вас больше нет приглашений",
  fb_fr_invite_error: "Ошибка отправки приглашения. Пожалуйста, повторите запрос позднее",
  fb_health_title: "",
  fb_inv_title: "",
  fb_gold_title: "",
  fb_friends_title: "",
  fb_panth_title: "",
  fb_icon_inv_title: "Инвентарь геро{я|ини}",
  fb_icon_equip_title: "Снаряжение геро{я|ини}",
  fb_icon_skills_title: "Умения геро{я|ини}",
  fb_icon_pet_title: "Питомец геро{я|ини}",
  fb_opp_wl: "число побед/поражений противника",
  fb_opp_h: "текущее и максимальное число очков здоровья противника",
  fb_opp_i: "текущая и максимальная вместительность инвентаря противника",
  fb_opp_g: "число монет у противника",
  fb_opp_more: "Дополнительная информация о противнике",
  fr_god_m: "бог",
  fr_god_f: "богиня",
  fr_god_m_link: "его",
  fr_god_f_link: "её",
  fr_hero_m: "герой",
  fr_hero_f: "героиня",
  fr_chat_title: "{god_name} и {god_link} {hero_name}",
  fr_link_badge_title: "Число новых сообщений от друзей",
  fr_gch_link: "Гильдсовет",
  fr_gch_link_badge_title: "Число новых сообщений в гильдсовете",
  fr_gch_w_title: "Совет гильдии «{guild}»",
  fr_gch_close_title: "Закрыть окно",
  fr_gch_no_messages: "Сообщения отсутствуют.",
  fr_chat_ban_link: "Изгнать бога из гильдсовета",
  fr_chat_ban_confirm: "Вы уверены, что {god} должен быть изгнан из гильдсовета?",
  fr_chat_banned_link: "Показать список изгнанных богов",
  fr_chat_banned: "Изгнанные боги",
  fr_chat_banned_empty: "Доступ к гильдсовету разрешен всем участникам гильдии.",
  fr_chat_name: "Подставить имя",
  fr_chat_banned_god: "Бог",
  fr_chat_banned_hero: "Герой",
  fr_chat_banned_rank: "Звание",
  fr_chat_banned_action: "Действие",
  fr_chat_unban: "вернуть обратно",
  fr_chat_unban_confirm: "Снять запрет доступа для {god}?",
  fr_chat_wr_unavail: "Звание вашего героя слишком мало для участия в гильдсовете.",
  themes_capt: "Цветовая схема:",
  th_classic: "основная",
  th_retro: "ретро",
  th_blue: "небесная",
  th_white: "белая",
  th_pink: "гламурная",
  th_yellow: "солнечная",
  th_emerald: "изумрудная",
  th_violet: "сиреневая",
  th_nightly: "ночная",
  am_pm_capt: "Формат времени",
  am_pm_12h: "AM/PM",
  am_pm_24h: "24 часа",
  ps_capt: "Настройки страницы",
  ps_appearance_capt: "Внешний вид",
  ps_options_capt: "Параметры",
  ps_turbo_msg: "Турбо-режим",
  ps_theme_capt: "Цветовое оформление",
  ps_make_default: "Открывать эту страницу героя по умолчанию",
  ps_reset_settings: "Вернуть cтандартные настройки страницы",
  ps_reset_settings_note: "(может помочь в случае ошибок или проблем)",
  ps_reset_settings_q: "Вы действительно хотите вернуть стандартные настройки для этой страницы?",
  ps_disable_sharing: "Отключить панель цитирования в социальные сети",
  ps_discuss: "<a href='/forums/show_topic/2067' target='_blank'>Обсудить</a> страницу героя на форуме",
  ps_gp_confirm_thre: "Подтверждать распаковку заряда, если праны больше:",
  ps_ns_themes: "не поддерживается в данном браузере",
  restore_columns_capt: "Число колонок:",
  restore_columns3: "3 колонки",
  restore_columns5: "5 колонок",
  ps_footer: "(актуальны только для вашего текущего браузера)",
  ps_turbo_note: "(при проблемах с ним посмотрите <a href='/forums/show_topic/593' target='_blank'>эту тему</a>)",
  ps_notif_capt: "Уведомления",
  ps_notif_unavailable: "Уведомления работают только в браузерах Google Chrome, Safari 6 и Firefox 22.",
  ps_notif_death: "Смерть героя",
  ps_notif_death_d: "Показывать уведомление, когда герой погибает.",
  ps_notif_mquest: "Взятие мини-квеста",
  ps_notif_mquest_d: "Показывать уведомление, когда герой получает мини-квест.",
  ps_notif_quest: "Завершение задания",
  ps_notif_quest_d: "Показывать уведомление, когда герой завершает задание.",
  ps_notif_levelup: "Новый уровень",
  ps_notif_levelup_d: "Показывать уведомление, когда герой получает новый уровень.",
  ps_notif_duel: "Начало дуэли",
  ps_notif_duel_d: "Показывать уведомление, когда герой вступает в дуэль с опасным противником.",
  ps_notif_sa: "Активируемый трофей",
  ps_notif_sa_d: "Показывать уведомление, когда герой находит активируемый предмет.",
  ps_notif_return_town: "Возвращение в город",
  ps_notif_return_town_d: "Показывать уведомление, когда герой возвращается в город."
  ,
  ps_notif_invite: "Инвайт на Годвилль",
  ps_notif_invite_d: "Показывать уведомление, когда герой находит инвайт и может пригласить друга.",
  ps_notif_fr_msg: "Сообщения от друзей",
  ps_notif_fr_msg_d: "Показывать уведомления о получении нового сообщения от друга, когда вкладка браузера неактивна.",
  ps_notif_test: "Показать тестовое уведомление",
  ps_notif_test_d: "Если уведомление не показывается в Google Chrome, проверьте исключения в настройках браузера ('Настройки' -> 'Расширенные' -> 'Настройки содержания' -> 'Оповещения, Управление исключениями'). Для Firefox проверьте настройки или попробуйте перезапустить браузер.",
  dn_test: "Это тестовое уведомление.",
  dn_duel: "Геро{й|иня} вступил{|а} в дуэль!",
  dn_dungeon: "Геро{й|иня} вош{ел|ла} в подземелье!",
  dn_boss: "Геро{й|иня} встретил{ся|ась} с боссом!",
  dn_death: "Геро{й|иня} скончал{ся|ась} от ранений.",
  dn_mquest: "Геро{й|иня} отправил{ся|ась} в мини-квест!",
  dn_quest: "Геро{й|иня} успешно завершил{|а} задание.",
  dn_return_town: "Геро{й|иня} приш{ел|ла} в город {town_name}.",
  dn_levelup: "Геро{й|иня} получил{|а} новый уровень.",
  dn_sa: "Геро{й|иня} наш{ел|ла} {item_name}.",
  dn_invite: "Геро{й|иня} наш{ел|ла} инвайт на Годвилль.",
  dn_fr_msg: "Новое сообщение от друга.",
  dn_invite_name: "инвайт на Годвилль",
  old_br_intro: "К сожалению, основная страница героя отказывается работать в вашем браузере. Рекомендуем пользоваться последними версиями одного из этих браузеров:",
  old_br_footer: "Если подходящего браузера у вас нет, вы можете воспользоваться <a href='/hero'> устаревшей страницей героя</a>.",
  old_br_footer_fb: "Если подходящего браузера у вас нет, вы можете открыть <a href='/hero' target='blank'>эту</a> устаревшую страницу героя.",
  old_br_footer_reset: "Если же раньше в этом браузере страница работала, попробуйте отключить его расширения (плагины) или ",
  old_br_footer_reset_link: "сбросить настройки страницы.",
  old_br_no_jq: "Ошибка загрузки jQuery. Пожалуйста, убедитесь, что в браузере разрешена загрузка скриптов с домена http://ajax.aspnetcdn.com (она может блокироваться расширениями и аддонами типа NoScript и AdBlock, антивирусами или прокси).",
  webgl_ns: "Для работы 3D необходим браузер с поддержкой WebGL.",
  webgl_nk_link: "Обновить браузер",
  webgl_ns_other: "Похоже, что WebGL не поддерживается на вашем компьютере.",
  webgl_ns_other_link: "Дополнительная информация.",
  fbs_share_title: "Отправить в Facebook",
  twt_share_title: "Отправить в Twitter",
  vk_share_title: "Отправить во Вконтакте",
  vk_share_warn: "Совет: чтобы ВКонтакт не обрезал сообщение в ленте, скопируйте текст фразы в поле комментария.",
  fbs_capt: "Город богов и героев",
  twit_tag: "годвилль",
  set_motto_placeholder: "Введите девиз",
  set_motto_title: "Изменить девиз геро{я|ини}",
  set_motto_save_title: "Сохранить девиз",
  set_motto_cancel_title: "Отменить изменения",
  set_motto_error_len: "Сожалеем, но девиз не может быть длиннее 25 символов. Кр. — с. т.",
  set_motto_error: "Ошибка установки девиза. Проверьте его на странности и попробуйте еще раз.",
  imp_e_title: "Показать важнейшие события из жизни {героя|героини}",
  imp_e_capt: "Третий глаз",
  d_today: "Сегодня",
  d_yesterday: "Вчера",
  d_2days_ago: "Позавчера",
  d_3_4days_ago: "{days} дня назад",
  d_xdays_ago: "{days} дней назад",
  d_ago_s: "{x}с",
  d_ago_m: "{x}м",
  d_ago_h: "{x}ч",
  d_ago_d: "{x}д",
  new_ach_title: "Новая заслуга",
  new_ach_title_t: 'Новая заслуга — "{title}"',
  ach_title1: "1-й степени",
  ach_title2: "2-й степени",
  ach_title3: "3-й степени",
  ach_title: "{title} {rank}",
  ach_fb_sh: "",
  ach_fb_share: "рассказать друзьям",
  miniq: "(мини)",
  h_search_default: "Ищем героя на кладбищах погибших серверов...",
  pr_level: "уровень — {prct}",
  pr_quest: "задание — {prct}",
  pr_news: "прогресс — {prct}",
  pr_inv: "инвентарь — {prct}",
  pr_hp: "здоровье — {prct}",
  pr_gp: "прана — {prct}",
  pr_duel: "прогресс хода — {prct}",
  map_legend: "легенда",
  map_legend_pos: "@ - герои",
  map_legend_exit: "В - выход",
  map_legend_wall: "# - стена",
  map_legend_unknown: "? - неизвестно",
  map_legend_exclam: "! - нечто",
  map_legend_s_room: "✖ - тайная комната",
  duel_switch_confirm: "Для продолжения странице нужно перезагрузиться. Вы готовы?",
  uph_author: "Автор фразы - {author}",
  shop_name: "Название",
  show_orders_link: "Проверить заказы",
  show_orders_link_title: "Показать имеющиеся на завтра заказы на трофеи",
  orders_header: "На завтра есть заказы на:",
  order_activate_title: "отправить заявку в газету",
  order_activate_no_gp_title: "отправить заявку в газету (требуется 50% праны)",
  order_pending: "Заказ на {order} отправлен. При удаче он появится в завтрашней газете.",
  shop_name_tmpl: "«{name}»",
  tlevel_capt: "Уровень торговца",
  send_shop: "Отправить в лавку",
  send_shop_title: "Посадить героя в лавку при следующем посещении храма",
  restore_shop: "Покинуть лавку",
  restore_shop_title: "Покинуть лавку",
  send_shop_link_confirm: "Отправить героя в лавку при следующем посещении храма?",
  restore_shop_link_confirm: "Вытащить героя из лавки?",
  set_shop_name_title: "Переименовать лавку",
  set_shop_name_desc: "Внимание! Переименовать лавку можно только один раз. Если новое имя будет нарушать Правила хорошего тона, то вернется старое, а возможность переименования будет потеряна.",
  shop_rename_confirm: "Навсегда дать лавке имя {name}?",
  last_record: ""
}, load_failed_timer, alreadyrunflag = 0;
if (document.addEventListener)document.addEventListener("DOMContentLoaded", function () {
  alreadyrunflag = 1, jq_check()
}, !1); else if (document.all && !window.opera) {
  document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"></script>');
  var contentloadtag = document.getElementById("contentloadtag");
  contentloadtag.onreadystatechange = function () {
    this.readyState == "complete" && (alreadyrunflag = 1, jq_check())
  }
}
window.onload = function () {
  setTimeout("if (!alreadyrunflag) jq_check()", 0)
}, $(document).ready(function () {
  jQuery("#noJS").remove(), $("#menu_bar").hide(), load_failed_timer = window.setTimeout(function () {
    var a = $("#hero_block"), b = $('<table  style="text-align:center;width:760px;" align=center></table>'), c = [{
      n: "Google Chrome",
      i: "/images/br_chrome.png",
      d: "http://www.google.com/chrome"
    }, {n: "Apple Safari", i: "/images/br_safari.png", d: "http://www.apple.com/safari"}, {
      n: "Mozilla Firefox",
      i: "/images/br_ff.png",
      d: "http://www.mozilla.com/firefox"
    }, {n: "Opera", i: "/images/br_o.png", d: "http://www.opera.com/browser/download"}];
    b.append($("<tr></tr>").append($('<td colspan=4 id="ob_intro"></td>').html(Loc.old_br_intro)));
    var d = $("<tr></tr>").appendTo(b);
    for (var e in c) {
      var f = c[e], g = $('<a href="' + f.d + '"></a>').append($('<img src="' + f.i + '"></img>'));
      d.append($("<td></td>").append(g))
    }
    d = $("<tr></tr>").appendTo(b);
    for (var e in c) {
      var f = c[e], g = $('<a href="' + f.d + '">' + f.n + "</a>");
      d.append($("<td></td>").append(g))
    }
    var h;
    window.fb_frame ? h = Loc.old_br_footer_fb : h = Loc.old_br_footer, b.append($("<tr></tr>").append($('<td colspan=4 id="ob_footer"></td>').html(h)));
    var i = $("<a href='#'></a>").html(Loc.old_br_footer_reset_link);
    a.append($('<div style="text-align:center;width:760px;margin-left:auto;margin-right:auto;"></div>').text(Loc.old_br_footer_reset).append(i)), i.click(function (a) {
      var b = confirm(Loc.ps_reset_settings_q);
      if (!b)return !1;
      for (var c in localStorage)localStorage.removeItem(c);
      setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3), a.preventDefault();
      return !1
    }), a.prepend(b)
  }, 7e3)
}), function (a) {
  function k() {
    if (!i()) {
      a("#facebox_overlay").fadeOut(200, function () {
        a("#facebox_overlay").removeClass("facebox_overlayBG"), a("#facebox_overlay").addClass("facebox_hide"), a("#facebox_overlay").remove()
      });
      return !1
    }
  }

  function j() {
    if (!i()) {
      a("#facebox_overlay").length == 0 && a("body").append('<div id="facebox_overlay" class="facebox_hide"></div>'), a("#facebox_overlay").hide().addClass("facebox_overlayBG").css("opacity", a.facebox.settings.opacity).click(function () {
        a(document).trigger("close.facebox")
      }).fadeIn(200);
      return !1
    }
  }

  function i() {
    return a.facebox.settings.overlay == !1 || a.facebox.settings.opacity === null
  }

  function h(b, c) {
    a.get(b, function (b) {
      a.facebox.reveal(b, c)
    })
  }

  function g(b, c) {
    var d = new Image;
    d.onload = function () {
      a.facebox.reveal('<div class="image"><img src="' + d.src + '" /></div>', c)
    }, d.src = b
  }

  function f(b, c) {
    if (b.match(/#/)) {
      var d = window.location.href.split("#")[0], e = b.replace(d, "");
      if (e == "#")return;
      a.facebox.reveal(a(e).html(), c)
    } else b.match(a.facebox.settings.imageTypesRegexp) ? g(b, c) : h(b, c)
  }

  function e() {
    var b = a.facebox.settings;
    b.loadingImage = b.loading_image || b.loadingImage, b.closeImage = b.close_image || b.closeImage, b.imageTypes = b.image_types || b.imageTypes, b.faceboxHtml = b.facebox_html || b.faceboxHtml
  }

  function d() {
    var a;
    self.innerHeight ? a = self.innerHeight : document.documentElement && document.documentElement.clientHeight ? a = document.documentElement.clientHeight : document.body && (a = document.body.clientHeight);
    return a
  }

  function c() {
    var a, b;
    self.pageYOffset ? (b = self.pageYOffset, a = self.pageXOffset) : document.documentElement && document.documentElement.scrollTop ? (b = document.documentElement.scrollTop, a = document.documentElement.scrollLeft) : document.body && (b = document.body.scrollTop, a = document.body.scrollLeft);
    return [a, b]
  }

  function b(b) {
    if (a.facebox.settings.inited)return !0;
    a.facebox.settings.inited = !0, a(document).trigger("init.facebox"), e();
    var c = a.facebox.settings.imageTypes.join("|");
    a.facebox.settings.imageTypesRegexp = new RegExp(".(" + c + ")$", "i"), b && a.extend(a.facebox.settings, b), a("body").append(a.facebox.settings.faceboxHtml);
    var d = [new Image, new Image];
    d[0].src = a.facebox.settings.closeImage, d[1].src = a.facebox.settings.loadingImage, a("#facebox").find(".b:first, .bl").each(function () {
      d.push(new Image), d.slice(-1).src = a(this).css("background-image").replace(/url\((.+)\)/, "$1")
    }), a("#facebox .close").click(a.facebox.close), a("#facebox .close_image").attr("src", a.facebox.settings.closeImage)
  }

  a.facebox = function (b, c) {
    a.facebox.loading(), b.ajax ? h(b.ajax, c) : b.image ? g(b.image, c) : b.div ? f(b.div, c) : a.isFunction(b) ? b.call(a) : a.facebox.reveal(b, c)
  }, a.extend(a.facebox, {
    settings: {
      opacity: .2,
      overlay: !0,
      loadingImage: "/facebox/loading.gif",
      closeImage: "/facebox/closelabel.png",
      imageTypes: ["png", "jpg", "jpeg", "gif"],
      faceboxHtml: '\n    <div id="facebox" style="display:none;"> \n      <div class="popup"> \n        <div class="content"> \n        </div> \n        <a href="#" class="close">x</a> \n      </div> \n    </div>'
    }, loading: function () {
      b();
      if (a("#facebox .loading").length == 1)return !0;
      j(), a("#facebox .content").empty(), a("#facebox .body").children().hide().end().append('<div class="loading"><img src="' + a.facebox.settings.loadingImage + '"/></div>'), a("#facebox").css({
        top: c()[1] + d() / 10,
        left: a(window).width() / 2 - 205
      }).show(), a(document).bind("keydown.facebox", function (b) {
        b.keyCode == 27 && a.facebox.close();
        return !0
      }), a(document).trigger("loading.facebox")
    }, reveal: function (b, c) {
      a(document).trigger("beforeReveal.facebox"), c && a("#facebox .content").addClass(c), a("#facebox .content").append(b), a("#facebox .loading").remove(), a("#facebox .body").children().fadeIn("normal"), a("#facebox").css("left", a(window).width() / 2 - a("#facebox .popup").width() / 2), a(document).trigger("reveal.facebox").trigger("afterReveal.facebox")
    }, close: function () {
      a(document).trigger("close.facebox");
      return !1
    }
  }), a.fn.facebox = function (c) {
    function d() {
      a.facebox.loading(!0);
      var b = this.rel.match(/facebox\[?\.(\w+)\]?/);
      b && (b = b[1]), f(this.href, b);
      return !1
    }

    if (a(this).length != 0) {
      b(c);
      return this.bind("click.facebox", d)
    }
  }, a(document).bind("close.facebox", function () {
    a(document).unbind("keydown.facebox"), a("#facebox").fadeOut(function () {
      a("#facebox .content").removeClass().addClass("content"), a("#facebox .loading").remove(), a(document).trigger("afterClose.facebox")
    }), k()
  })
}(jQuery), jQuery.cookie = function (a, b, c) {
  if (arguments.length > 1 && String(b) !== "[object Object]") {
    c = jQuery.extend({}, c);
    if (b === null || b === undefined)c.expires = -1;
    if (typeof c.expires == "number") {
      var d = c.expires, e = c.expires = new Date;
      e.setDate(e.getDate() + d)
    }
    b = String(b);
    return document.cookie = [encodeURIComponent(a), "=", c.raw ? b : encodeURIComponent(b), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join("")
  }
  c = b || {};
  var f, g = c.raw ? function (a) {
    return a
  } : decodeURIComponent;
  return (f = (new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)")).exec(document.cookie)) ? g(f[1]) : null
}, function (a) {
  function i(a) {
    return e(a, "", -1)
  }

  function h(a) {
    return localStorage.removeItem(a)
  }

  function g(a) {
    var b, c, d, e;
    b = a + "=", c = document.cookie.split(";");
    for (d = 0; d < c.length; d++) {
      e = c[d];
      while (e.charAt(0) === " ")e = e.substring(1, e.length);
      if (e.indexOf(b) === 0)return e.substring(b.length, e.length)
    }
    return null
  }

  function f(a) {
    return localStorage[a]
  }

  function e(a, b) {
    var c, d, e;
    c = new Date, c.setTime(c.getTime() + 31536e6), d = "; expires=" + c.toGMTString();
    if (typeof a == "string" && typeof b == "string") {
      document.cookie = a + "=" + b + d + "; path=/";
      return !0
    }
    if (typeof a == "object" && typeof b == "undefined") {
      for (e in a)a.hasOwnProperty(e) && (document.cookie = e + "=" + a[e] + d + "; path=/");
      return !0
    }
    return !1
  }

  function d(a, b) {
    var c;
    if (typeof a == "string" && typeof b == "string") {
      localStorage[a] = b;
      return !0
    }
    if (typeof a == "object" && typeof b == "undefined") {
      for (c in a)a.hasOwnProperty(c) && (localStorage[c] = a[c]);
      return !0
    }
    return !1
  }

  var b = typeof window.localStorage != "undefined";
  if (b)try {
    window.localStorage.setItem("test", !0), window.localStorage.removeItem("test")
  } catch (c) {
    b = !1
  }
  a.extend({Storage: {set: b ? d : e, get: b ? f : g, remove: b ? h : i}})
}(jQuery), function (a, b) {
  function o(a, b, c) {
    c = (c + 1) % 1;
    if (c * 6 < 1)return a + (b - a) * c * 6;
    if (c * 2 < 1)return b;
    if (c * 3 < 2)return a + (b - a) * (2 / 3 - c) * 6;
    return a
  }

  function n(b) {
    var c = f(), d = c._rgba = [];
    b = b.toLowerCase(), l(e, function (a, e) {
      var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba";
      if (i) {
        f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba;
        return !1
      }
    });
    if (d.length) {
      d.join() === "0,0,0,0" && a.extend(d, k.transparent);
      return c
    }
    return k[b]
  }

  function m(a, b, c) {
    var d = h[b.type] || {};
    if (a == null)return c || !b.def ? null : b.def;
    a = d.floor ? ~~a : parseFloat(a);
    if (isNaN(a))return b.def;
    if (d.mod)return (a + d.mod) % d.mod;
    return 0 > a ? 0 : d.max < a ? d.max : a
  }

  var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{
    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    parse: function (a) {
      return [a[1], a[2], a[3], a[4]]
    }
  }, {
    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    parse: function (a) {
      return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]]
    }
  }, {
    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (a) {
      return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
    }
  }, {
    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (a) {
      return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
    }
  }, {
    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
    space: "hsla",
    parse: function (a) {
      return [a[1], a[2] / 100, a[3] / 100, a[4]]
    }
  }], f = a.Color = function (b, c, d, e) {
    return new a.Color.fn.parse(b, c, d, e)
  }, g = {
    rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}},
    hsla: {
      props: {
        hue: {idx: 0, type: "degrees"},
        saturation: {idx: 1, type: "percent"},
        lightness: {idx: 2, type: "percent"}
      }
    }
  }, h = {
    "byte": {floor: !0, max: 255},
    percent: {max: 1},
    degrees: {mod: 360, floor: !0}
  }, i = f.support = {}, j = a("<p>")[0], k, l = a.each;
  j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) {
    b.cache = "_" + a, b.props.alpha = {idx: 3, type: "percent", def: 1}
  }), f.fn = a.extend(f.prototype, {
    parse: function (c, d, e, h) {
      if (c === b) {
        this._rgba = [null, null, null, null];
        return this
      }
      if (c.jquery || c.nodeType)c = a(c).css(d), d = b;
      var i = this, j = a.type(c), o = this._rgba = [];
      d !== b && (c = [c, d, e, h], j = "array");
      if (j === "string")return this.parse(n(c) || k._default);
      if (j === "array") {
        l(g.rgba.props, function (a, b) {
          o[b.idx] = m(c[b.idx], b)
        });
        return this
      }
      if (j === "object") {
        c instanceof f ? l(g, function (a, b) {
          c[b.cache] && (i[b.cache] = c[b.cache].slice())
        }) : l(g, function (b, d) {
          var e = d.cache;
          l(d.props, function (a, b) {
            if (!i[e] && d.to) {
              if (a === "alpha" || c[a] == null)return;
              i[e] = d.to(i._rgba)
            }
            i[e][b.idx] = m(c[a], b, !0)
          }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])))
        });
        return this
      }
    }, is: function (a) {
      var b = f(a), c = !0, d = this;
      l(g, function (a, e) {
        var f, g = b[e.cache];
        g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) {
          if (g[b.idx] != null) {
            c = g[b.idx] === f[b.idx];
            return c
          }
        }));
        return c
      });
      return c
    }, _space: function () {
      var a = [], b = this;
      l(g, function (c, d) {
        b[d.cache] && a.push(c)
      });
      return a.pop()
    }, transition: function (a, b) {
      var c = f(a), d = c._space(), e = g[d], i = this.alpha() === 0 ? f("transparent") : this, j = i[e.cache] || e.to(i._rgba), k = j.slice();
      c = c[e.cache], l(e.props, function (a, d) {
        var e = d.idx, f = j[e], g = c[e], i = h[d.type] || {};
        g !== null && (f === null ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d)))
      });
      return this[d](k)
    }, blend: function (b) {
      if (this._rgba[3] === 1)return this;
      var c = this._rgba.slice(), d = c.pop(), e = f(b)._rgba;
      return f(a.map(c, function (a, b) {
        return (1 - d) * e[b] + d * a
      }))
    }, toRgbaString: function () {
      var b = "rgba(", c = a.map(this._rgba, function (a, b) {
        return a == null ? b > 2 ? 1 : 0 : a
      });
      c[3] === 1 && (c.pop(), b = "rgb(");
      return b + c.join() + ")"
    }, toHslaString: function () {
      var b = "hsla(", c = a.map(this.hsla(), function (a, b) {
        a == null && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(a * 100) + "%");
        return a
      });
      c[3] === 1 && (c.pop(), b = "hsl(");
      return b + c.join() + ")"
    }, toHexString: function (b) {
      var c = this._rgba.slice(), d = c.pop();
      b && c.push(~~(d * 255));
      return "#" + a.map(c, function (a) {
          a = (a || 0).toString(16);
          return a.length === 1 ? "0" + a : a
        }).join("")
    }, toString: function () {
      return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
    }
  }), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) {
    if (a[0] == null || a[1] == null || a[2] == null)return [null, null, null, a[3]];
    var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = a[3], f = Math.max(b, c, d), g = Math.min(b, c, d), h = f - g, i = f + g, j = i * .5, k, l;
    g === f ? k = 0 : b === f ? k = 60 * (c - d) / h + 360 : c === f ? k = 60 * (d - b) / h + 120 : k = 60 * (b - c) / h + 240, h === 0 ? l = 0 : j <= .5 ? l = h / i : l = h / (2 - i);
    return [Math.round(k) % 360, l, j, e == null ? 1 : e]
  }, g.hsla.from = function (a) {
    if (a[0] == null || a[1] == null || a[2] == null)return [null, null, null, a[3]];
    var b = a[0] / 360, c = a[1], d = a[2], e = a[3], f = d <= .5 ? d * (1 + c) : d + c - d * c, g = 2 * d - f;
    return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e]
  }, l(g, function (c, e) {
    var g = e.props, h = e.cache, i = e.to, j = e.from;
    f.fn[c] = function (c) {
      i && !this[h] && (this[h] = i(this._rgba));
      if (c === b)return this[h].slice();
      var d, e = a.type(c), k = e === "array" || e === "object" ? c : arguments, n = this[h].slice();
      l(g, function (a, b) {
        var c = k[e === "object" ? a : b.idx];
        c == null && (c = n[b.idx]), n[b.idx] = m(c, b)
      });
      if (j) {
        d = f(j(n)), d[h] = n;
        return d
      }
      return f(n)
    }, l(g, function (b, e) {
      f.fn[b] || (f.fn[b] = function (f) {
        var g = a.type(f), h = b === "alpha" ? this._hsla ? "hsla" : "rgba" : c, i = this[h](), j = i[e.idx], k;
        if (g === "undefined")return j;
        g === "function" && (f = f.call(this, j), g = a.type(f));
        if (f == null && e.empty)return this;
        g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1 : -1))), i[e.idx] = f;
        return this[h](i)
      })
    })
  }), f.hook = function (b) {
    var c = b.split(" ");
    l(c, function (b, c) {
      a.cssHooks[c] = {
        set: function (b, d) {
          var e, g, h = "";
          if (d !== "transparent" && (a.type(d) !== "string" || (e = n(d)))) {
            d = f(e || d);
            if (!i.rgba && d._rgba[3] !== 1) {
              g = c === "backgroundColor" ? b.parentNode : b;
              while ((h === "" || h === "transparent") && g && g.style)try {
                h = a.css(g, "backgroundColor"), g = g.parentNode
              } catch (j) {
              }
              d = d.blend(h && h !== "transparent" ? h : "_default")
            }
            d = d.toRgbaString()
          }
          try {
            b.style[c] = d
          } catch (j) {
          }
        }
      }, a.fx.step[c] = function (b) {
        b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
      }
    })
  }, f.hook(c), a.cssHooks.borderColor = {
    expand: function (a) {
      var b = {};
      l(["Top", "Right", "Bottom", "Left"], function (c, d) {
        b["border" + d + "Color"] = a
      });
      return b
    }
  }, k = a.Color.names = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    fuchsia: "#ff00ff",
    gray: "#808080",
    green: "#008000",
    lime: "#00ff00",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    purple: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    teal: "#008080",
    white: "#ffffff",
    yellow: "#ffff00",
    transparent: [null, null, null, 0],
    _default: "#ffffff"
  }
}(jQuery), function (a) {
  a.fn.glow = function () {
    function j(b, c) {
      function d() {
        if (l < c) {
          var a = [0, 0, 0];
          for (var b = 0; b < 3; b++)a[b] = parseInt(k[b]) + (parseInt(j[b]) - parseInt(k[b])) / c * l;
          e.css("background-color", h(a)), l = l + 1, setTimeout(d, m)
        } else e.css("background-color", g), e.attr("glowing", 0)
      }

      var e = a(this);
      if (e.attr("glowing") != 1) {
        e.attr("glowing", 1);
        var g = a(e).css("background-color"), j = f(i(e));
        if (!j)return;
        var l = 0, m = parseInt(b / c, 10);
        d.call(e)
      }
    }

    function i(a) {
      var b;
      do {
        b = a.css("background-color");
        if (g(b))return b;
        b = a[0].bgColor;
        if (b)return b;
        a = a.parent()
      } while (a.length > 0 && a.get(0).tagName);
      return arguments[1] || "#FFF"
    }

    function h(a) {
      return "#" + (16777216 + parseInt(a[0], 10) * 65536 + parseInt(a[1], 10) * 256 + parseInt(a[2], 10)).toString(16).slice(-6)
    }

    function g(a) {
      if (a == "inherit" || a == "transparent")return !1;
      var b = d(), c = b.exec(a);
      if (c && parseInt(c[4], 10) == 0)return !1;
      return !0
    }

    function f(a) {
      var b, g = new RegExp("#([A-F0-9]{2})([a-fA-F0-9]{2})([A-F0-9]{2})", "i");
      if (b = g.exec(a))return [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
      g = new RegExp("#([A-F0-9]{1})([A-F0-9]{1})([A-F0-9]{1})", "i");
      if (b = g.exec(a))return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16)];
      g = e();
      if (b = g.exec(a))return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10)];
      g = d();
      if (b = g.exec(a))return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10), parseInt(b[4], 10)];
      if (b = c(a))return f("#" + b);
      window.console && console.log("can not parse color " + a);
      return !1
    }

    function e() {
      return new RegExp("rgb\\s*\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*\\)")
    }

    function d() {
      return new RegExp("rgba\\s*\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*\\,\\s*([0-9]{1,3})\\s*\\)")
    }

    function c(a) {
      return b[("" + a).toLowerCase()] || null
    }

    var b = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgrey: "a9a9a9",
      darkgreen: "006400",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      grey: "808080",
      green: "008000",
      greenyellow: "adff2f",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgrey: "d3d3d3",
      lightgreen: "90ee90",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightslategrey: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370d8",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "d87093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32"
    }, k = f(arguments[0] || "#FFFF99");
    if (!k)return !1;
    var l = arguments[1] || 1e3, m = arguments[2] || 50;
    if (l < 0 || !l)l = 1e3;
    if (m < 0 || !m)m = 1;
    a(this).each(function (a, b) {
      j.call(b, l, m)
    })
  }
}(jQuery), function (a, b) {
  function d(b) {
    return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
        return "hidden" === a.css(this, "visibility")
      }).length
  }

  function c(b, c) {
    var e, f, g, h = b.nodeName.toLowerCase();
    return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b)
  }

  var e = 0, f = /^ui-id-\d+$/;
  a.ui = a.ui || {}, a.extend(a.ui, {
    version: "1.10.4",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  }), a.fn.extend({
    focus: function (b) {
      return function (c, d) {
        return "number" == typeof c ? this.each(function () {
          var b = this;
          setTimeout(function () {
            a(b).focus(), d && d.call(b)
          }, c)
        }) : b.apply(this, arguments)
      }
    }(a.fn.focus), scrollParent: function () {
      var b;
      return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
      }).eq(0) : this.parents().filter(function () {
        return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
      }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    }, zIndex: function (c) {
      if (c !== b)return this.css("zIndex", c);
      if (this.length)for (var d, e, f = a(this[0]); f.length && f[0] !== document;) {
        if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), !isNaN(e) && 0 !== e))return e;
        f = f.parent()
      }
      return 0
    }, uniqueId: function () {
      return this.each(function () {
        this.id || (this.id = "ui-id-" + ++e)
      })
    }, removeUniqueId: function () {
      return this.each(function () {
        f.test(this.id) && a(this).removeAttr("id")
      })
    }
  }), a.extend(a.expr[":"], {
    data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
      return function (c) {
        return !!a.data(c, b)
      }
    }) : function (b, c, d) {
      return !!a.data(b, d[3])
    }, focusable: function (b) {
      return c(b, !isNaN(a.attr(b, "tabindex")))
    }, tabbable: function (b) {
      var d = a.attr(b, "tabindex"), e = isNaN(d);
      return (e || d >= 0) && c(b, !e)
    }
  }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) {
    function e(b, c, d, e) {
      return a.each(f, function () {
        c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
      }), c
    }

    var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"], g = d.toLowerCase(), h = {
      innerWidth: a.fn.innerWidth,
      innerHeight: a.fn.innerHeight,
      outerWidth: a.fn.outerWidth,
      outerHeight: a.fn.outerHeight
    };
    a.fn["inner" + d] = function (c) {
      return c === b ? h["inner" + d].call(this) : this.each(function () {
        a(this).css(g, e(this, c) + "px")
      })
    }, a.fn["outer" + d] = function (b, c) {
      return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function () {
        a(this).css(g, e(this, b, !0, c) + "px")
      })
    }
  }), a.fn.addBack || (a.fn.addBack = function (a) {
    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
  }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
    return function (c) {
      return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
    }
  }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart"in document.createElement("div"), a.fn.extend({
    disableSelection: function () {
      return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
        a.preventDefault()
      })
    }, enableSelection: function () {
      return this.unbind(".ui-disableSelection")
    }
  }), a.extend(a.ui, {
    plugin: {
      add: function (b, c, d) {
        var e, f = a.ui[b].prototype;
        for (e in d)f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
      }, call: function (a, b, c) {
        var d, e = a.plugins[b];
        if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)for (d = 0; e.length > d; d++)a.options[e[d][0]] && e[d][1].apply(a.element, c)
      }
    }, hasScroll: function (b, c) {
      if ("hidden" === a(b).css("overflow"))return !1;
      var d = c && "left" === c ? "scrollLeft" : "scrollTop", e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    }
  })
}(jQuery), function (a, b) {
  var c = 0, d = Array.prototype.slice, e = a.cleanData;
  a.cleanData = function (b) {
    for (var c, d = 0; null != (c = b[d]); d++)try {
      a(c).triggerHandler("remove")
    } catch (f) {
    }
    e(b)
  }, a.widget = function (c, d, e) {
    var f, g, h, i, j = {}, k = c.split(".")[0];
    c = c.split(".")[1], f = k + "-" + c, e || (e = d, d = a.Widget), a.expr[":"][f.toLowerCase()] = function (b) {
      return !!a.data(b, f)
    }, a[k] = a[k] || {}, g = a[k][c], h = a[k][c] = function (a, c) {
      return this._createWidget ? (arguments.length && this._createWidget(a, c), b) : new h(a, c)
    }, a.extend(h, g, {
      version: e.version,
      _proto: a.extend({}, e),
      _childConstructors: []
    }), i = new d, i.options = a.widget.extend({}, i.options), a.each(e, function (c, e) {
      return a.isFunction(e) ? (j[c] = function () {
        var a = function () {
          return d.prototype[c].apply(this, arguments)
        }, b = function (a) {
          return d.prototype[c].apply(this, a)
        };
        return function () {
          var c, d = this._super, f = this._superApply;
          return this._super = a, this._superApply = b, c = e.apply(this, arguments), this._super = d, this._superApply = f, c
        }
      }(), b) : (j[c] = e, b)
    }), h.prototype = a.widget.extend(i, {widgetEventPrefix: g ? i.widgetEventPrefix || c : c}, j, {
      constructor: h,
      namespace: k,
      widgetName: c,
      widgetFullName: f
    }), g ? (a.each(g._childConstructors, function (b, c) {
      var d = c.prototype;
      a.widget(d.namespace + "." + d.widgetName, h, c._proto)
    }), delete g._childConstructors) : d._childConstructors.push(h), a.widget.bridge(c, h)
  }, a.widget.extend = function (c) {
    for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)for (e in g[h])f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
    return c
  }, a.widget.bridge = function (c, e) {
    var f = e.prototype.widgetFullName || c;
    a.fn[c] = function (g) {
      var h = "string" == typeof g, j = d.call(arguments, 1), k = this;
      return g = !h && j.length ? a.widget.extend.apply(null, [g].concat(j)) : g, h ? this.each(function () {
        var d, e = a.data(this, f);
        return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, j), d !== e && d !== b ? (k = d && d.jquery ? k.pushStack(d.get()) : d, !1) : b) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'")
      }) : this.each(function () {
        var b = a.data(this, f);
        b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
      }), k
    }
  }, a.Widget = function () {
  }, a.Widget._childConstructors = [], a.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {disabled: !1, create: null},
    _createWidget: function (b, d) {
      d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function (a) {
          a.target === d && this.destroy()
        }
      }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: a.noop,
    _getCreateEventData: a.noop,
    _create: a.noop,
    _init: a.noop,
    destroy: function () {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: a.noop,
    widget: function () {
      return this.element
    },
    option: function (c, d) {
      var e, f, g, h = c;
      if (0 === arguments.length)return a.widget.extend({}, this.options);
      if ("string" == typeof c)if (h = {}, e = c.split("."), c = e.shift(), e.length) {
        for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; e.length - 1 > g; g++)f[e[g]] = f[e[g]] || {}, f = f[e[g]];
        if (c = e.pop(), 1 === arguments.length)return f[c] === b ? null : f[c];
        f[c] = d
      } else {
        if (1 === arguments.length)return this.options[c] === b ? null : this.options[c];
        h[c] = d
      }
      return this._setOptions(h), this
    },
    _setOptions: function (a) {
      var b;
      for (b in a)this._setOption(b, a[b]);
      return this
    },
    _setOption: function (a, b) {
      return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled"
        , !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    },
    enable: function () {
      return this._setOption("disabled", !1)
    },
    disable: function () {
      return this._setOption("disabled", !0)
    },
    _on: function (c, d, e) {
      var f, g = this;
      "boolean" != typeof c && (e = d, d = c, c = !1), e ? (d = f = a(d), this.bindings = this.bindings.add(d)) : (e = d, d = this.element, f = this.widget()), a.each(e, function (e, h) {
        function j() {
          return c || g.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof h ? g[h] : h).apply(g, arguments) : b
        }

        "string" != typeof h && (j.guid = h.guid = h.guid || j.guid || a.guid++);
        var k = e.match(/^(\w+)\s*(.*)$/), l = k[1] + g.eventNamespace, m = k[2];
        m ? f.delegate(m, l, j) : d.bind(l, j)
      })
    },
    _off: function (a, b) {
      b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
    },
    _delay: function (a, b) {
      function c() {
        return ("string" == typeof a ? d[a] : a).apply(d, arguments)
      }

      var d = this;
      return setTimeout(c, b || 0)
    },
    _hoverable: function (b) {
      this.hoverable = this.hoverable.add(b), this._on(b, {
        mouseenter: function (b) {
          a(b.currentTarget).addClass("ui-state-hover")
        }, mouseleave: function (b) {
          a(b.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function (b) {
      this.focusable = this.focusable.add(b), this._on(b, {
        focusin: function (b) {
          a(b.currentTarget).addClass("ui-state-focus")
        }, focusout: function (b) {
          a(b.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function (b, c, d) {
      var e, f, g = this.options[b];
      if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)for (e in f)e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
    }
  }, a.each({show: "fadeIn", hide: "fadeOut"}, function (b, c) {
    a.Widget.prototype["_" + b] = function (d, e, f) {
      "string" == typeof e && (e = {effect: e});
      var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
      e = e || {}, "number" == typeof e && (e = {duration: e}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
        a(this)[b](), f && f.call(d[0]), c()
      })
    }
  })
}(jQuery), function (a) {
  var b = !1;
  a(document).mouseup(function () {
    b = !1
  }), a.widget("ui.mouse", {
    version: "1.10.4",
    options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
    _mouseInit: function () {
      var b = this;
      this.element.bind("mousedown." + this.widgetName, function (a) {
        return b._mouseDown(a)
      }).bind("click." + this.widgetName, function (c) {
        return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : undefined
      }), this.started = !1
    },
    _mouseDestroy: function () {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function (c) {
      if (!b) {
        this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
        var d = this, f = 1 === c.which, g = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
        return f && !g && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          d.mouseDelayMet = !0
        }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
          return d._mouseMove(a)
        }, this._mouseUpDelegate = function (a) {
          return d._mouseUp(a)
        }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
      }
    },
    _mouseMove: function (b) {
      return a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
    },
    _mouseUp: function (b) {
      return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
    },
    _mouseDistanceMet: function (a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet
    },
    _mouseStart: function () {
    },
    _mouseDrag: function () {
    },
    _mouseStop: function () {
    },
    _mouseCapture: function () {
      return !0
    }
  })
}(jQuery), function (a, b) {
  function e(b) {
    var c = b[0];
    return 9 === c.nodeType ? {
      width: b.width(),
      height: b.height(),
      offset: {top: 0, left: 0}
    } : a.isWindow(c) ? {
      width: b.width(),
      height: b.height(),
      offset: {top: b.scrollTop(), left: b.scrollLeft()}
    } : c.preventDefault ? {width: 0, height: 0, offset: {top: c.pageY, left: c.pageX}} : {
      width: b.outerWidth(),
      height: b.outerHeight(),
      offset: b.offset()
    }
  }

  function d(b, c) {
    return parseInt(a.css(b, c), 10) || 0
  }

  function c(a, b, c) {
    return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
  }

  a.ui = a.ui || {};
  var f, g = Math.max, h = Math.abs, i = Math.round, j = /left|center|right/, k = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, m = /^\w+/, n = /%$/, o = a.fn.position;
  a.position = {
    scrollbarWidth: function () {
      if (f !== b)return f;
      var c, d, e = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), g = e.children()[0];
      return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), f = c - d
    }, getScrollInfo: function (b) {
      var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"), d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"), e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth, f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
      return {width: f ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0}
    }, getWithinInfo: function (b) {
      var c = a(b || window), d = a.isWindow(c[0]), e = !!c[0] && 9 === c[0].nodeType;
      return {
        element: c,
        isWindow: d,
        isDocument: e,
        offset: c.offset() || {left: 0, top: 0},
        scrollLeft: c.scrollLeft(),
        scrollTop: c.scrollTop(),
        width: d ? c.width() : c.outerWidth(),
        height: d ? c.height() : c.outerHeight()
      }
    }
  }, a.fn.position = function (b) {
    if (!b || !b.of)return o.apply(this, arguments);
    b = a.extend({}, b);
    var f, n, p, q, v, w, x = a(b.of), y = a.position.getWithinInfo(b.within), z = a.position.getScrollInfo(y), A = (b.collision || "flip").split(" "), B = {};
    return w = e(x), x[0].preventDefault && (b.at = "left top"), n = w.width, p = w.height, q = w.offset, v = a.extend({}, q), a.each(["my", "at"], function () {
      var a, c, d = (b[this] || "").split(" ");
      1 === d.length && (d = j.test(d[0]) ? d.concat(["center"]) : k.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), c = l.exec(d[1]), B[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [m.exec(d[0])[0], m.exec(d[1])[0]]
    }), 1 === A.length && (A[1] = A[0]), "right" === b.at[0] ? v.left += n : "center" === b.at[0] && (v.left += n / 2), "bottom" === b.at[1] ? v.top += p : "center" === b.at[1] && (v.top += p / 2), f = c(B.at, n, p), v.left += f[0], v.top += f[1], this.each(function () {
      var e, j, k = a(this), l = k.outerWidth(), m = k.outerHeight(), o = d(this, "marginLeft"), u = d(this, "marginTop"), w = l + o + d(this, "marginRight") + z.width, C = m + u + d(this, "marginBottom") + z.height, E = a.extend({}, v), F = c(B.my, k.outerWidth(), k.outerHeight());
      "right" === b.my[0] ? E.left -= l : "center" === b.my[0] && (E.left -= l / 2), "bottom" === b.my[1] ? E.top -= m : "center" === b.my[1] && (E.top -= m / 2), E.left += F[0], E.top += F[1], a.support.offsetFractions || (E.left = i(E.left), E.top = i(E.top)), e = {
        marginLeft: o,
        marginTop: u
      }, a.each(["left", "top"], function (c, d) {
        a.ui.position[A[c]] && a.ui.position[A[c]][d](E, {
          targetWidth: n,
          targetHeight: p,
          elemWidth: l,
          elemHeight: m,
          collisionPosition: e,
          collisionWidth: w,
          collisionHeight: C,
          offset: [f[0] + F[0], f[1] + F[1]],
          my: b.my,
          at: b.at,
          within: y,
          elem: k
        })
      }), b.using && (j = function (a) {
        var c = q.left - E.left, d = c + n - l, e = q.top - E.top, f = e + p - m, i = {
          target: {
            element: x,
            left: q.left,
            top: q.top,
            width: n,
            height: p
          },
          element: {element: k, left: E.left, top: E.top, width: l, height: m},
          horizontal: 0 > d ? "left" : c > 0 ? "right" : "center",
          vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"
        };
        l > n && n > h(c + d) && (i.horizontal = "center"), m > p && p > h(e + f) && (i.vertical = "middle"), i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i)
      }), k.offset(a.extend(E, {using: j}))
    })
  }, a.ui.position = {
    fit: {
      left: function (a, b) {
        var c, d = b.within, e = d.isWindow ? d.scrollLeft : d.offset.left, f = d.width, h = a.left - b.collisionPosition.marginLeft, i = e - h, j = h + b.collisionWidth - f - e;
        b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
      }, top: function (a, b) {
        var c, d = b.within, e = d.isWindow ? d.scrollTop : d.offset.top, f = b.within.height, h = a.top - b.collisionPosition.marginTop, i = e - h, j = h + b.collisionHeight - f - e;
        b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
      }
    }, flip: {
      left: function (a, b) {
        var c, d, e = b.within, f = e.offset.left + e.scrollLeft, g = e.width, i = e.isWindow ? e.scrollLeft : e.offset.left, j = a.left - b.collisionPosition.marginLeft, k = j - i, l = j + b.collisionWidth - g - i, m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0, n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0, o = -2 * b.offset[0];
        0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || h(k) > c) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || l > h(d)) && (a.left += m + n + o))
      }, top: function (a, b) {
        var c, d, e = b.within, f = e.offset.top + e.scrollTop, g = e.height, i = e.isWindow ? e.scrollTop : e.offset.top, j = a.top - b.collisionPosition.marginTop, k = j - i, l = j + b.collisionHeight - g - i, m = "top" === b.my[1], n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0, o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0, p = -2 * b.offset[1];
        0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || h(k) > d) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || l > h(c)) && (a.top += n + o + p))
      }
    }, flipfit: {
      left: function () {
        a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
      }, top: function () {
        a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
      }
    }
  }, function () {
    var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
    b = document.createElement(g ? "div" : "body"), d = {
      visibility: "hidden",
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: "none"
    }, g && a.extend(d, {position: "absolute", left: "-1000px", top: "-1000px"});
    for (f in d)b.style[f] = d[f];
    b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
  }()
}(jQuery), function (a) {
  a.widget("ui.draggable", a.ui.mouse, {
    version: "1.10.4",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function () {
      "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    },
    _destroy: function () {
      this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
    },
    _mouseCapture: function (b) {
      var c = this.options;
      return this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function () {
        a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
          width: this.offsetWidth + "px",
          height: this.offsetHeight + "px",
          position: "absolute",
          opacity: "0.001",
          zIndex: 1e3
        }).css(a(this).offset()).appendTo("body")
      }), !0) : !1)
    },
    _mouseStart: function (b) {
      var c = this.options;
      return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, this.offset.scroll = !1, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        }, parent: this._getParentOffset(), relative: this._getRelativeOffset()
      }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
    },
    _mouseDrag: function (b, c) {
      if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), !c) {
        var d = this._uiHash();
        if (this._trigger("drag", b, d) === !1)return this._mouseUp({}), !1;
        this.position = d.position
      }
      return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
    },
    _mouseStop: function (b) {
      var c = this, d = !1;
      return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
        c._trigger("stop", b) !== !1 && c._clear()
      }) : this._trigger("stop", b) !== !1 && this._clear(), !1) : !1
    },
    _mouseUp: function (b) {
      return a("div.ui-draggable-iframeFix").each(function () {
        this.parentNode.removeChild(this)
      }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
    },
    cancel: function () {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    },
    _getHandle: function (b) {
      return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
    },
    _createHelper: function (b) {
      var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
      return d.parents("body").length || d.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] === this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), d
    },
    _adjustOffsetFromHelper: function (b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function () {
      var b = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function () {
      if ("relative" === this.cssPosition) {
        var a = this.element.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {top: 0, left: 0}
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      }
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    },
    _setContainment: function () {
      var b, c, d, e = this.options;
      return e.containment ? "window" === e.containment ? (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : "document" === e.containment ? (this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], undefined) : e.containment.constructor === Array ? (this.containment = e.containment, undefined) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], d && (b = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c), undefined) : (this.containment = null, undefined)
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
      return this.offset.scroll || (this.offset.scroll = {
        top: e.scrollTop(),
        left: e.scrollLeft()
      }), {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * d,
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * d
      }
    },
    _generatePosition: function (b) {
      var c, d, e, f, g = this.options, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = b.pageX, j = b.pageY;
      return this.offset.scroll || (this.offset.scroll = {
        top: h.scrollTop(),
        left: h.scrollLeft()
      }), this.originalPosition && (this.containment && (this.relative_container ? (d = this.relative_container.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, b.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), b.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), b.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), b.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f)), {
        top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
        left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
      }
    },
    _clear: function () {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    },
    _trigger: function (b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), "drag" === b && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
    },
    plugins: {},
    _uiHash: function () {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      }
    }
  }), a.ui.plugin.add("draggable", "connectToSortable", {
    start: function (b, c) {
      var d = a(this).data("ui-draggable"), e = d.options, f = a.extend({}, c, {item: d.element});
      d.sortables = [], a(e.connectToSortable).each(function () {
        var c = a.data(this, "ui-sortable");
        c && !c.options.disabled && (d.sortables.push({
          instance: c,
          shouldRevert: c.options.revert
        }), c.refreshPositions(), c._trigger("activate", b, f))
      })
    }, stop: function (b, c) {
      var d = a(this).data("ui-draggable"), e = a.extend({}, c, {item: d.element});
      a.each(d.sortables, function () {
        this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" === d.options.helper && this.instance.currentItem.css({
          top: "auto",
          left: "auto"
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
      })
    }, drag: function (b, c) {
      var d = a(this).data("ui-draggable"), e = this;
      a.each(d.sortables, function () {
        var f = !1, g = this;
        this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, a.each(d.sortables, function () {
          return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this !== g && this.instance._intersectsWith(this.instance.containerCache) && a.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), f
        })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
          return c.helper[0]
        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
      })
    }
  }), a.ui.plugin.add("draggable", "cursor", {
    start: function () {
      var b = a("body"), c = a(this).data("ui-draggable").options;
      b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor)
    }, stop: function () {
      var b = a(this).data("ui-draggable").options;
      b._cursor && a("body").css("cursor", b._cursor)
    }
  }), a.ui.plugin.add("draggable", "opacity", {
    start: function (b, c) {
      var d = a(c.helper), e = a(this).data("ui-draggable").options;
      d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
    }, stop: function (b, c) {
      var d = a(this).data("ui-draggable").options;
      d._opacity && a(c.helper).css("opacity", d._opacity)
    }
  }), a.ui.plugin.add("draggable", "scroll", {
    start: function () {
      var b = a(this).data("ui-draggable");
      b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
    }, drag: function (b) {
      var c = a(this).data("ui-draggable"), d = c.options, e = !1;
      c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (d.axis && "x" === d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop - d.scrollSpeed)), d.axis && "y" === d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" === d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), d.axis && "y" === d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), e !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b)
    }
  }), a.ui.plugin.add("draggable", "snap", {
    start: function () {
      var b = a(this).data("ui-draggable"), c = b.options;
      b.snapElements = [], a(c.snap.constructor !== String ? c.snap.items || ":data(ui-draggable)" : c.snap).each(function () {
        var c = a(this), d = c.offset();
        this !== b.element[0] && b.snapElements.push({
          item: this,
          width: c.outerWidth(),
          height: c.outerHeight(),
          top: d.top,
          left: d.left
        })
      })
    }, drag: function (b, c) {
      var d, e, f, g, h, i, j, k, l, m, n = a(this).data("ui-draggable"), o = n.options, p = o.snapTolerance, q = c.offset.left, r = q + n.helperProportions.width, s = c.offset.top, u = s + n.helperProportions.height;
      for (l = n.snapElements.length - 1; l >= 0; l--)h = n.snapElements[l].left, i = h + n.snapElements[l].width, j = n.snapElements[l].top, k = j + n.snapElements[l].height, h - p > r || q > i + p || j - p > u || s > k + p || !a.contains(n.snapElements[l].item.ownerDocument, n.snapElements[l].item) ? (n.snapElements[l].snapping && n.options.snap.release && n.options.snap.release.call(n.element, b, a.extend(n._uiHash(), {snapItem: n.snapElements[l].item})), n.snapElements[l].snapping = !1) : ("inner" !== o.snapMode && (d = p >= Math.abs(j - u), e = p >= Math.abs(k - s), f = p >= Math.abs(h - r), g = p >= Math.abs(i - q), d && (c.position.top = n._convertPositionTo("relative", {
        top: j - n.helperProportions.height,
        left: 0
      }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
        top: k,
        left: 0
      }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: h - n.helperProportions.width
      }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: i
      }).left - n.margins.left)), m = d || e || f || g, "outer" !== o.snapMode && (d = p >= Math.abs(j - s), e = p >= Math.abs(k - u), f = p >= Math.abs(h - q), g = p >= Math.abs(i - r), d && (c.position.top = n._convertPositionTo("relative", {
        top: j,
        left: 0
      }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
        top: k - n.helperProportions.height,
        left: 0
      }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: h
      }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: i - n.helperProportions.width
      }).left - n.margins.left)), !n.snapElements[l].snapping && (d || e || f || g || m) && n.options.snap.snap && n.options.snap.snap.call(n.element, b, a.extend(n._uiHash(), {snapItem: n.snapElements[l].item})), n.snapElements[l].snapping = d || e || f || g || m)
    }
  }), a.ui.plugin.add("draggable", "stack", {
    start: function () {
      var b, c = this.data("ui-draggable").options, d = a.makeArray(a(c.stack)).sort(function (b, c) {
        return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
      });
      d.length && (b = parseInt(a(d[0]).css("zIndex"), 10) || 0, a(d).each(function (c) {
        a(this).css("zIndex", b + c)
      }), this.css("zIndex", b + d.length))
    }
  }), a.ui.plugin.add("draggable", "zIndex", {
    start: function (b, c) {
      var d = a(c.helper), e = a(this).data("ui-draggable").options;
      d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
    }, stop: function (b, c) {
      var d = a(this).data("ui-draggable").options;
      d._zIndex && a(c.helper).css("zIndex", d._zIndex)
    }
  })
}(jQuery), function (a) {
  function b(a, b, c) {
    return a > b && b + c > a
  }

  a.widget("ui.droppable", {
    version: "1.10.4",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function () {
      var b, c = this.options, d = c.accept;
      this.isover = !1, this.isout = !0, this.accept = a.isFunction(d) ? d : function (a) {
        return a.is(d)
      }, this.proportions = function () {
        return arguments.length ? (b = arguments[0], undefined) : b ? b : b = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight
        }
      }, a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [], a.ui.ddmanager.droppables[c.scope].push(this), c.addClasses && this.element.addClass("ui-droppable")
    },
    _destroy: function () {
      for (var b = 0, c = a.ui.ddmanager.droppables[this.options.scope]; c.length > b; b++)c[b] === this && c.splice(b, 1);
      this.element.removeClass("ui-droppable ui-droppable-disabled")
    },
    _setOption: function (b, c) {
      "accept" === b && (this.accept = a.isFunction(c) ? c : function (a) {
        return a.is(c)
      }), a.Widget.prototype._setOption.apply(this, arguments)
    },
    _activate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
    },
    _deactivate: function (b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
    },
    _over: function (b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
    },
    _out: function (b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
    },
    _drop: function (b, c) {
      var d = c || a.ui.ddmanager.current, e = !1;
      return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
        var b = a.data(this, "ui-droppable");
        return b.options.greedy && !b.options.disabled && b.options.scope === d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {offset: b.element.offset()}), b.options.tolerance) ? (e = !0, !1) : undefined
      }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
    },
    ui: function (a) {
      return {draggable: a.currentItem || a.element, helper: a.helper, position: a.position, offset: a.positionAbs}
    }
  }), a.ui.intersect = function (a, c, d) {
    if (!c.offset)return !1;
    var f, g, h = (a.positionAbs || a.position.absolute).left, i = (a.positionAbs || a.position.absolute).top, j = h + a.helperProportions.width, k = i + a.helperProportions.height, l = c.offset.left, m = c.offset.top, n = l + c.proportions().width, o = m + c.proportions().height;
    switch (d) {
      case"fit":
        return h >= l && n >= j && i >= m && o >= k;
      case"intersect":
        return h + a.helperProportions.width / 2 > l && n > j - a.
            helperProportions.width / 2 && i + a.helperProportions.height / 2 > m && o > k - a.helperProportions.height / 2;
      case"pointer":
        return f = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, g = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, b(g, m, c.proportions().height) && b(f, l, c.proportions().width);
      case"touch":
        return (i >= m && o >= i || k >= m && o >= k || m > i && k > o) && (h >= l && n >= h || j >= l && n >= j || l > h && j > n);
      default:
        return !1
    }
  }, a.ui.ddmanager = {
    current: null, droppables: {"default": []}, prepareOffsets: function (b, c) {
      var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [], g = c ? c.type : null, h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
      t:for (d = 0; f.length > d; d++)if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
        for (e = 0; h.length > e; e++)if (h[e] === f[d].element[0]) {
          f[d].proportions().height = 0;
          continue t
        }
        f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions({
          width: f[d].element[0].offsetWidth,
          height: f[d].element[0].offsetHeight
        }))
      }
    }, drop: function (b, c) {
      var d = !1;
      return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function () {
        this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
      }), d
    }, dragStart: function (b, c) {
      b.element.parentsUntil("body").bind("scroll.droppable", function () {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
      })
    }, drag: function (b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var d, f, g, h = a.ui.intersect(b, this, this.options.tolerance), j = !h && this.isover ? "isout" : h && !this.isover ? "isover" : null;
          j && (this.options.greedy && (f = this.options.scope, g = this.element.parents(":data(ui-droppable)").filter(function () {
            return a.data(this, "ui-droppable").options.scope === f
          }), g.length && (d = a.data(g[0], "ui-droppable"), d.greedyChild = "isover" === j)), d && "isover" === j && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[j] = !0, this["isout" === j ? "isover" : "isout"] = !1, this["isover" === j ? "_over" : "_out"].call(this, c), d && "isout" === j && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
        }
      })
    }, dragStop: function (b, c) {
      b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
    }
  }
}(jQuery), function (a) {
  function c(a) {
    return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
  }

  function b(a, b, c) {
    return a > b && b + c > a
  }

  a.widget("ui.sortable", a.ui.mouse, {
    version: "1.10.4",
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _create: function () {
      var a = this.options;
      this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || c(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    },
    _destroy: function () {
      this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
      for (var a = this.items.length - 1; a >= 0; a--)this.items[a].item.removeData(this.widgetName + "-item");
      return this
    },
    _setOption: function (b, c) {
      "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
    },
    _mouseCapture: function (b, c) {
      var d = null, e = !1, f = this;
      return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function () {
        return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : undefined
      }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d ? !this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function () {
        this === b.target && (e = !0)
      }), e) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1 : !1)
    },
    _mouseStart: function (b, c, d) {
      var e, f, g = this.options;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        }, a.extend(this.offset, {
          click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top},
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
          prev: this.currentItem.prev()[0],
          parent: this.currentItem.parent()[0]
        }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)for (e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("activate", b, this._uiHash(this));
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
    },
    _mouseDrag: function (b) {
      var c, d, e, f, g = this.options, h = !1;
      for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
        if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d))break;
        this._rearrange(b, d), this._trigger("change", b, this._uiHash());
        break
      }
      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    },
    _mouseStop: function (b, c) {
      if (b) {
        if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
          var d = this, e = this.placeholder.offset(), f = this.options.axis, g = {};
          f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
            d._clear(b)
          })
        } else this._clear(b, c);
        return !1
      }
    },
    cancel: function () {
      if (this.dragging) {
        this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
        for (var b = this.containers.length - 1; b >= 0; b--)this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
    },
    serialize: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected), d = [];
      return b = b || {}, a(c).each(function () {
        var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
        c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
      }), !d.length && b.key && d.push(b.key + "="), d.join("&")
    },
    toArray: function (b) {
      var c = this._getItemsAsjQuery(b && b.connected), d = [];
      return b = b || {}, c.each(function () {
        d.push(a(b.item || this).attr(b.attribute || "id") || "")
      }), d
    },
    _intersectsWith: function (a) {
      var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = "x" === this.options.axis || d + j > h && i > d + j, m = "y" === this.options.axis || b + k > f && g > b + k, n = l && m;
      return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : b + this.helperProportions.width / 2 > f && g > c - this.helperProportions.width / 2 && d + this.helperProportions.height / 2 > h && i > e - this.helperProportions.height / 2
    },
    _intersectsWithPointer: function (a) {
      var c = "x" === this.options.axis || b(this.positionAbs.top + this.offset.click.top, a.top, a.height), d = "y" === this.options.axis || b(this.positionAbs.left + this.offset.click.left, a.left, a.width), f = c && d, g = this._getDragVerticalDirection(), h = this._getDragHorizontalDirection();
      return f ? this.floating ? h && "right" === h || "down" === g ? 2 : 1 : g && ("down" === g ? 2 : 1) : !1
    },
    _intersectsWithSides: function (a) {
      var c = b(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height), d = b(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width), f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
      return this.floating && g ? "right" === g && d || "left" === g && !d : f && ("down" === f && c || "up" === f && !c)
    },
    _getDragVerticalDirection: function () {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 !== a && (a > 0 ? "down" : "up")
    },
    _getDragHorizontalDirection: function () {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 !== a && (a > 0 ? "right" : "left")
    },
    refresh: function (a) {
      return this._refreshItems(a), this.refreshPositions(), this
    },
    _connectWith: function () {
      var a = this.options;
      return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
    },
    _getItemsAsjQuery: function (b) {
      function c() {
        h.push(this)
      }

      var d, e, f, g, h = [], i = [], j = this._connectWith();
      if (j && b)for (d = j.length - 1; d >= 0; d--)for (f = a(j[d]), e = f.length - 1; e >= 0; e--)g = a.data(f[e], this.widgetFullName), g && g !== this && !g.options.disabled && i.push([a.isFunction(g.options.items) ? g.options.items.call(g.element) : a(g.options.items, g.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), g]);
      for (i.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
        options: this.options,
        item: this.currentItem
      }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), d = i.length - 1; d >= 0; d--)i[d][0].each(c);
      return a(h)
    },
    _removeCurrentsFromItems: function () {
      var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = a.grep(this.items, function (a) {
        for (var c = 0; b.length > c; c++)if (b[c] === a.item[0])return !1;
        return !0
      })
    },
    _refreshItems: function (b) {
      this.items = [], this.containers = [this];
      var c, d, e, f, g, h, i, j, k = this.items, l = [[a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]], m = this._connectWith();
      if (m && this.ready)for (c = m.length - 1; c >= 0; c--)for (e = a(m[c]), d = e.length - 1; d >= 0; d--)f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {item: this.currentItem}) : a(f.options.items, f.element), f]), this.containers.push(f));
      for (c = l.length - 1; c >= 0; c--)for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++)i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
        item: i,
        instance: g,
        width: 0,
        height: 0,
        left: 0,
        top: 0
      })
    },
    refreshPositions: function (b) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      var c, d, e, f;
      for (c = this.items.length - 1; c >= 0; c--)d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
      if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (c = this.containers.length - 1; c >= 0; c--)f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
      return this
    },
    _createPlaceholder: function (b) {
      b = b || this;
      var c, d = b.options;
      d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
        element: function () {
          var d = b.currentItem[0].nodeName.toLowerCase(), f = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
          return "tr" === d ? b.currentItem.children().each(function () {
            a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(f)
          }) : "img" === d && f.attr("src", b.currentItem.attr("src")), c || f.css("visibility", "hidden"), f
        }, update: function (a, f) {
          (!c || d.forcePlaceholderSize) && (f.height() || f.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), f.width() || f.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
        }
      }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
    },
    _contactContainers: function (d) {
      var f, g, h, j, k, l, m, n, o, p, q = null, r = null;
      for (f = this.containers.length - 1; f >= 0; f--)if (!a.contains(this.currentItem[0], this.containers[f].element[0]))if (this._intersectsWith(this.containers[f].containerCache)) {
        if (q && a.contains(this.containers[f].element[0], q.element[0]))continue;
        q = this.containers[f], r = f
      } else this.containers[f].containerCache.over && (this.containers[f]._trigger("out", d, this._uiHash(this)), this.containers[f].containerCache.over = 0);
      if (q)if (1 === this.containers.length)this.containers[r].containerCache.over || (this.containers[r]._trigger("over", d, this._uiHash(this)), this.containers[r].containerCache.over = 1); else {
        for (h = 1e4, j = null, p = q.floating || c(this.currentItem), k = p ? "left" : "top", l = p ? "width" : "height", m = this.positionAbs[k] + this.offset.click[k], g = this.items.length - 1; g >= 0; g--)a.contains(this.containers[r].element[0], this.items[g].item[0]) && this.items[g].item[0] !== this.currentItem[0] && (!p || b(this.positionAbs.top + this.offset.click.top, this.items[g].top, this.items[g].height)) && (n = this.items[g].item.offset()[k], o = !1, Math.abs(n - m) > Math.abs(n + this.items[g][l] - m) && (o = !0, n += this.items[g][l]), h > Math.abs(n - m) && (h = Math.abs(n - m), j = this.items[g], this.direction = o ? "up" : "down"));
        if (!j && !this.options.dropOnEmpty)return;
        if (this.currentContainer === this.containers[r])return;
        j ? this._rearrange(d, j, null, !0) : this._rearrange(d, null, this.containers[r].element, !0), this._trigger("change", d, this._uiHash()), this.containers[r]._trigger("change", d, this._uiHash(this)), this.currentContainer = this.containers[r], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", d, this._uiHash(this)), this.containers[r].containerCache.over = 1
      }
    },
    _createHelper: function (b) {
      var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
      return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css("position"),
        top: this.currentItem.css("top"),
        left: this.currentItem.css("left")
      }), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
    },
    _adjustOffsetFromHelper: function (b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function () {
      if ("relative" === this.cssPosition) {
        var a = this.currentItem.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {top: 0, left: 0}
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      }
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    },
    _setContainment: function () {
      var b, c, d, e = this.options;
      "parent" === e.containment && (e.containment = this.helper[0].parentNode), ("document" === e.containment || "window" === e.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
    },
    _convertPositionTo: function (b, c) {
      c || (c = this.position);
      var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, f = /(html|body)/i.test(e[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
      }
    },
    _generatePosition: function (b) {
      var c, d, e = this.options, f = b.pageX, g = b.pageY, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(h[0].tagName);
      return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
      }
    },
    _rearrange: function (a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this.counter;
      this._delay(function () {
        e === this.counter && this.refreshPositions(!d)
      })
    },
    _clear: function (a, b) {
      function c(a, b, c) {
        return function (d) {
          c._trigger(a, d, b._uiHash(b))
        }
      }

      this.reverting = !1;
      var d, e = [];
      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (d in this._storedCSS)("auto" === this._storedCSS[d] || "static" === this._storedCSS[d]) && (this._storedCSS[d] = "");
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
      } else this.currentItem.show();
      for (this.fromOutside && !b && e.push(function (a) {
        this._trigger("receive", a, this._uiHash(this.fromOutside))
      }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || e.push(function (a) {
        this._trigger("update", a, this._uiHash())
      }), this !== this.currentContainer && (b || (e.push(function (a) {
        this._trigger("remove", a, this._uiHash())
      }), e.push(function (a) {
        return function (b) {
          a._trigger("receive", b, this._uiHash(this))
        }
      }.call(this, this.currentContainer)), e.push(function (a) {
        return function (b) {
          a._trigger("update", b, this._uiHash(this))
        }
      }.call(this, this.currentContainer)))), d = this.containers.length - 1; d >= 0; d--)b || e.push(c("deactivate", this, this.containers[d])), this.containers[d].containerCache.over && (e.push(c("out", this, this.containers[d])), this.containers[d].containerCache.over = 0);
      if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
        if (!b) {
          for (this._trigger("beforeStop", a, this._uiHash()), d = 0; e.length > d; d++)e[d].call(this, a);
          this._trigger("stop", a, this._uiHash())
        }
        return this.fromOutside = !1, !1
      }
      if (b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !b) {
        for (d = 0; e.length > d; d++)e[d].call(this, a);
        this._trigger("stop", a, this._uiHash())
      }
      return this.fromOutside = !1, !0
    },
    _trigger: function () {
      a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    },
    _uiHash: function (b) {
      var c = b || this;
      return {
        helper: c.helper,
        placeholder: c.placeholder || a([]),
        position: c.position,
        originalPosition: c.originalPosition,
        offset: c.positionAbs,
        item: c.currentItem,
        sender: b ? b.element : null
      }
    }
  })
}(jQuery), function (a) {
  a.browserTest = function (b, c) {
    var d = "unknown", e = "X", f = function (a, b) {
      for (var c = 0; c < b.length; c = c + 1)a = a.replace(b[c][0], b[c][1]);
      return a
    }, g = function (b, c, g, h) {
      var i = {name: f((c.exec(b) || [d, d])[1], g)};
      i[i.name] = !0, i.version = (h.exec(b) || [e, e, e, e])[3], i.name.match(/safari/) && i.version > 400 && (i.version = "2.0"), i.name === "presto" && (i.version = a.browser.version > 9.27 ? "futhark" : "linear_b"), i.versionNumber = parseFloat(i.version, 10) || 0, i.versionX = i.version !== e ? (i.version + "").substr(0, 1) : e, i.className = i.name + i.versionX;
      return i
    };
    b = (b.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? f(b, [[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""], ["Chrome Safari", "Chrome"], ["KHTML", "Konqueror"], ["Minefield", "Firefox"], ["Navigator", "Netscape"]]) : b).toLowerCase(), a.browser = a.extend(c ? {} : a.browser, g(b, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/)), a.layout = g(b, /(gecko|konqueror|msie|opera|webkit)/, [["konqueror", "khtml"], ["msie", "trident"], ["opera", "presto"]], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/), a.os = {name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [d])[0].replace("sunos", "solaris")}, c || a("html").addClass([a.os.name, a.browser.name, a.browser.className, a.layout.name, a.layout.className].join(" "))
  }, a.browserTest(navigator.userAgent)
}(jQuery), function (a) {
  a.fn.popover = function (b) {
    var c = {
      openEvent: null,
      closeEvent: null,
      offsetX: 0,
      offsetY: 0
    }, b = a.extend(c, b), d = a(b.header).detach(), e = a(b.content).detach(), f = a('<div class="popover"><div class="triangle"></div><div class="header"></div><div class="content"></div></div>');
    f.appendTo("body"), a(".header", f).append(d), a(".content", f).append(e), a.fn.popover.openedPopup && a.fn.popover.openedPopup.trigger("hidePopover"), a.fn.popover.openedPopup = null, a(document).bind("click", function (b) {
      a.fn.popover.openedPopup != null && a(b.target).parents(".popover").length === 0 && !a(b.target).hasClass("popover-button") && a.fn.popover.openedPopup.trigger("hidePopover")
    });
    var g = function (c) {
      if (a.fn.popover.openedPopup === c) {
        a.fn.popover.openedPopup.trigger("hidePopover");
        return !1
      }
      a.fn.popover.openedPopup != null && a.fn.popover.openedPopup.trigger("hidePopover");
      var d = a(".triangle", f).click(function () {
        c.trigger("hidePopover")
      });
      f.css("display", "block");
      var e = 0, g = 0, h = a(document).width(), i = a(document).height(), j = parseInt(d.css("border-bottom-width")), k = f.outerWidth(!1), l = f.outerHeight(!1), m = c.outerWidth(!1), n = c.outerHeight(!1), o = c.offset();
      g = o.top + n + j;
      var p = i - (g + l + j), q = 18;
      e = o.left + (m - k) / 2;
      var r = 0;
      e < q ? r = e - q : e + k > h && (r = e + k - h + q), d.css("right", k / 2 - j + r), f.offset({
        top: g + b.offsetY,
        left: e - r + b.offsetX
      }), f.show(), window.setTimeout(function () {
        f.addClass("active"), jQuery(window).resize()
      }, 0), a.isFunction(b.openEvent) && b.openEvent(), a.fn.popover.openedPopup = c, c.addClass("popover-on");
      return !1
    };
    this.each(function () {
      var c = a(this);
      c.addClass("popover-button"), c.bind("showPopover", function () {
        g(c)
      }), c.bind("hidePopover", function () {
        c.removeClass("popover-on"), f.removeClass("active").attr("style", "").css("display", "none"), a.isFunction(b.closeEvent) && b.closeEvent(), a.fn.popover.openedPopup = null, a(".fh_content", f).empty(), window.setTimeout(function () {
          jQuery(window).resize()
        }, 0), window.fb_frame && typeof FB != "undefined" && FB.Canvas && (FB.Canvas.setSize({height: 1e3}), setTimeout(function () {
          FB.Canvas.setSize()
        }, 100));
        return !1
      })
    })
  }
}(jQuery);
var JSON;
JSON || (JSON = {}), function () {
  function str(a, b) {
    var c, d, e, f, g = gap, h, i = b[a];
    i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)), typeof rep == "function" && (i = rep.call(b, a, i));
    switch (typeof i) {
      case"string":
        return quote(i);
      case"number":
        return isFinite(i) ? String(i) : "null";
      case"boolean":
      case"null":
        return String(i);
      case"object":
        if (!i)return "null";
        gap += indent, h = [];
        if (Object.prototype.toString.apply(i) === "[object Array]") {
          f = i.length;
          for (c = 0; c < f; c += 1)h[c] = str(c, i) || "null";
          e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g;
          return e
        }
        if (rep && typeof rep == "object") {
          f = rep.length;
          for (c = 0; c < f; c += 1)typeof rep[c] == "string" && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e))
        } else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
        e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g;
        return e
    }
  }

  function quote(a) {
    escapable.lastIndex = 0;
    return escapable.test(a) ? '"' + a.replace(escapable, function (a) {
      var b = meta[a];
      return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + a + '"'
  }

  function f(a) {
    return a < 10 ? "0" + a : a
  }

  "use strict", typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (a) {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
    return this.valueOf()
  });
  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  }, rep;
  typeof JSON.stringify != "function" && (JSON.stringify = function (a, b, c) {
    var d;
    gap = "", indent = "";
    if (typeof c == "number")for (d = 0; d < c; d += 1)indent += " "; else typeof c == "string" && (indent = c);
    rep = b;
    if (b && typeof b != "function" && (typeof b != "object" || typeof b.length != "number"))throw new Error("JSON.stringify");
    return str("", {"": a})
  }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
    function walk(a, b) {
      var c, d, e = a[b];
      if (e && typeof e == "object")for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
      return reviver.call(a, b, e)
    }

    var j;
    text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }));
    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@"
      ).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      j = eval("(" + text + ")");
      return typeof reviver == "function" ? walk({"": j}, "") : j
    }
    throw new SyntaxError("JSON.parse")
  })
}();
var Gcv = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (a) {
    var b = "", c, d, e, f, g, h, i, j = 0;
    a = Gcv._utf8_encode(a);
    while (j < a.length)c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = a.charCodeAt(j++), f = c >> 2, g = (c & 3) << 4 | d >> 4, h = (d & 15) << 2 | e >> 6, i = e & 63, isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64), b = b + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h) + this._keyStr.charAt(i);
    return b
  }, _utf8_encode: function (a) {
    a = a.replace(/\r\n/g, "\n");
    var b = "";
    for (var c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(d & 63 | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(d & 63 | 128))
    }
    return b
  }
};
Hs.prototype.cache_enabled = function () {
  return supports_local_storage() && window.fb_frame
}, Hs.prototype.clear_cache = function () {
  this.inventory = {}, this.equipment = {}, this.skills = {}
}, Hs.prototype.check_inventory_updates = function (a, b) {
  var c = !1;
  if (a) {
    for (item_name in b)a[item_name] == undefined && (b[item_name].s = "del", b[item_name].pos = -1, c = !0);
    for (new_item_name in a)new_item_obj = a[new_item_name], old_item_obj = b[new_item_name], old_item_obj ? (old_item_obj.pos = new_item_obj.pos, new_item_obj.cnt != old_item_obj.cnt && (old_item_obj.s = "upd", old_item_obj.cnt = new_item_obj.cnt, c = !0)) : (b[new_item_name] = new_item_obj, b[new_item_name].name = new_item_name, b[new_item_name].s = "add", c = !0)
  }
  return c
}, Hs.prototype.inventory_post_update = function (a) {
  var b = {};
  for (item_name in a) {
    var c = a[item_name];
    c && (c.s == "del" || c.s == "deleting" ? (delete a[c.name], c = null) : c.s == "processed" && delete c.s, c && (b[item_name] = my_clone(c), delete b[item_name].li))
  }
  this.cache_enabled() && localStorage.setItem("fb_inv", JSON.stringify(b))
}, Hs.prototype.check_diary_updates = function (a, b) {
  var c = !1;
  if (a) {
    var d = {}, e = 0;
    for (var f in a) {
      e++;
      var g = a[f];
      d[g.msg + g.time] = g, d[g.msg + g.time].pos = f;
      if (g.arena) {
        var h = a[parseInt(f) + 1];
        h ? g.arena != h.arena && (d[g.msg + g.time].separate = !0) : d[g.msg + g.time].separate = !0
      }
      var i = null, j = !1;
      f > 0 ? (i = a[parseInt(f) - 1], i != null && (g.arena != i.arena ? j = !0 : g.arena == undefined && (j = !0))) : j = !0, j && (d[g.msg + g.time].first = !0)
    }
    this.diary_l = e;
    for (var k in b) {
      var g = b[k];
      d[k] == undefined && (g.s = "del", g.pos = -1, c = !0)
    }
    for (var k in d) {
      var l = d[k], m = b[k];
      m ? (m.pos = l.pos, l.voice_id != m.voice_id && (m.voice_id = l.voice_id, m.s = "upd", c = !0), l.uph_v != m.uph_v && (m.uph_v = l.uph_v, m.s = "upd", c = !0)) : (b[k] = l, b[k].s = "add", c = !0)
    }
  }
  return c
}, Hs.prototype.check_for_differences = function (a, b, c, d, e, f, g) {
  for (idx in b) {
    var h = b[idx];
    if (a[h] != undefined)if (c[h]) {
      if (c[h].value == undefined || c[h].value != a[h])c[h].value = a[h], g && (c[h].s = "upd"), d.push(f + h)
    } else c[h] = {value: a[h], name: h, p: f}, g && (c[h].s = "upd"), e.push(f + h)
  }
}, Hs.prototype.check_opps_update = function (a, b) {
  var c = !1;
  if (a) {
    for (internal_id in b)a[internal_id] == undefined && (b[internal_id].s = "del", c = !0);
    for (internal_id in a) {
      new_item_obj = a[internal_id], old_item_obj = b[internal_id];
      if (old_item_obj) {
        old_item_obj.pos = new_item_obj.pos;
        if (new_item_obj.hp != old_item_obj.hp || new_item_obj.fight_end != old_item_obj.fight_end)old_item_obj.s = "upd", old_item_obj.hp = new_item_obj.hp, old_item_obj.fight_end = new_item_obj.fight_end, c = !0
      } else b[internal_id] = new_item_obj, b[internal_id].s = "add", c = !0
    }
  }
  return c
}, Hs.prototype.check_equip_update = function (a, b) {
  var c = !1;
  if (a) {
    var d = ["arms", "body", "head", "legs", "shield", "talisman", "weapon"];
    for (idx in d) {
      var e = d[idx], f = a[e];
      if (b[e] == undefined)b[e] = f, b[e].s = "upd", c = !0; else {
        var g = b[e];
        if (g.level != f.level || g.name != f.name)b[e].level = f.level, b[e].name = f.name, b[e].s = "upd", c = !0
      }
    }
  }
  return c
}, Hs.prototype.equipment_post_update = function (a) {
  var b = ["arms", "body", "head", "legs", "shield", "talisman", "weapon"];
  for (idx in b) {
    var c = b[idx], d = a[c];
    d && d.s == "processed" && delete d.s
  }
  this.cache_enabled() && localStorage.setItem("fb_equip", JSON.stringify(a))
}, Hs.prototype.check_skills_update = function (a, b) {
  var c = !1;
  if (a) {
    a.sort(function (a, b) {
      return a.level == b.level ? 0 : a.level < b.level ? 1 : -1
    });
    var d = {};
    for (idx in a) {
      var e = a[idx];
      e.pos = idx, d[e.name] = e
    }
    for (skill_name in b) {
      var f = b[skill_name];
      d[skill_name] == undefined && (f.s = "del", f.pos = -1, c = !0)
    }
    for (new_skill_name in d) {
      var g = d[new_skill_name], f = b[new_skill_name];
      if (f) {
        if (g.pos != f.pos || g.level != f.level || g.type != f.type)f.s = "upd", f.pos = g.pos, f.level = g.level, f.type = g.type, c = !0
      } else b[new_skill_name] = g, b[new_skill_name].name = new_skill_name, b[new_skill_name].s = "add", c = !0
    }
  }
  return c
}, Hs.prototype.skills_post_update = function (a) {
  var b = {};
  for (var c in a) {
    var d = a[c];
    d && (d.s == "del" || d.s == "deleting" ? (delete a[d.name], d = null) : d.s == "processed" && delete d.s, d && (b[c] = my_clone(d), delete b[c].li, delete b[c].span))
  }
  this.cache_enabled() && localStorage.setItem("fb_skills", JSON.stringify(b))
}, Hs.prototype.stats_post_update = function () {
  var a = [];
  for (var b in this.pet_keys) {
    var c = this.pet_keys[b];
    this.pet[c] && this.pet[c].s == "processed" && delete this.pet[c].s;
    var d = my_clone(this.pet[c]);
    d && this.cache_enabled() && localStorage.setItem("fb_p_" + c, JSON.stringify(d))
  }
}, Hs.prototype.diary_i_post_update = function () {
  diary2 = {};
  for (var a in this.diary_i) {
    var b = this.diary_i[a];
    b && (b.s == "processed" ? delete b.s : (b.s == "del" || b.s == "deleting") && delete this.diary_i[a]), b && (diary2[a] = my_clone(b), delete diary2[a].li)
  }
  supports_local_storage() && localStorage.setItem("d_i", JSON.stringify(diary2))
}, Hs.prototype.data_update = function (a) {
  if (a && a.status == "error") {
    this.search1 = Loc.h_search_default;
    return {expired: !0}
  }
  var b = [], c = [], d = [], e = !1;
  if (a && a.ctime) {
    var f = new Date;
    f.setISO8601(a.ctime);
    var g = new Date;
    window.time_diff = g.getTime() - f.getTime()
  }
  var h = a.hero;
  if (h) {
    if (!window.hgender && h.gender || window.hgender != h.gender) {
      window.hgender = h.gender;
      for (key in Loc)if (key && Loc[key]) {
        var i = genderize(h.gender, Loc[key]);
        i != Loc[key] && (Loc[key] = i)
      }
    }
    h.bricks_cnt && h.bricks_cnt == 0 && delete h.bricks_cnt, h.monster_name === null && this.stats.monster_name && (this.stats.monster_name = "", c.push("monster_name")), h.aura_name === null && this.stats.aura_name && (this.stats.aura_name = "", c.push("aura_name")), h.arena_fight != undefined && this.stats.arena_fight != undefined && h.arena_fight != this.stats.arena_fight.value && (e = !0), h.fight_type != undefined && this.stats.fight_type != undefined && h.fight_type != this.stats.fight_type.value && (e = !0), this.check_for_differences(h, this.stats_keys, this.stats, c, b, "", !1)
  }
  this.godname() != this.godn && supports_local_storage() && (this.godn = this.godname(), localStorage.setItem("fb_gn", JSON.stringify(this.godname())), this.cache_enabled() && (this.clear_cache(), c.push("reset")), this.diary_i = {}), this.check_inventory_updates(a.inventory, this.inventory) && c.push("inventory"), this.check_diary_updates(a.diary, this.diary) && c.push("diary"), this.check_diary_updates(a.imp_e, this.diary_i) && c.push("diary_i"), a.news_from_field && a.news_from_field.msg != this.last_news.value && (this.last_news.value = a.news_from_field.msg, c.push("news")), a.has_pet != undefined && a.has_pet != this.has_pet && (this.has_pet = a.has_pet, c.push("has_pet")), a.pet && this.check_for_differences(a.pet, this.pet_keys, this.pet, c, b, "", !0), this.check_equip_update(a.equipment, this.equipment) && c.push("equipment"), this.check_skills_update(a.skills, this.skills) && c.push("skills"), a && a.opponent && (a.opponent.hero && this.check_for_differences(a.opponent.hero, this.stats_keys, this.o_stats, c, b, "o_", !1), this.check_equip_update(a.opponent.equipment, this.o_equipment) && c.push("o_equipment"), this.check_inventory_updates(a.opponent.inventory, this.o_inventory) && c.push("o_inventory")), a && a.alls && this.check_opps_update(a.alls, this.alls) && c.push("alls"), a && a.opps && this.check_opps_update(a.opps, this.opps) && c.push("opps"), a.dmap && (this.d_map = a.dmap, c.push("d_map")), a.pets && (this.pets = a.pets), a && a.arena_fight_log && this.check_diary_updates(a.arena_fight_log, this.a_fight_log) && c.push("m_fight_log"), this.is_fighting() && (c = subtract_arrays(c, ["arena_send_after", "turn_progress", "chfr_after", "d_send_after"]));
  var j = {"new": b, updated: c, deleted: d, new_state: a};
  a.hero && a.hero.expired != undefined && (j.expired = a.hero.expired, a.hero.search1 && (this.search1 = a.hero.search1)), e && (j.arena_fight = a.hero.arena_fight, j.fight_type = a.hero.fight_type);
  return j
}, Hs.prototype.check_lbp_update = function (a) {
  if (a) {
    var b = !0;
    if (this.lbp == undefined || this.lbp == a)b = !1;
    this.lbp = a, localStorage.setItem("lbp", a);
    return b
  }
  return !1
}, Hs.prototype.post_data_update = function () {
  this.inventory_post_update(this.inventory), this.equipment_post_update(this.equipment), this.skills_post_update(this.skills), this.stats_post_update(), this.diary_i_post_update(), this.is_fighting() && (this.inventory_post_update(this.o_inventory), this.equipment_post_update(this.o_equipment), this.skills_post_update(this.o_skills))
}, Hs.prototype.post_data_update_by_type = function (a) {
  a == "inv" ? this.inventory_post_update(this.inventory) : a == "skills" ? this.skills_post_update(this.skills) : a == "equip" ? this.equipment_post_update(this.equipment) : a == "pet" && this.stats_post_update()
}, Hs.prototype.godname = function () {
  return this.stats.godname && this.stats.godname.value ? this.stats.godname.value : ""
}, Hs.prototype.is_fighting = function () {
  return this.stats.arena_fight && this.stats.arena_fight.value ? !0 : !1
}, Hs.prototype.level = function () {
  return this.stats.level && this.stats.level.value ? this.stats.level.value : 1
}, Hs.prototype.health = function () {
  return this.stats.health && this.stats.health.value ? this.stats.health.value : 0
}, Hs.prototype.max_health = function () {
  return this.stats.max_health && this.stats.max_health.value ? this.stats.max_health.value : 0
}, Hs.prototype.inventory_num = function () {
  return this.stats.inventory_num && this.stats.inventory_num.value ? this.stats.inventory_num.value : 0
}, Hs.prototype.inventory_max_num = function () {
  return this.stats.inventory_max_num && this.stats.inventory_max_num.value ? this.stats.inventory_max_num.value : 0
}, Hs.prototype.bricks_cnt = function () {
  return this.stats.bricks_cnt && this.stats.bricks_cnt.value ? this.stats.bricks_cnt.value : 0
}, Hs.prototype.o_health = function () {
  return this.o_stats.health && this.o_stats.health.value ? this.o_stats.health.value : 0
}, Hs.prototype.o_max_health = function () {
  return this.o_stats.max_health && this.o_stats.max_health.value ? this.o_stats.max_health.value : 0
}, Hs.prototype.o_inventory_num = function () {
  return this.o_stats.inventory_num && this.o_stats.inventory_num.value ? this.o_stats.inventory_num.value : 0
}, Hs.prototype.o_inventory_max_num = function () {
  return this.o_stats.inventory_max_num && this.o_stats.inventory_max_num.value ? this.o_stats.inventory_max_num.value : 0
}, Hs.prototype.inventory_calc_num = function (a) {
  var b = 0;
  for (var c in a)b = b + 1;
  return b
}, Hs.prototype.aura_name = function () {
  return this.stats.aura_name && this.stats.aura_name.value ? this.stats.aura_name.value : ""
}, Hs.prototype.godpower = function () {
  return this.stats.godpower && this.stats.godpower.value ? this.stats.godpower.value : 0
}, Hs.prototype.max_gp = function () {
  return this.stats.max_gp && this.stats.max_gp.value ? this.stats.max_gp.value : 100
}, Hs.prototype.arena_step_count = function () {
  return this.stats.arena_step_count && this.stats.arena_step_count.value ? this.stats.arena_step_count.value : 0
}, Hs.prototype.accumulator = function () {
  return this.stats.accumulator && this.stats.accumulator.value ? this.stats.accumulator.value : 0
}, Hs.prototype.guild = function () {
  return this.stats.clan && this.stats.clan.value ? this.stats.clan.value : ""
}, Hs.prototype.arena_cmd_left = function () {
  return this.stats.arena_cmd_left && this.stats.arena_cmd_left.value >= 0 ? this.stats.arena_cmd_left.value : -1
}, Hs.prototype.fight_type = function () {
  return this.stats.fight_type && this.stats.fight_type.value ? this.stats.fight_type.value : ""
}, Hs.prototype.going_back = function () {
  return this.stats.dir && this.stats.dir.value && this.stats.dir.value == "tt" ? !0 : !1
}, Hs.prototype.arena_available = function () {
  return this.stats.is_arena_available.value && this.stats.is_arena_available.value == !0 ? !0 : !1
}, Hs.prototype.dungeon_available = function () {
  return this.stats.d_a && this.stats.d_a.value && this.stats.d_a.value == !0 ? !0 : !1
}, Hs.prototype.chf_available = function () {
  return this.stats.is_chf_available.value && this.stats.is_chf_available.value == !0 ? !0 : !1
}, Hs.prototype.chf_pending = function () {
  return this.stats.chf_pending && this.stats.chf_pending.value && this.stats.chf_pending.value != "" ? this.stats.chf_pending.value : null
}, Hs.prototype.arena_disabled = function () {
  return this.stats.is_arena_disabled.value && this.stats.is_arena_disabled.value == !0 ? !0 : !1
}, Hs.prototype.trader_av = function () {
  return this.stats.trader_av && this.stats.trader_av.value && this.stats.trader_av.value == !0 ? !0 : !1
}, Hs.prototype.shop_rename = function () {
  return this.stats.shop_rename && this.stats.shop_rename.value && this.stats.shop_rename.value == !0 ? !0 : !1
}, Hs.prototype.ggender = function () {
  return this.stats.ggender.value && this.stats.ggender.value == "female" ? "f" : "m"
}, Hs.prototype.invites_left = function () {
  return this.stats.invites_left && this.stats.invites_left.value ? this.stats.invites_left.value : 0
}, Hs.prototype.wood_cnt = function () {
  if (this.stats.wood && this.stats.wood.value) {
    var a = this.stats.wood.value, b = parseFloat(a.substring(0, a.length - 1)) * 10;
    return b
  }
  return 0
}, Hs.prototype.a_cmd = function () {
  return this.stats.a_cmd && this.stats.a_cmd.value ? !0 : !1
}, Hs.prototype.t_cmd = function () {
  return this.stats.t_cmd && this.stats.t_cmd.value ? this.stats.t_cmd.value : 0
}, Hs.prototype.pets_max = function () {
  return this.stats.pets_max && this.stats.pets_max.value ? this.stats.pets_max.value : 0
}, Hs.prototype.gold = function () {
  return this.stats.gold && this.stats.gold.value ? this.stats.gold.value : 0
}, Hs.prototype.o_gold = function () {
  return this.o_stats.gold && this.o_stats.gold.value ? this.o_stats.gold.value : 0
}, Hs.prototype.get_diary_i_cnt = function () {
  cnt = 0;
  for (var a in this.diary_i)cnt += 1;
  return cnt
}, Hs.prototype.get_new_by_type = function (a) {
  if (this.cache_enabled() == !1)return 0;
  var b = 0;
  if (a == "inv")for (var c in this.inventory) {
    var d = this.inventory[c];
    d && d.s && d.s != "processed" && d.s != "del" && d.s != "deleting" && (b += 1)
  } else if (a == "skills")for (var c in this.skills) {
    var d = this.skills[c];
    d && d.s && d.s != "processed" && d.s != "del" && d.s != "deleting" && (b += 1)
  } else if (a == "equip") {
    var e = ["arms", "body", "head", "legs", "shield", "talisman", "weapon"];
    for (var f in e) {
      var g = e[f], d = this.equipment[g];
      d && d.s && d.level != null && d.s != "processed" && (b += 1)
    }
  } else if (a == "pet")for (var f in this.pet_keys) {
    var g = this.pet_keys[f];
    g != "pet_class" && g != "pet_special" && this.pet[g] && this.pet[g].s && this.pet[g].s != "processed" && (b += 1)
  } else if (a == "diary_i")for (var g in this.diary_i) {
    var h = this.diary_i[g];
    h && h.s && h.s == "add" && (b += 1)
  }
  return b
};
var keys_to_n = {
  exp_progress: "level",
  max_health: "health",
  inventory_max_num: "inventory_num",
  quest_progress: "quest",
  quests_completed: "quest",
  win_lost: ["arena_won", "arena_lost"],
  temple_completed_at: "bricks_cnt",
  health: "control",
  dir: "distance",
  c_town: "distance",
  t_level_pr: "t_level",
  t_cmd: "news",
  godpower: ["control", "inventory", "store_pet"],
  monster_name: "news",
  monster_progress: "news",
  s_progress: "news",
  town_name: "distance",
  aura_time: "aura_name",
  diary: "control",
  is_arena_disabled: "control",
  is_arena_available: "control",
  chfr_after: "control",
  arena_send_after: "control",
  arena_god_cmd_disabled: "control",
  arena_fight: "control",
  accumulator: "control",
  arena_cmd_left: "control",
  clan_position: "clan",
  pet: ["pet_birthday_string", "pet_level", "pet_class", "pet_is_dead", "pet_is_dead_str", "pet_name", "pet_special"],
  pet_is_dead: "pet_is_dead_str",
  m_fight_log: ["control", "turn_progress"],
  wood: "store_pet",
  a_cmd: "store_pet"
};
NM.prototype.register = function (a, b) {
  this.bindings[a] == undefined && (this.bindings[a] = []), this.bindings[a].push(b);
  return b
}, NM.prototype.unregister = function (a) {
  this.bindings[a] = undefined
}, NM.prototype.unregister_key_for_object = function (a, b) {
  for (var c in this.bindings[a])this.bindings[a][c] == b && this.bindings[a].splice(c, 1);
  this.bindings[a] && this.bindings[a].length == 0 && (this.bindings[a] = undefined)
}, NM.prototype.notify_all = function (a) {
  this.called = {};
  for (var b in a) {
    var c = a[b];
    if (keys_to_n[c]) {
      var d = keys_to_n[c];
      if (Object.prototype.toString.call(d) === "[object Array]")for (key_idx in d) {
        var e = d[key_idx];
        this.notify(e)
      } else this.notify(d)
    }
    this.notify(c)
  }
}, NM.prototype.notify = function (a) {
  if (this.bindings[a])for (idx in this.bindings[a]) {
    var b = this.bindings[a][idx];
    gv_log("notifying " + a);
    if (b)if (b && b.attr) {
      var c = b.attr("id");
      c ? this.called[c] || (b.update(), this.called[c] = !0) : b.update()
    } else b.update()
  }
}, Hints.prototype.show_hints = function (a, b) {
  for (idx in a) {
    var c = a[idx];
    this.hints[c] == undefined && b[c] && (this.hints[c] = b[c], this.hints[c]["new"] = !0, this.new_hints.push(c))
  }
  this.show_by_id(this.new_hints[0], 0)
}, Hints.prototype.show_blog_notifs = function (a) {
  this.hint_displayed ? (this.prev_button.hide(), this.next_button.hide()) : this.blog_close == undefined && (this.blog_close = $('<span class="div_link hint_link"></span>').html(Loc.hint_close).appendTo($("#hint_controls")), ref = this, this.blog_close.click(function () {
    $("#hint_bar").slideUp(), ref.blog_hint_displayed = !1, ref.blog_close.remove(), ref.blog_close = undefined
  }), $("#hint_bar").slideDown()), $("#hint_faq").hide(), $("#hint_capt").html(Loc.blog_notif_capt), $("#hint_content").html(localize(Loc.blog_notif_message, {id: a})), this.blog_hint_displayed = !0
}, Hints.prototype.mark_as_known = function (a) {
  gv_log(a), $.post(base_api_url, {
    a: get_cmd_id("Bja2XQ1F4t9uo9YNkrTH"),
    b: prepare_args(JSON.stringify(a))
  }, function (a) {
    $("#hint_bar").slideUp(), this.hint_displayed = !1
  });
  var b = [];
  for (idx in this.new_hints) {
    var c = this.new_hints[idx];
    this.hints[c] && this.hints[c]["new"] == !0 && b.push(c)
  }
  this.new_hints = b
}, Hints.prototype.show_by_id = function (a, b) {
  if (this.new_hints.length > 0) {
    this.blog_hint_displayed && (this.blog_hint_displayed = !1, this.blog_close.remove(), this.blog_close = undefined);
    var c = $("#hint_bar"), d = $("#hint_capt"), e = $("#hint_content"), f = this.hints[a].capt;
    this.new_hints.length > 1 && (f += " " + (b + 1) + "/" + this.new_hints.length);
    var g = this.hints[a].msg;
    this.hints[a].url ? $("#hint_faq").show().html(localize(Loc.hints_more_link, {url: this.hints[a].url})) : $("#hint_faq").show().html(Loc.hints_faq_link), this.hints[a]["new"] = !1, d.html(f), e.html(g);
    var h = this;
    h.current_idx = b, this.hint_displayed = !0, this.prev_button == undefined && (this.prev_button = $("#h_prev").html(Loc.hint_prev), this.prev_button.click(function () {
      h.current_idx > 0 && h.show_by_id(h.new_hints[h.current_idx - 1], h.current_idx - 1)
    })), this.close_button == undefined && (this.close_button = $('<span class="div_link hint_link"></span>').html(Loc.hint_close).appendTo($("#hint_controls")), this.close_button.click(function () {
      if (h.blog_hint_displayed == !0)h.blog_hint_displayed = !1, h.show_by_id(h.new_hints[h.current_idx], h.current_idx); else {
        var b = [];
        for (a in h.hints)h.hints[a]["new"] == !1 && b.push(a);
        h.mark_as_known(h.new_hints)
      }
    })), this.next_button == undefined && (this.next_button = $("#h_next").html(Loc.hint_next), this.next_button.click(function () {
      h.current_idx + 1 < h.new_hints.length && h.show_by_id(h.new_hints[h.current_idx + 1], h.current_idx + 1)
    })), this.new_hints.length == 1 ? (this.prev_button.hide(), this.next_button.hide()) : (this.prev_button.show(), this.next_button.show(), h.current_idx == 0 ? this.prev_button.removeClass("div_link") : this.prev_button.addClass("div_link"), h.current_idx + 1 == this.new_hints.length ? this.next_button.removeClass("div_link") : this.next_button.addClass("div_link")), c.css("display") == "none" && c.slideDown()
  }
}, Ach.prototype.diff_hashes = function (a) {
  if (hash_keys(a).length != hash_keys(this.messages).length) {
    this.messages = my_clone(a);
    return !0
  }
  for (var b in a)if (this.messages[b] == undefined) {
    this.messages = my_clone(a);
    return !0
  }
  return !1
}, Ach.prototype.show_all = function (a, b, c) {
  a.length == 1 ? this.show_one(a, b, c) : this.diff_hashes(b) && this.show_multiple(a, b, c)
}, Ach.prototype.show_one = function (a, b, c) {
  var d = a.splice(0, 1)[0];
  if (d && b[d].title && b[d].desc && b[d].title.length > 0 && b[d].desc.length > 0) {
    var e = Loc["ach_title" + b[d].rank], f = "";
    e && (f = e);
    var g;
    f != "" ? g = localize(Loc.ach_title, {
      title: b[d].title,
      rank: f
    }) : g = b[d].title, $("#ach_capt").html(localize(Loc.new_ach_title_t, {title: g})), $("#ach_content").empty(), $("#ach_content").append($('<div class="ach_l"</div>>').html(b[d].desc));
    var h = $("#ach_c");
    h.unbind("click"), h.addClass("div_link"), h.html(Loc.hint_close);
    var i = this;
    h.click(function (a) {
      $.post(base_api_url, {
        a: get_cmd_id("dg3yOKCzGwdKvsTOtdt4"),
        b: prepare_args(JSON.stringify({ids: [d].concat(c)}))
      }, function (a) {
        a && a.status == "success" && ($("#ach_bar").slideUp(), this.messages = {})
      })
    });
    if (window.fbe && Loc.locale == "en") {
      var j = $("#ach_tf");
      j.unbind("click"), j.addClass("div_link"), j.html(Loc.ach_fb_share), j.click(HFB.diary_click_f(localize(Loc.ach_fb_sh, {
        rank: e,
        title: b[d].title
      })))
    }
    $("#ach_bar").slideDown()
  }
}, Ach.prototype.show_multiple = function (a, b, c) {
  $("#ach_capt").html(Loc.new_ach_title);
  var d = $("#ach_content");
  d.empty();
  for (var e in a) {
    var f = a[e];
    if (b[f].title && b[f].desc) {
      var g = $('<div class="ach_l"></div>').appendTo(d), h = Loc["ach_title" + b[f].rank], i = "";
      h && (i = h);
      var j;
      i != "" ? j = localize(Loc.ach_title, {title: b[f].title, rank: i}) : j = b[f].title;
      var j = localize(Loc.ach_title, {title: b[f].title, rank: i});
      $('<div class="ach_h"></div>').html(j).appendTo(g), $('<div class="ach_d"></div>').html(b[f].desc).appendTo(g)
    }
  }
  var k = $("#ach_c");
  k.addClass("div_link"), k.html(Loc.hint_close);
  var l = this;
  k.unbind("click"), k.click(function (b) {
    var d = a.concat(c);
    $.post(base_api_url, {
      a: get_cmd_id("dg3yOKCzGwdKvsTOtdt4"),
      b: prepare_args(JSON.stringify({ids: d}))
    }, function (a) {
      a && a.status == "success" && $("#ach_bar").slideUp()
    })
  }), $("#ach_bar").css("display") == "none" ? $("#ach_bar").slideDown() : $("#ach_bar").show()
}, Ach.prototype.filter = function (a, b) {
  var c = {}, d = [];
  for (var e in a)c[a[e]] = !0;
  var f = {
    sk5_2: ["sk5"],
    sk5_3: ["sk5", "sk5_2"],
    sk5_4: ["sk5", "sk5_2", "sk5_3"],
    a10_2: ["a10"],
    a10_3: ["a10", "a10_2"],
    evilm_2: ["evilm"],
    evilm_3: ["evilm", "evilm_2"],
    evilm_4: ["evilm", "evilm_2", "evilm_3"],
    goodm_2: ["goodm"],
    goodm_3: ["goodm", "goodm_2"],
    goodm_4: ["goodm", "goodm_2", "goodm_3"],
    gcard_2: ["gcard"],
    gcard_3: ["gcard", "gcard_2"],
    tmpl: ["tmpl_2", "tmpl_3"],
    tmpl_2: ["tmpl_3"],
    pet: ["pet_2", "pet_3"],
    pet_2: ["pet_3"],
    absnt_2: ["absnt"],
    absnt_3: ["absnt", "absnt_2"],
    absnt_4: ["absnt", "absnt_2", "absnt_3"],
    reglr_2: ["reglr"],
    reglr_3: ["reglr", "reglr_2"],
    reglr_4: ["reglr", "reglr_2", "reglr_3"],
    train_2: ["train"],
    train_3: ["train", "train_2"],
    dth_2: ["dth"],
    dth_3: ["dth", "dth_2"],
    dth_4: ["dth", "dth_2", "dth_3"],
    lfght_2: ["lfght"],
    lfght_3: ["lfght", "lfght_2"],
    dgn_2: ["dgn"],
    dgn_3: ["dgn", "dgn_2"],
    bmk_2: ["bmk"],
    bmk_3: ["bmk", "bmk_2"],
    bmk_4: ["bmk", "bmk_2", "bmk_3"]
  }, g = {};
  for (var e in a) {
    var h = a[e];
    if (f[h])for (var i in f[h]) {
      var j = f[h][i];
      g[j] == undefined && d.push(j), delete c[j]
    }
  }
  for (var h in b)if (f[h])for (var i in f[h]) {
    var j = f[h][i];
    g[j] == undefined && d.push(j), delete c[j]
  }
  var k = [];
  for (var e in a)c[a[e]] && k.push(a[e]);
  return {old: d, "new": k}
}, Messages.prototype.reset_storage = function () {
  gv_log("clearing messages cache"), this.friends = [];
  for (friend_name in this.h_friends)this.h_friends[friend_name].s = "del", this.to_delete.push(friend_name);
  this.nm.notify_all.apply(this.nm, [["messages"]]), this.messages = {}, this.guild_messages = {}, this.guild_message_ids = {}, this.to_delete = [], this.to_update = [], this.h_friends = {}, this.fr_upd_cnt = 0, this.m_id = undefined, this.gc_m_id = undefined, this.godname = "", this.loaded = !1
}, Messages.prototype.save_state = function () {
  this.use_local_storage && (localStorage.setItem("fr_arr" + this.godname, JSON.stringify(this.friends)), localStorage.setItem("fr_h" + this.godname, JSON.stringify(this.h_friends)), localStorage.setItem("fr_up_cnt" + this.godname, JSON.stringify(this.fr_upd_cnt)), localStorage.setItem("fr_mid" + this.godname, JSON.stringify(this.m_id)), gv_log("friends cache updated"))
}, Messages.prototype.save_state_gc = function () {
  this.use_local_storage && localStorage.setItem("gc_mid" + this.godname, JSON.stringify(this.gc_m_id))
}, Messages.prototype.update_friends = function (a) {
  var b = !1, c = {};
  this.fr_upd_cnt = 0;
  for (idx in a)c[a[idx].name] = !0;
  for (friend_name in this.h_friends)c[friend_name] == undefined && (this.h_friends[friend_name].s = "del", delete this.h_friends[friend_name].ms, this.to_delete.push(friend_name), b = !0);
  for (idx in a) {
    friend = a[idx];
    if (this.h_friends[friend.name] == undefined)this.h_friends[friend.name] = friend, this.loaded && (this.h_friends[friend.name].s = "new", this.h_friends[friend.name].ms = "upd"), b = !0, this.clear_msg_for_friend(friend.name); else {
      old_f = this.h_friends[friend.name];
      var d = old_f.msg, e = friend.msg;
      if (d == null && e || d && e == null || d && e && (d.id != e.id || d.read != e.read))this.h_friends[friend.name].msg = friend.msg, this.clear_msg_for_friend(friend.name), this.to_update.push(friend.name), b = !0, d == null && e != null || e && e.read == undefined || d && e && d.read != e.read ? e && d && e.sent_at > d.sent_at || d == null && e != null ? this.h_friends[friend.name].ms = "upd" : e && d && d.read != e.read && friend && friend.name && delete this.h_friends[friend.name].ms : d != null && e == null && friend && friend.name && delete this.h_friends[friend.name].ms
    }
    var f = this.h_friends[friend.name].ms;
    f == "upd" && friend && (gv_log("mark as new from " + friend.name), this.fr_upd_cnt += 1)
  }
  this.friends = a, gv_log(this.h_friends), $(".msg_spinner").hide(), this.loaded = !0, this.nm.notify_all.apply(this.nm, [["messages"]]), b && this.nm.notify_all.apply(this.nm, [["messages_badge"]]), this.save_state()
}, Messages.prototype.check_messages = function (a, b) {
  if (this.m_id != a) {
    this.godname != b && (this.reset_storage(), this.godname = b), this.m_id = a;
    var c = this;
    $.post(base_api_url, {a: get_cmd_id("3hOqa3hA2Gjh7tEWSD5T")}, function (a) {
      a.status == "success" && c.update_friends(a.friends)
    });
    return !0
  }
  return !1
}, Messages.prototype.check_messages_gc = function (a, b, c) {
  var d = this;
  b && b != this.gc_m_id && (this.gc_m_id = b, d.save_state_gc(), this.gc_m_id == a && d.nm.notify_all.apply(d.nm, [["gc_msg_badge"]])), this.gc_m_id != a && (this.new_gc_m_id = a, this.gc_m_id == null && (this.gc_m_id = a, d.save_state_gc()), d.nm.notify_all.apply(d.nm, [["gc_mid"]]), this.get_gc_msg_cnt() > 0 && d.nm.notify_all.apply(d.nm, [["gc_msg_badge"]]))
}, Messages.prototype.load_msg_for_friend = function (a) {
  var b = this;
  this.messages[a] == undefined ? $.post(base_api_url, {
    a: get_cmd_id("KztXWDej9YxdBu0LCMUf"),
    b: prepare_args(JSON.stringify({name: a}))
  }, function (c) {
    c.status == "success" && (c.ug && (b.h_friends[a].ug = c.ug), c.hg && (b.h_friends[a].hg = c.hg), b.h_pages[a] = 1, b.messages[a] = c.msgs.reverse(), b.nm.notify_all.apply(b.nm, [["m_" + a]]))
  }) : b.nm.notify_all.apply(b.nm, [["m_" + a]])
}, Messages.prototype.load_next_page_for_friend = function (a, b) {
  var c = this;
  $.post(base_api_url, {
    a: get_cmd_id("KztXWDej9YxdBu0LCMUf"),
    b: prepare_args(JSON.stringify({name: a, page: b}))
  }, function (d) {
    d.status == "success" && (d.ug && (c.h_friends[a].ug = d.ug), d.hg && (c.h_friends[a].hg = d.hg), d.msgs.length > 0 && (c.h_pages[a] = b), c.messages[a] = d.msgs.reverse().concat(c.messages[a]), c.nm.notify_all.apply(c.nm, [["m_" + a]]))
  })
}, Messages.prototype.mark_as_read = function (a) {
  this.h_friends[a] && this.h_friends[a].ms && this.h_friends[a] && this.h_friends[a].ms == "upd" && (delete this.h_friends[a].ms, this.fr_upd_cnt > 0 && (this.fr_upd_cnt -= 1), this.nm.notify_all.apply(this.nm, [["messages_badge"]]), this.save_state())
}, Messages.prototype.clear_msg_for_friend = function (a) {
  this.h_pages[a] = undefined, this.messages[a] = undefined
}, Messages.prototype.delete_all_msg_for_friend = function (a) {
  this.clear_msg_for_friend(a), this.nm.notify_all.apply(this.nm, [["m_" + a]])
}, Messages.prototype.last_msg_for_friend_author = function (a) {
  var b = this.h_friends[a];
  if (b && b.msg)return b.msg.from;
  return ""
}, Messages.prototype.get_gc_msg_cnt = function () {
  var a = this.gc_m_id, b = this.new_gc_m_id;
  if (b != undefined && a != undefined && b > 0 && a > 0)return b - a;
  return 0
}, Messages.prototype.get_msg_for_friend = function (a) {
  return this.messages[a]
}, Messages.prototype.process_msg_for_guild = function (a, b, c, d) {
  a.guild_messages[b] == undefined && (a.guild_messages[b] = []), d && (this.gc_topic = d);
  if (!(c.length == 0 && a.guild_messages[b].length > 0)) {
    var e = 0;
    for (idx in c) {
      var f = c[idx];
      f.id > e && (e = f.id), a.guild_message_ids[f.id] == undefined && (a.guild_message_ids[f.id] = !0, a.guild_messages[b].push(f))
    }
    a.gc_m_id = a.new_gc_m_id = e, a.nm.notify_all.apply(a.nm, [["gc_" + b]]), a.nm.notify_all.apply(a.nm, [["gc_msg_badge"]]), a.save_state_gc()
  }
}, Messages.prototype.load_msg_for_guild = function (a, b) {
  var c = this;
  if (this.guild_messages[a] == undefined || c.new_gc_m_id != b) {
    var d = {guild: a};
    b && (d.sid = b), this.gc_ext_perms == undefined && (d.perms = "1"), $.ajax({
      type: "POST",
      url: base_api_url,
      data: {a: get_cmd_id("nYrBGlddZVxNgxJLFffQ"), b: prepare_args(JSON.stringify(d))},
      success: function (b) {
        b.status == "success" ? (b.wr_p != undefined && (c.gc_ext_perms = b.ext_p, c.wr_perms = b.wr_p), c.process_msg_for_guild(c, a, b.msg.reverse(), b.t)) : b.status == "error" && b.desc && (c.guild_messages[a] = [], c.guild_message_ids = {}, c.gc_error = b.desc, c.nm.notify_all.apply(c.nm, [["gc_" + a]]))
      },
      error: function (a, b, c) {
      }
    }), $.post(base_api_url, {a: get_cmd_id("nYrBGlddZVxNgxJLFffQ"), b: prepare_args(JSON.stringify(d))}, function (a) {
    });
    return !0
  }
  c.nm.notify_all.apply(c.nm, [["gc_" + a]]);
  return !1
}, Messages.prototype.get_gc_topic = function () {
  return this.gc_topic
}, Messages.prototype.get_msg_for_guild = function (a) {
  return this.guild_messages[a]
}, Pantheons.prototype.load_old = function () {
  this.old_pantheons = localStorage.getItem("p__grp_o" + JSON.stringify(this.godname));
  try {
    this.old_pantheons = jQuery.parseJSON(this.old_pantheons)
  } catch (a) {
    this.old_pantheons = {}
  }
  this.old_pantheons == null && (this.old_pantheons = {})
}, Pantheons.prototype.update = function () {
  this.godname = this.state.godname(), this.nm.notify_all.apply(this.nm, [["pantheons"]]), this.loaded == !1, this.fetch_updates(this, null)
}, Pantheons.prototype.post_update = function () {
  for (var a in this.pantheons) {
    var b = this.pantheons[a].data;
    for (var c in b) {
      var d = b[c];
      d.s && d.s == "processed" && delete d.s
    }
  }
}, Pantheons.prototype.get_new_cnt = function () {
  var a = 0;
  for (var b in this.pantheons) {
    var c = this.pantheons[b].data;
    for (var d in c) {
      var e = c[d];
      e.s && e.s == "upd" && a++
    }
  }
  return a
}, Pantheons.prototype.apply_update = function (a) {
  var b = !1;
  for (var c in a) {
    var d = a[c];
    this.pantheons["group" + c] == undefined ? (this.pantheons["group" + c] = {
      name: d.group_name,
      data: []
    }, this.old_pantheons["group" + c] = {
      name: d.group_name,
      data: []
    }, this.group_cnt += 1, b = !0) : this.old_pantheons["group" + c] == undefined && (this.old_pantheons["group" + c] = {
      name: d.group_name,
      data: []
    }, b = !0);
    var e = this.pantheons["group" + c].data;
    for (var f in d.pantheons) {
      var g = d.pantheons[f], h;
      if (e[f] == undefined)e[f] = g, this.old_pantheons["group" + c].data[f] = g, b = !0; else {
        h = e[f];
        if (h.name != g.name || h.position != g.position)h.name = g.name, this.old_pantheons["group" + c].data == undefined && (this.old_pantheons["group" + c].data = []), this.old_pantheons["group" + c].data[f] == undefined && (this.old_pantheons["group" + c].data[f] = my_clone(this.pantheons["group" + c].data[f])), this.old_pantheons["group" + c].data[f].position = h.position, h.position = g.position, h.s = "upd", b = !0
      }
    }
  }
  var i = this.get_new_cnt();
  if (b || i > 0)this.nm.notify_all.apply(this.nm, [["pantheons"]]), this.nm.notify_all.apply(this.nm, [["pantheons_badge"]]), supports_local_storage() && localStorage.setItem("p__grp_o" + JSON.stringify(this.godname), JSON.stringify(this.old_pantheons))
}, Pantheons.prototype.fetch_updates = function (a, b) {
  $.post(base_api_url, {a: get_cmd_id("fjQtRFHERdTEvAbY3p2m")}, function (c) {
    if (c && c.status == "success" && c.groups) {
      var d = (new Date).getTime();
      a.apply_update.apply(a, [c.groups]), a.loaded = !0, a.last_p_updated_at = d, supports_local_storage() && (localStorage.setItem("p__grp_cnt" + JSON.stringify(a.godname), JSON.stringify(a.group_cnt)), localStorage.setItem("p__grp" + JSON.stringify(a.godname), JSON.stringify(a.pantheons)), localStorage.setItem("p__upd_at" + JSON.stringify(a.godname), JSON.stringify(a.last_p_updated_at))), b && b()
    }
  })
}, Pantheons.prototype.check_for_updates = function () {
  var a = new Date, b = a.getTime();
  if (this.loaded == !1 || !this.last_p_updated_at || b - this.last_p_updated_at > 18e4) {
    this.fetch_updates(this, null);
    return !1
  }
  return !1
}, Voices.prototype.add_default_d = function () {
  if (this.get_voices(undefined, !1, "dungeon").length == 0) {
    var a = ["d_voice4", "d_voice3", "d_voice2", "d_voice1"];
    for (idx in a)v = a[idx], Loc[v] && this.add_voice(!0, "dungeon", Loc[v])
  }
}, Voices.prototype.add_default = function () {
  if (this.default_list) {
    if (this.get_voices(undefined, !1, "").length == 0) {
      var a = ["h_voice4", "h_voice3", "h_voice2", "h_voice1"];
      for (idx in a)v = a[idx], Loc[v] && this.add_voice(!1, "", Loc[v])
    }
    if (this.get_voices(undefined, !0, "").length == 0) {
      var a = ["a_voice5", "a_voice4", "a_voice3", "a_voice2", "a_voice1"];
      for (idx in a)v = a[idx], Loc[v] && this.add_voice(!0, "", Loc[v])
    }
    this.default_list = !1
  }
}, Voices.prototype.save = function () {
  localStorage.setItem("gvh", JSON.stringify(this.vdata)), localStorage.setItem("gva", JSON.stringify(this.vdata_a)), localStorage.setItem("gvd", JSON.stringify(this.vdata_d))
}, Voices.prototype.add_voice = function (a, b, c) {
  if (supports_local_storage()) {
    var d;
    a ? b == "dungeon" ? d = this.vdata_d : d = this.vdata_a : d = this.vdata;
    var e = $.inArray(c, d);
    e == -1 ? d.push(c) : (d.splice(e, 1), d.push(c)), d.length > 20 && d.shift(), this.save()
  }
}, Voices.prototype.del_voice = function (a, b, c) {
  supports_local_storage() && (a ? b == "dungeon" ? arr = this.vdata_d : arr = this.vdata_a : arr = this.vdata, arr.splice(c, 1), this.save())
}, Voices.prototype.get_voices = function (a, b, c) {
  if (supports_local_storage()) {
    a && a < 13 && this.add_default(), b ? c == "dungeon" ? arr = this.vdata_d : arr = this.vdata_a : arr = this.vdata;
    return arr
  }
  return null
};
var tzOffset =
  (new Date).getTimezoneOffset();
Date.prototype.setISO8601 = function (a) {
  var b = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
  if (a.toString().match(new RegExp(b))) {
    var c = a.match(new RegExp(b)), d = 0;
    this.setUTCDate(1), this.setUTCFullYear(parseInt(c[1], 10)), this.setUTCMonth(parseInt(c[3], 10) - 1), this.setUTCDate(parseInt(c[5], 10)), this.setUTCHours(parseInt(c[7], 10)), this.setUTCMinutes(parseInt(c[9], 10)), this.setUTCSeconds(parseInt(c[11], 10)), c[12] ? this.setUTCMilliseconds(parseFloat(c[12]) * 1e3) : this.setUTCMilliseconds(0), this.setTime(this.getTime() + tzOffset * 60 * 1e3)
  } else this.setTime(Date.parse(a));
  return this
}, jQuery.fn.outer = function () {
  return $($("<div></div>").html(this.clone())).html()
}, jQuery.fn.ellipsis = function (a) {
  var b = document.documentElement.style;
  return "textOverflow"in b || "OTextOverflow"in b ? this : this.each(function () {
    var b = $(this);
    if (b && b.css("overflow") == "hidden") {
      var c = b.html(), d = b.width(), e = $(this.cloneNode(!0)).hide().css({
        position: "absolute",
        width: "auto",
        overflow: "visible",
        "max-width": "inherit"
      });
      b.after(e);
      var f = c;
      while (f.length > 0 && e.width() > b.width())f = f.substr(0, f.length - 1), e.html(f + "...");
      b.html(e.html()), e.remove();
      if (a == !0) {
        var g = b.width();
        setInterval(function () {
          b.width() != g && (g = b.width(), b.html(c), b.ellipsis())
        }, 200)
      }
    }
  })
}, function (a) {
  var b = document.documentElement.style, c = "textOverflow"in b || "OTextOverflow"in b, d = function (b, c) {
    var d = 0, e = [], f = function (b) {
      var g = 0, h;
      if (!(d > c))for (g = 0; g < b.length; g += 1)b[g].nodeType === 1 ? (h = b[g].cloneNode(!1), e[e.length - 1].appendChild(h), e.push(h), f(b[g].childNodes), e.pop()) : b[g].nodeType === 3 ? (d + b[g].length < c ? e[e.length - 1].appendChild(b[g].cloneNode(!1)) : (h = b[g].cloneNode(!1), h.textContent = a.trim(h.textContent.substring(0, c - d)), e[e.length - 1].appendChild(h)), d += b[g].length) : e.appendChild(b[g].cloneNode(!1))
    };
    e.push(b.cloneNode(!1)), f(b.childNodes);
    return a(e.pop().childNodes)
  };
  a.extend(a.fn, {
    textOverflow: function (b, e) {
      var f = b || "&#x2026;";
      return c ? this : this.each(function () {
        var c = a(this), g = c.clone(), h = c.clone(), i = c.text(), j = c.width(), k = 0, l = 0, m = i.length, n = function () {
          j !== c.width() && (c.replaceWith(h), c = h, h = c.clone(), c.textOverflow(b, !1), j = c.width())
        };
        c.after(g.hide().css({position: "absolute", width: "auto", overflow: "visible", "max-width": "inherit"}));
        if (g.width() > j) {
          while (k < m)l = Math.floor(k + (m - k) / 2), g.empty().append(d(h.get(0), l)).append(f), g.width() < j ? k = l + 1 : m = l;
          k < i.length && c.empty().append(d(h.get(0), k - 1)).append(f)
        }
        g.remove(), e && setInterval(n, 200)
      })
    }
  })
}(jQuery), function (a) {
  a.fn.autogrow = function (b) {
    this.filter("textarea").each(function () {
      var b = a(this), c = b.height(), d = b.css("lineHeight"), e = a("<div></div>").css({
        position: "absolute",
        top: -1e4,
        left: -1e4,
        width: b.width() - 20 - (parseInt(b.css("paddingLeft")) || 0) - (parseInt(b.css("paddingRight")) || 0),
        fontSize: b.css("fontSize"),
        fontFamily: b.css("fontFamily"),
        lineHeight: b.css("lineHeight"),
        resize: "none"
      }).appendTo(document.body), f = function () {
        var b = function (a, b) {
          for (var c = 0, d = ""; c < b; c++)d += a;
          return d
        }, d = this.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n$/, "<br/>&nbsp;").replace(/\n/g, "<br/>").replace(/ {2,}/g, function (a) {
          return b("&nbsp;", a.length - 1) + " "
        });
        e.html(d);
        var f = e.height();
        f < 28 && (f = 28), a(this).css("height", Math.max(f + 0, c))
      };
      a(this).change(f).keyup(f).keydown(f), f.apply(this)
    });
    return this
  }
}(jQuery);
var g_regex = /\{([^}^\|]*?)\|([^{^\|]*?)\}/g, genderize = function (a, b) {
  return !a || a == "male" ? b.replace(g_regex, "$1") : b.replace(g_regex, "$2")
}, localize = function (a, b) {
  for (key in b) {
    var c = "{" + key + "}", d = new RegExp(c, "g"), e = b[key];
    a = a.replace(d, e)
  }
  return a
}, safe_name = function (a) {
  return a && a.value != undefined ? a.value : ""
}, formatted_date = function (a, b) {
  var c = a.getHours(), d = a.getMinutes(), e = "";
  window.ampm == "12h" && (e = "AM", c >= 12 && (e = "PM", c = c - 12), c == 0 && (c = 12)), c == 0 ? c = "00" : c < 10 && (c = "0" + c), d < 10 && (d = "0" + d);
  var f = c + ":" + d;
  b && (f = f + " " + e);
  return f
}, formatted_date_only = function (a, b) {
  var c = a.getHours(), d = a.getMinutes(), e = "", f = a.getFullYear() - 2e3, g = a.getMonth() + 1, h = a.getDate();
  window.ampm == "12h" ? (e = "AM", c >= 12 && (e = "PM", c = c - 12), c == 0 && (c = 12), date_str = g + "/" + h + "/" + f) : (c == 0 ? c = "00" : c < 10 && (c = "0" + c), d < 10 && (d = "0" + d), h < 10 && (h = "0" + h), g < 10 && (g = "0" + g), f < 10 && (f = "0" + f), date_str = h + "." + g + "." + f);
  return date_str
}, formatted_date_full = function (a, b) {
  var c = a.getHours(), d = a.getMinutes(), e = formatted_date_only(a, b);
  if (window.ampm == "12h")return e + " " + formatted_date(a, b);
  c < 10 && (c = "0" + c), d < 10 && (d = "0" + d);
  var f = e + " " + c + ":" + d;
  return f
}, ls_supported = undefined, supports_local_storage = function () {
  if (ls_supported == undefined)try {
    ls_supported = "localStorage"in window && window.localStorage !== null, ls_supported && (window.localStorage.setItem("htest", !0), window.localStorage.removeItem("htest"))
  } catch (a) {
    ls_supported = !1
  }
  return ls_supported
}, supports_input_placeholder = function () {
  var a = document.createElement("input");
  return "placeholder"in a
}, time_ago_interval = function (a) {
  var b = new Date, c = b - a;
  return c < 6e4 ? localize(Loc.d_ago_s, {x: Math.floor(c / 1e3)}) : c < 36e5 ? localize(Loc.d_ago_m, {x: Math.floor(c / 60 / 1e3)}) : c < 864e5 ? localize(Loc.d_ago_h, {x: Math.floor(c / 3600 / 1e3)}) : localize(Loc.d_ago_d, {x: Math.floor(c / 3600 / 24 / 1e3)})
}, get_days_ago = function (a) {
  var b = new Date;
  b.setHours(0, 0, 0), a.setHours(0, 0, 0);
  var c = Math.floor((b - a) / 864e5);
  switch (c) {
    case 0:
      return Loc.d_today;
    case 1:
      return Loc.d_yesterday;
    case 2:
      return Loc.d_2days_ago;
    default:
      return c < 0 ? Loc.d_today : c == 3 || c == 4 ? localize(Loc.d_3_4days_ago, {days: c}) : localize(Loc.d_xdays_ago, {days: c})
  }
};
WebNotify.prototype.update = function () {
  var a = !1;
  this.sm.messages && this.cache.fr_msg == undefined && (this.cache.fr_msg = this.sm.messages.fr_upd_cnt, a = !0), this.sm.messages && this.cache.fr_msg != this.sm.messages.fr_upd_cnt && (this.cache.fr_msg < this.sm.messages.fr_upd_cnt && window.isActive == !1 && this.notify("fr_msg", {}), this.cache.fr_msg = this.sm.messages.fr_upd_cnt, a = !0), a && localStorage.setItem("dn_ch" + this.state.godn, JSON.stringify(this.cache))
}, WebNotify.prototype.read_setting = function (a) {
  return supports_local_storage() && this.settings[a] ? this.settings[a] : !1
}, WebNotify.prototype.write_setting = function (a, b) {
  supports_local_storage() && (b ? this.settings[a] = b : delete this.settings[a], localStorage.setItem("dn_p" + this.state.godn, JSON.stringify(this.settings)))
}, WebNotify.prototype.toggle_setting = function (a) {
  var b = this;
  Notification.requestPermission(function (a) {
    b.permission = a
  }), this.read_setting(a) ? this.write_setting(a, !1) : this.write_setting(a, !0);
  return this.read_setting(a)
}, WebNotify.prototype.show_notification = function (a) {
  var b = new Notification("", {dir: "auto", lang: "", body: a});
  b.onclick = function (a) {
    window.focus(), b.cancel()
  }
}, WebNotify.prototype.notify = function (a, b) {
  if (typeof Notification != "undefined") {
    if (a != "test" && !this.read_setting(a))return !1;
    if (a == "duel") {
      var c = this.state.fight_type();
      c == "dungeon" ? a = "dungeon" : c != "town" && c != "challenge" && (a = "boss")
    }
    var d = localize(Loc["dn_" + a], b), e = this;
    try {
      e.show_notification(d)
    } catch (f) {
      window.Notification.requestPermission(function (a) {
        e.permission = a, e.permission == "granted" && e.show_notification(d)
      })
    }
  }
}, WebNotify.prototype.check_inventory = function () {
  var a = null, b = !1, c = !1, d = !1, e = !1, f = this.cache.inv, g = hash_keys(this.state.inventory), h = hash_keys(f), i = subtract_arrays(h, g);
  for (var j in i)delete f[i[j]], e = !0;
  for (var j in this.state.inventory) {
    var k = this.state.inventory[j];
    if (j == Loc.dn_invite_name)if (!f[j] || f[j].cnt != k.cnt) {
      if (!f[j] || f[j].cnt > k.cnt)d = !0;
      f[j] = {cnt: k.cnt}, c = !0
    }
    if (k.activate_by_user)if (!f[j] || f[j].cnt != k.cnt) {
      if (!f[j] || k.cnt > f[j].cnt)a = j;
      b = !0, f[j] = {cnt: k.cnt}
    }
  }
  if (b || c || e)this.cache.inv = f;
  return {sa: a, invite: d, updated: e}
}, WebNotify.prototype.check_changes = function () {
  if (typeof Notification != "undefined") {
    var a = !1;
    this.cache.lvl == undefined && (this.cache.lvl = this.state.level(), a = !0), this.cache.dth == undefined && (this.state.health() > 0 ? (this.cache.dth = !1, a = !0) : (this.cache.dth = !0, a = !0)), this.cache.qt == undefined && this.state.stats.quest && (this.cache.qt = this.state.stats.quest.value, this.cache.qp = this.state.stats.quest_progress.value, a = !0), this.cache.mqt == undefined && this.state.stats.quest && (this.cache.mqt = this.state.stats.quest.value), this.cache.du == undefined && (this.cache.du = this.state.is_fighting(), a = !0), this.cache.inv == undefined && (this.cache.inv = {}, this.check_inventory(), a = !0), this.sm.messages && this.cache.fr_msg == undefined && (this.cache.fr_msg = this.sm.messages.fr_upd_cnt, a = !0), this.cache.lvl != this.state.level() && (this.cache.lvl = this.state.level(), a = !0, this.notify("levelup", {})), this.state.health() <= 0 ? this.cache.dth || (this.cache.dth = !0, a = !0, this.notify("death", {})) : this.cache.dth && (this.cache.dth = !1, a = !0), this.state.stats.quest && (this.state.stats.quest.value && this.state.stats.quest.value == this.cache.qt ? this.state.stats.quest_progress.value == 100 && this.cache.qp != 100 && (this.cache.qp = this.state.stats.quest_progress.value, a = !0, this.notify("quest", {})) : (this.cache.qt = this.state.stats.quest.value, this.cache.qp = 0, a = !0), this.state.stats.quest.value && this.state.stats.quest.value != this.cache.mqt && (this.state.stats.quest.value.indexOf(Loc.miniq) != -1 && this.cache.mqt.indexOf(Loc.miniq) == -1 && this.notify("mquest", {}), a = !0, this.cache.mqt = this.state.stats.quest.value)), this.cache.du != this.state.is_fighting() && (this.cache.du = this.state.is_fighting(), a = !0, this.cache.du == !0 && this.notify("duel", {})), res = this.check_inventory(), res.sa && (a = !0, this.notify("sa", {item_name: res.sa})), this.state.stats.town_name && this.state.stats.town_name.value && this.state.stats.town_name.value != this.cache.rt && (this.cache.rt = this.state.stats.town_name.value, a = !0, this.notify("return_town", {town_name: this.state.stats.town_name.value})), res.invite && (a = !0, this.notify("invite", {})), (a || res.updated) && localStorage.setItem("dn_ch" + this.state.godn, JSON.stringify(this.cache))
  }
}, $(function () {
  window.isActive = !0, $(window).focus(function () {
    this.isActive = !0, window.isActive = !0
  }), $(window).blur(function () {
    this.isActive = !1, window.isActive = !1
  })
}), UILib.prototype.simple_line = function (a, b) {
  var c = $("<div class='line'></div>");
  c.v_obj = b, c.hightlight = !0;
  if (b && b.name) {
    var d = "";
    b.p ? d = b.p + "hk_" + b.name : d = "hk_" + b.name, c.attr("id", d)
  }
  c.c_e = $("<div class='l_capt'>" + a + "</div>"), c.v_e = $("<div class='l_val'></div>").text(safe_name(b)), c.append(c.c_e), c.append(c.v_e), c.display = function () {
    var a = safe_name(this.v_obj);
    if (a != this.v_e.html()) {
      this.v_e.text(a);
      return !0
    }
    return !1
  }, c.update = function () {
    if (this.vc && this.vc.is_visible && this.vc.is_visible("pet") == !1)return !1;
    this.display() && this.hightlight && !this.first_run && jQuery(this.v_e).clearQueue().glow(glow_color, glow_time), this.v_obj && this.v_obj.s && (this.v_obj.s = "processed"), this.first_run = !1
  }, c.display(), c.first_run = !0;
  return c
}, UILib.prototype.motto_line = function (a, b, c, d) {
  var e = this.simple_line(b, c);
  e.v_e.addClass("h_motto"), e.m_old_update = e.update, a && a.level() < 7 && e.hide(), e.update = function () {
    (a == undefined || a.level() >= 7) && this.css("display") == "none" && this.show(), e.m_old_update()
  };
  if (d) {
    var f = $('<span class="motto_edit_sym div_link_nu">✎</span>');
    f.attr("title", Loc.set_motto_title), e.c_e.append(f);
    var g = function (a) {
      return function () {
        a.show()
      }
    }, h = function (a) {
      return function () {
        a.hide()
      }
    };
    e.edit_line = $('<div class="motto_edit"></div>'), e.edit_line.hide();
    var i = $('<input autocomplete="off" id="motto_input" type="text" value="" class="input_text"></input>');
    i.attr("placeholder", Loc.set_motto_placeholder), e.edit_line.append(i), e.edit_save = $('<div class="motto_edit_control">✓</div>').attr("title", Loc.set_motto_save_title), e.edit_cancel = $('<div class="motto_edit_control div_link">✕</div>').attr("title", Loc.set_motto_cancel_title), e.save_spinner = $('<div border="0" align="middle" style="float:left;padding-top:8px;" class="spinner_img"></div>');
    var j = function () {
      return function () {
        e.edit_line.slideUp()
      }
    };
    e.edit_cancel.click(j()), e.status_line = $('<div class="motto_status error"></div>'), e.edit_line.append(e.edit_save), e.edit_line.append(e.save_spinner), e.edit_line.append(e.edit_cancel), e.edit_line.append(e.status_line), e.append(e.edit_line);
    var k = function (a) {
      return function () {
        if (a.edit_save.hasClass("div_link") != !1) {
          a.save_spinner.show(), a.edit_save.hide();
          var b = $("#motto_input").val();
          $.post(base_api_url, {
            a: get_cmd_id("WzCGcLhzgkHj35wake2c"),
            b: prepare_args(JSON.stringify({motto: b}))
          }, function (d) {
            var e = d.status;
            e == "success" ? (c.value = b, a.v_e.text(b), a.edit_line.slideUp(), a.status_line.html("")) : a.status_line.html(Loc.set_motto_error), a.save_spinner.hide(), a.edit_save.show()
          })
        }
      }
    };
    i.keyup("keypress", function (a) {
      var b = a.keyCode ? a.keyCode : a.which;
      if (b == 13) {
        var c = k(e);
        c()
      } else if (b == 27) {
        var c = j();
        c()
      } else {
        var d = $("#motto_input").val();
        e.last_value == d ? e.edit_save.removeClass("div_link") : d.length > 25 ? (e.edit_save.removeClass("div_link"), e.status_line.html(Loc.set_motto_error_len)) : (e.status_line.html(""), e.edit_save.addClass("div_link"))
      }
    }), e.edit_save.click(k(e));
    var l = function () {
      return function () {
        i.val(c.value), e.edit_line.css("display") == "none" && (e.last_value = c.value, $("#motto_input").val(e.last_value), e.status_line.html(""), e.edit_line.slideDown(), e.edit_save.removeClass("div_link"), e.save_spinner.hide(), e.edit_save.show(), $("#motto_input").focus())
      }
    };
    e.v_e.click(l()), f.click(l())
  }
  return e
}, UILib.prototype.pet_name_edit_line = function (a, b, c, d) {
  var e = this.simple_line(b, c);
  if (d) {
    var f = $('<span class="motto_edit_sym div_link_nu">✎</span>');
    f.attr("title", Loc.set_pet_name_title), e.c_e.append(f);
    var g = function (a) {
      return function () {
        a.show()
      }
    }, h = function (a) {
      return function () {
        a.hide()
      }
    };
    e.edit_line = $('<div class="motto_edit"></div>'), e.edit_line.hide();
    var i = $('<input autocomplete="off" id="pet_name_input" type="text" value="" class="input_text"></input>');
    e.edit_line.append(i), e.edit_save = $('<div class="motto_edit_control">✓</div>').attr("title", Loc.pet_name_save_title), e.edit_cancel = $('<div class="motto_edit_control div_link">✕</div>').attr("title", Loc.pet_name_cancel_title), e.save_spinner = $('<div border="0" align="middle" style="float:left;padding-top:8px;" class="spinner_img"></div>');
    var j = function () {
      return function () {
        e.edit_line.slideUp()
      }
    };
    e.edit_cancel.click(j()), e.status_line = $('<div class="motto_status error"></div>'), e.edit_line.append(e.edit_save), e.edit_line.append(e.save_spinner), e.edit_line.append(e.edit_cancel), e.edit_line.append(e.status_line), e.edit_line.append($("<div></div>").text(Loc.set_pet_name_desc)), e.append(e.edit_line);
    var k = function (a) {
      return function () {
        if (a.edit_save.hasClass("div_link") != !1) {
          var b = $("#pet_name_input").val(), d = confirm(localize(Loc.pet_rename_confirm, {name: b}));
          d && (a.save_spinner.show(), a.edit_save.hide(), $.post(base_api_url, {
            a: get_cmd_id("BDvAKtPWPV4ZM4jEeC2F"),
            b: prepare_args(JSON.stringify({name: b}))
          }, function (d) {
            var e = d.status;
            e == "success" ? (c.value = b, a.v_e.text(b), a.edit_line.slideUp(), a.status_line.html("")) : d.desc && a.status_line.html(d.desc), a.save_spinner.hide(), a.edit_save.show()
          }))
        }
      }
    };
    i.keyup("keypress", function (a) {
      var b = a.keyCode ? a.keyCode : a.which;
      if (b == 13) {
        var c = k(e);
        c()
      } else if (b == 27) {
        var c = j();
        c()
      } else {
        var d = $("#pet_name_input").val();
        e.last_value == d ? e.edit_save.removeClass("div_link") : (e.status_line.html(""), e.edit_save.addClass("div_link"))
      }
    }), e.edit_save.click(k(e));
    var l = function () {
      return function () {
        var a = "";
        i.val(a), e.edit_line.css("display") == "none" && (e.last_value = a, $("#pet_name_input").val(e.last_value), e.status_line.html(""), e.edit_line.slideDown(), e.edit_save.removeClass("div_link"), e.save_spinner.hide(), e.edit_save.show(), $("#pet_name_input").focus())
      }
    };
    e.v_e.click(l()), f.click(l())
  }
  return e
}, UILib.prototype.hero_name_line = function (a, b, c) {
  var d = this.simple_line(a, b);
  link = $("<a></a>"), link.attr("href", "/gods/" + c.value), link.attr("target", "_blank"), link.attr("title", Loc.hname_title), link.html(b.value), link.click(function () {
    window.open(this.href);
    return !1
  }), d.v_e.html(link);
  return d
}, UILib.prototype.gender_line = function (a, b) {
  var c = this.simple_line(a, b);
  c.display = function () {
    var a = Loc["gender_" + b.value];
    if (this.v_e.html() != a) {
      this.v_e.html(a);
      return !0
    }
    return !1
  }, c.display();
  return c
}, UILib.prototype.guild_name_line = function (a, b) {
  var c = b.clan, d = this.simple_line(a, c);
  d.update = function () {
    var a = $('<a style="font-style:italic;"></a>');
    a.attr("href", "/stats/guild/" + encodeURIComponent(c.value)), a.attr("target", "_blank"), a.attr("title", Loc.guild_link_title), a.text(c.value), a.click(function () {
      window.open(this.href);
      return !1
    }), c.value && c.value.length > 0 && (b.clan_position ? this.v_e.html(a.outer() + " (" + b.clan_position.value + ")") : this.v_e.html(a.outer())), b.level.value >= 12 && this.css("display") == "none" && (d.first_run ? this.show() : this.fadeIn()), d.first_run || jQuery(this.v_e).clearQueue().glow(glow_color, glow_time), d.first_run = !1
  }, d.first_run = !0, d.attr("style", "display:none"), d.update();
  return d
}, UILib.prototype.wiki_link_line_w_value = function (a, b, c, d) {
  var e = this.simple_line(a, c);
  e.display = function () {
    if (this.vc && this.vc.is_visible && this.vc.is_visible("pet") == !1)return !1;
    var a = safe_name(this.v_obj);
    if (a != "") {
      var c = $("<a>");
      c.attr("href", Loc.wiki_prefix + "/" + d.value), c.attr("target", "_blank"), b && c.attr("title", b), c.html(this.v_obj.value), c.click(function () {
        window.open(this.href);
        return !1
      }), this.v_e.html(""), this.v_e.append(c)
    } else this.v_e.html(a);
    return !0
  }, e.display.call(e);
  return e
}, UILib.prototype.wiki_link_line = function (a, b, c) {
  return this.wiki_link_line_w_value(a, b, c, c)
}, UILib.prototype.pet_level_line = function (a, b) {
  var c = this.simple_line(a, "");
  c.update = function () {
    b.pet.pet_level == undefined || b.pet.pet_level.value == "" ? this.css("display") != "none" && this.hide() : this.css("display") == "none" && this.show(), b.pet.pet_level && this.v_e.html(b.pet.pet_level.value)
  };
  return c
}, UILib.prototype.pet_is_dead_line = function (a, b, c) {
  var d = this.simple_line(b, "");
  c.pet.pet_is_dead_str != undefined && c.pet.pet_is_dead_str.value != undefined && c.pet.pet_is_dead_str.value.length > 0 || (d.attr("style", "display:none"), d.c_e.hide()), d.vc = a, d.display = function () {
    if (this.vc && this.vc.is_visible && this.vc.is_visible("pet") == !1)return !1;
    c.pet.pet_is_dead && c.pet.pet_is_dead.value ? (this.css("display") == "none" && this.fadeIn(), this.v_e.html(c.pet.pet_is_dead_str.value)) : (this.css("display") != "none" && this.fadeOut(), this.v_e.html("")), c.pet.pet_is_dead_str && c.pet.pet_is_dead_str.s && (c.pet.pet_is_dead_str.s = "processed");
    return !0
  }, d.update = function () {
    a == !1 && (c.pet.pet_is_dead_str != undefined && c.pet.pet_is_dead_str.value != undefined && c.pet.pet_is_dead_str.value.length > 0 && d.css("display") == "none" ? d.fadeIn() : c.pet.pet_is_dead_str != undefined && c.pet.pet_is_dead_str.value != undefined && c.pet.pet_is_dead_str.value.length == 0 && d.css("display") != "none" && d.fadeOut(), c.pet.pet_is_dead_str && this.v_e.html(c.pet.pet_is_dead_str.value))
  }, d.display.call(d);
  return d
}, UILib.prototype.gp_progress_bar = function (a, b) {
  var c = this.progress_bar(a, b);
  return c
}, UILib.prototype.progress_bar = function (a, b) {
  typeof b == "undefined" && (b = 100);
  var c = $("<div class='p_bar'></div>");
  c.p_progress = $("<div class='p_val'></div>"), c.append(c.p_progress), c.setProgress = function (c, d, e, f) {
    var d = typeof d != "undefined" ? d : 1e3, e = typeof e != "undefined" ? e : "swing", f = typeof f != "undefined" ? f : undefined, g = Math.round(Math.floor(c / b * 100)) + "%", h = c + "%";
    a && (h = localize(a, {prct: h})), this.attr("title", h), f ? jQuery(this.p_progress).clearQueue().animate({width: g}, d, e, f) : jQuery(this.p_progress).clearQueue().animate({width: g}, d, e)
  }, c.setProgressNoAnim = function (c) {
    var d = Math.floor(c / b * 100) + "%", e = Math.round(c) + "%";
    a && (e = localize(a, {prct: e})), this.attr("title", e), this.p_progress.clearQueue(), this.p_progress.width(d)
  }, c.setColor = function (a) {
    this.p_progress.css("background-color", a)
  }, c.update = function () {
    this.setProgress && this.setProgress(progress.value)
  };
  return c
}, UILib.prototype.line_w_progress = function (a, b, c, d, e) {
  var f = this.simple_line(a, b);
  f.p_line = p_line = $("<div class='p_bar'></div>"), f.p_progress = p_progress = $("<div class='p_val'></div>"), f.p_line = p_line, f.setProgress = function (a, b) {
    var c = Math.floor(a) + "%", d = c;
    e && (d = localize(e, {prct: c})), this.p_line.attr("title", d), b ? this.p_progress.width(c) : jQuery(this.p_progress).clearQueue().animate({width: c}, 1e3)
  }, f.setColor = function (a) {
    this.p_progress.css("background-color", a)
  }, f.old_s_line_update = f.update, f.update = function () {
    this.old_s_line_update(), this.setProgress && this.setProgress(c.value)
  }, f.setColor(d), f.setProgress(c.value, !0), f.old_s_line_update.call(f), f.append(p_line.append(p_progress));
  return f
}, UILib.prototype.line_w_progress_2val = function (a, b, c, d, e) {
  var f = {value: b.value / c.value * 100}, g = this.line_w_progress(a, b, f, d, e);
  g.update = function (a) {
    var d = b.value / c.value * 100;
    d > 100 && (d = 100), f = {value: d}, this.v_e.html(b.value + " / " + c.value), this.setProgress ? this.setProgress(f.value, a) : gv_error("no setProgress for element: " + g.attr("id"))
  }, g.display = function () {
    this.v_e.html(b.value + " / " + c.value);
    return !0
  }, g.display();
  return g
}, UILib.prototype.health_line = function (a, b, c) {
  var d = b.value / c.value * 100, e = function (a) {
    return a < 30 ? "#EB0000" : a < 70 ? "#F6F600" : "green"
  }, f = this.line_w_progress_2val(a, b, c, e(d), Loc.pr_hp);
  f.my_color = "red", f.old_update = f.update, f.update = function (a) {
    this.old_update(a);
    var d = b.value / c.value * 100, f = e(d);
    this.p_progress.animate({backgroundColor: f}), this.my_color = f
  }, f.update(!0);
  return f
}, UILib.prototype.quest_line = function (a, b, c, d, e) {
  var f = this.line_w_progress(a, c, d, e, Loc.pr_quest);
  f.q_name = q_name = $("<div class='q_name'></div>");
  var g = "";
  b && (g = b.value), q_name.text(g), f.p_line.before(q_name), f.old_update = f.update, f.update = function () {
    this.old_update(), b && this.q_name.text() != b.value && (this.q_name.text(b.value), $(this.q_name).glow(glow_color, glow_time))
  }, f.display = function () {
    var a = Loc.quest_num + c.value;
    if (a != this.v_e.text()) {
      this.v_e.text(a);
      return !0
    }
    return !1
  }, f.display();
  return f
}, UILib.prototype.win_loss_line = function (a, b, c, d, e) {
  var f = this.simple_line(c, d);
  b && f.v_e.addClass("div_link");
  var g = f.v_e;
  g.popover({header: "#awl_popover > .fh_header", content: "#awl_popover > .fh_content"});
  var h = $(".last_fight_link"), i = $(".ext_stats_link");
  Loc.locale == "en" && i.hide();
  var j = this;
  h.children("a").html(Loc.last_fight_link);
  var k = i.children("a");
  k.html(Loc.ext_stats_link), k.attr("href", "/meter/gods/" + a.state.godname()), b && (f.v_e.attr("title", Loc.win_loss_title), f.v_e.click(function () {
    g.removeClass("div_link");
    var c = a.get_spinner(b);
    c.show(), $.post(base_api_url, {a: get_cmd_id("AJ53peA1Kl3eoRv1fnbW")}, function (a) {
      c.hide(), g.addClass("div_link");
      if (a && a.status == "success") {
        h.detach(), i.detach();
        var b = $("#awl_popover_c");
        b.empty(), b.parent().attr("style", "max-height:500px;"), b.append(h), b.append(i), a.last_fight_available ? $(".last_fight_link").show() : $(".last_fight_link").hide();
        if (a.fights_list.length > 0 || a.last_fight_available)for (idx in a.fights_list) {
          var d = a.fights_list[idx], e = $('<div class="wl_line"></div>');
          $('<div class="opp_name"></div>').append($('<a target="_blank" href="/gods/' + d.username + '"></a>').html(d.name)).appendTo(e);
          var f = d.duels_won + " / " + d.duels_lost;
          Loc.locale == "ru" && (f = $('<a href="/meter/gods/' + d.username + '">' + f + "</a>")), $('<div class="wl_stats"></div>').html(f).appendTo(e), b.append(e)
        } else {
          var e = $('<div class="wl_line"></div>').html(Loc.fight_history_empty);
          b.append(e)
        }
        $(".fh_header").html(Loc.fight_history), g.trigger("showPopover"), !window.fb_frame || typeof FB == "undefined" || !FB.Canvas
      }
    })
  })), f.display = function () {
    if (d.value > 0 || e.value > 0)this.v_e.html(d.value + " / " + e.value), this.css("display") == "none" && this.fadeIn();
    return !0
  }, f.display();
  return f
}, UILib.prototype.retirement_line = function (a, b, c) {
  var d = this.simple_line(a, b);
  (!b || !b.value || !c || !c.value) && d.attr("style", "display:none;"), d.display = function () {
    b && b.value && c && c.value && (this.css("display") == "none" && this.fadeIn(), this.v_e.html(b.value));
    return !0
  }, d.display.call(d);
  return d
}, UILib.prototype.bricks_line = function (a, b, c) {
  var d = this.simple_line(a, b);
  (b.value == 0 || c && c.value) && d.attr("style", "display:none;"), d.temple_completed_at = c, d.display = function () {
    b.value > 0 && (!this.temple_completed_at || !this.temple_completed_at.value) && (this.css("display") == "none" && this.fadeIn(), this.v_e.html(b.value / 10 + "%"));
    return !0
  }, d.display.call(d);
  return d
}, UILib.prototype.wood_line = function (a, b) {
  var c = this.simple_line(a, b);
  b.value == "" && c.attr("style", "display:none;"), c.display = function () {
    b.value != "" && (this.css("display") == "none" && this.fadeIn(), this.v_e.html(b.value));
    return !0
  }, c.display.call(c);
  return c
}, UILib.prototype.aura_line = function (a, b) {
  var c = this.simple_line(a, b.aura_name());
  c.hightlight = !1, b.aura_name() == "" && c.attr("style", "display:none;"), c.display = function () {
    if (b.aura_name() != "") {
      this.css("display") == "none" && this.fadeIn();
      var a = b.stats.aura_time.value, c = Math.floor(a / 3600), d = Math.floor(a / 60 - c * 60);
      c < 10 && (c = "0" + c), d < 10 && (d = "0" + d), this.aura_clear_timer && (this.aura_clear_timer = window.clearTimeout(this.aura_clear_timer));
      var e = this;
      this.aura_clear_timer = window.setTimeout(function () {
        e.css("display") != "none" && e.fadeOut()
      }, a * 1e3);
      var f = " (" + c + ":" + d + ")";
      this.v_e.html(b.aura_name() + f);
      var g = $("<a></a>");
      g.attr("href", Loc.wiki_prefix + "/" + localize(Loc.wiki_aura_prefix, {name: b.aura_name()})), g.attr("target", "_blank"), g.attr("title", localize(Loc.wiki_aura_title, {name: b.aura_name()})), g.html(b.aura_name()), g.click(function () {
        window.open(this.href);
        return !1
      }), this.v_e.html(""), this.v_e.append(g), this.v_e.append(f)
    } else this.css("display") != "none" && this.fadeOut();
    return !0
  }, c.display();
  return c
}, UILib.prototype.distance_line = function (a, b, c, d) {
  var e = b, f;
  e.going_back() ? f = Loc.distance_back_capt : f = Loc.distance_capt;
  var g = this.simple_line(f, c);
  g.update = function () {
    var b = d.town_name;
    if (b == undefined || b.value == "") {
      var f;
      e.going_back() ? f = Loc.distance_back_capt : f = Loc.distance_capt, this.c_e.html(f), this.v_e.html(c.value + " " + Loc.milestone_ending);
      var g = Loc.nearby_town_unkown;
      e.stats.c_town && e.stats.c_town.value && (g = e.stats.c_town.value), this.v_e.attr("title", localize(Loc.nearby_town, {town: g}))
    } else {
      this.c_e.html(a);
      var h = $("<a></a>");
      h.attr("href", Loc.wiki_prefix + "/" + b.value), h.attr("target", "_blank"), h.attr("title", localize(Loc.town_wiki_title, {town: b.value})), h.html(b.value), h.click(function () {
        window.open(this.href);
        return !1
      }), this.v_e.html(h)
    }
  }, g.update();
  return g
}, UILib.prototype.make_awards = function (a, b, c) {
  var d, e = 0;
  if (a && a.value) {
    d = $("<span></span>").html("庙");
    var f = new Date;
    e = e + 1, f.setISO8601(a.value), d.attr("title", localize(Loc.t_award_title, {time: formatted_date_full(f, !0)}))
  }
  var g;
  if (b && b.value) {
    g = $("<span></span>").html("畜"), e = e + 1;
    var f = new Date;
    f.setISO8601(b.value), g.attr("title", localize(Loc.p_award_title, {time: formatted_date_full(f, !0)}))
  }
  var h;
  if (c && c.value) {
    h = $("<span></span>").html("舟"), e = e + 1;
    var f = new Date;
    f.setISO8601(c.value), h.attr("title", localize(Loc.a_award_title, {time: formatted_date_full(f, !0)}))
  }
  if (d || g || h) {
    var i = $('<span class="t_award_small"></span>');
    d && i.append(d), g && i.append(g), h && i.append(h), e == 1 ? i.addClass("t_award_bg1") : e == 2 ? i.addClass("t_award_bg2") : e == 3 && i.addClass("t_award_bg3");
    return i
  }
  return null
}, UILib.prototype.god_name_line = function (a, b) {
  var c = b.godname, d = this.simple_line(a, c), e = $("<a></a>");
  e.attr("href", "/gods/" + c.value), e.attr("target", "_blank"), e.html(c.value), e.click(function () {
    window.open(this.href);
    return !1
  }), d.v_e.html("");
  var f = this.make_awards(b.temple_completed_at, b.pet_completed_at, b.ark_completed_at);
  f && d.v_e.append(f), d.v_e.append(e);
  return d
}, UILib.prototype.win_lost_ext = function (a, b, c, d) {
  var e = this.simple_line(a, {value: b}), f = $("<a></a>"), g = b + " / " + c;
  Loc.locale == "ru" && (g = $('<a href="/meter/gods/' + d + '">' + g + "</a>"), g.attr("target", "_blank"), g.click(function () {
    window.open(this.href);
    return !1
  })), e.v_e.html(""), e.v_e.append(g);
  return e
}, UILib.prototype.create_invites = function (a, b, c, d) {
  b.attr("style", "display:none"), b.invites_left_s = d, b.header = a.get_block_caption_by_parent_ref(b);
  var e = $('<form id="invite_friend" action="#" method="post"></form>'), f = $('<div id="invite_email_label" class="line"></div>').html(Loc.invites_email_name).appendTo(e);
  e.voice_field = $('<input autocomplete="off" id="invite_email" name="invite_email" type="text" value="" class="input_text"></input>'), e.append(e.voice_field);
  var g = $('<div class="line" style="text-align:left;"></div>');
  g.html(Loc.invites_message).appendTo(e), e.message_field = $('<textarea class="input_text" cols="16" id="invite_message" name="invite_message" rows="4" wrap="virtual;"></textarea>'), e.message_field.val(Loc.invite_message), e.append(e.message_field);
  var h = $('<div id="invite_submit_w"></div>');
  e.send_button = $('<input type="submit" id="invite_submit"></input>').appendTo(h), h.appendTo(e);
  var i = function (a, c) {
    var d = a.get_spinner(b);
    d.show(), $.post(base_api_url, {
      a: get_cmd_id("54pcE5UCp82zxcEQcBwj"),
      b: prepare_args(JSON.stringify(c))
    }, function (b) {
      d.hide();
      var c = $("#invite_email"), e = $("#invite_message"), f = $("#invite_error");
      if (b.status != "success")f.addClass("t_error"), b.desc || (b.desc = Loc.network_error); else {
        f.removeClass("t_error"), c.val(""), e.val(""), set_msg_update(a);
        var g = forced_update(a);
        g()
      }
      $("#invite_submit").removeAttr("disabled"), c.removeAttr("disabled"), e.removeAttr("disabled"), f.clearQueue(), f.html(b.desc), f.slideDown().delay(7e3).slideUp()
    })
  }, j = function (b) {
    return function (b) {
      var c = e.send_button;
      c.attr("disabled", "disabled"), jQuery("#invite_message").attr("disabled", "disabled"), jQuery("#invite_email").attr("disabled", "disabled"), i(a, {
        email: jQuery("#invite_email").val(),
        msg: jQuery("#invite_message").val(),
        b: !0
      }), b.preventDefault();
      return !1
    }
  };
  e.submit(j(this, b)), e.send_button.attr("value", Loc.invites_send_button), e.appendTo(c), b.invite_error = $('<div id="invite_error" style="display:none;" class="line"></div>').appendTo(c), b.update = function () {
    this.invites_left_s && this.invites_left_s.value > 0 ? (this.header.html(Loc.invites_b_capt + " (" + this.invites_left_s.value + ")"), this.css("display") == "none" && this.fadeIn()) : this.css("display") != "none" && this.delay(7e3).fadeOut()
  }, a.nm.register("invites_left", b), b.update.call(b)
}, UILib.prototype.create_inventory = function (a, b, c, d, e, f, g, h) {
  var i, j, k, l = Loc.i_intro_monster, m;
  h ? (i = "_o", j = Loc.i_intro_o, k = Loc.i_intro_o_e) : (i = "", j = Loc.i_intro, k = Loc.i_intro_e);
  var n = $("<div class='inv_block' id='inv_block_content" + i + "'></div>");
  n.ref = a;
  var o = !1;
  g ? (m = l, a.state.inventory_calc_num(e) == 0 && (o = !0, m = Loc.i_intro_o_e)) : a.state.inventory_calc_num(e) > 0 ? m = j : (o = !0, m = j), n.header = $("<div class='inv_header'></div>").html(m), o && n.header.addClass("inv_empty"), n.append(n.header);
  var p = this, q = function (a) {
    f && f.show(), $.post(base_api_url, {
      a: get_cmd_id("agQHqM4rCoT0CaDvq44I"),
      b: prepare_args(JSON.stringify({id: a}))
    }, function () {
      f && f.hide()
    })
  }, r = function (a, b, c) {
    return function (d) {
      q(b.name), a.detach(), c.m_update_timeout == undefined && (c.m_update_timeout = setTimeout(function () {
        var a = forced_update(c);
        a()
      }, 3e3)), d.stopPropagation();
      return !1
    }
  }, s = function (b) {
    var c = $("<li></li>").text(b.name);
    b.cnt > 1 && c.append(" (" + b.cnt + "" + Loc.thing_ending + ")");
    if (b.activate_by_user) {
      var e = $('<a href="#" class="no_link item_act_link_div"></a>').html("@"), f, g = !1;
      if (d.is_fighting() == !1) {
        var h = {desc: b.description, godpower: b.needs_godpower};
        b.needs_godpower == 0 ? (f = localize(Loc.item_activate_no_gp, h), e.addClass("div_link"), g = !0) : d.godpower() >= b.needs_godpower ? (f = localize(Loc.item_activate_desc, h), e.addClass("div_link"), g = !0) : f = localize(Loc.item_activate_ne_gp, h)
      } else f = Loc.item_activate_no_duel;
      e.attr("title", f);
      var i = $('<div class="item_act_link_div"></div>').html(" (").append(e).append(")");
      g ? e.click(r(i, b, n.ref)) : e.click(function (a) {
        a.preventDefault();
        return !1
      }), c.append(i)
    }
    if (b.activate_on_arena) {
      var e = $('<div class="item_act_link_div"></div>').html("@"), f, g = !1;
      if (d.is_fighting() == !0)if (a.state.fight_type() == "dungeon")f = Loc.item_activate_no_dungeon; else {
        var h = {desc: b.description, godpower: b.needs_godpower};
        b.needs_godpower == 0 ? localize(Loc.item_activate_no_gp, h) : d.godpower() >= b.needs_godpower ? (f = localize(Loc.item_activate_desc, h), e.addClass("div_link"), g = !0) : f = localize(Loc.item_activate_ne_gp, h)
      } else f = Loc.item_activate_no_travel;
      e.attr("title", f);
      var i = $('<div class="item_act_link_div"></div>').html(" (").append(e).append(")");
      g ? e.click(r(i, b, n.ref)) : e.click(function (a) {
        a.preventDefault();
        return !1
      }), c.append(i)
    }
    b.price >= 100 && c.css("font-weight", "bold"), b.type && c.css("font-style", "italic"), b.li = c;
    return c
  }, t = [];
  $.each(e, function (a, b) {
    b && (t[b.pos] = b)
  }), n.list = $("<ul></ul>").appendTo(n), $.each(t, function (a, b) {
    if (b) {
      var c = s(b);
      n.list.append(c)
    }
  }), n.update = function () {
    var a = [], c = [], d = [], f = [], g = this;
    $.each(e, function (b, e) {
      if (e) {
        e.pos != -1 && (a[e.pos] = e);
        if (e.s == "add" && e.li == undefined)d[e.pos] = e; else if (e.s == "del")c.push(e); else if (e.s == "upd" || e.activate_by_user || e.activate_on_arena)f[e.pos] = e
      }
    });
    if (b && b.is_visible && b.is_visible("inv") == !1) {
      $.each(c, function (a, b) {
        b && (b.s = "deleting", b.li && (b.li.remove(), b.li = undefined))
      });
      return !1
    }
    $.each(f, function (a, b) {
      if (b) {
        b.s = "processed";
        var c = b.li;
        b.li = s(b), c.replaceWith(b.li)
      }
    }), $.each(d, function (b, c) {
      if (c) {
        var d = s(c);
        a.length == 0 ? g.list.append(d) : c.pos == 0 ? d.prependTo(g.list) : a[c.pos - 1] && a[c.pos - 1].li ? d.insertAfter(a[c.pos - 1].li) : d.prependTo(g.list), d.show(500), d.glow(glow_color, glow_time), c.s = "processed"
      }
    }), $.each(c, function (a, b) {
      b && (b.s = "deleting", b.li && b.li.clearQueue().slideUp(500))
    }), a.length == 0 && this.header.html() == j ? (this.header.html(k), this.header.addClass
    ("inv_empty")) : a.length != 0 && this.header.html() == k && (this.header.html(j), this.header.removeClass("inv_empty"))
  }, n.update.call(n);
  return n
}, UILib.prototype.create_opps_block = function (a, b, c, d, e) {
  var f = this;
  a.state.fight_type() != "monster_m" && c.hide();
  var g = function (a, c) {
    return function (d) {
      b && b.show(), $.post(base_api_url, {
        a: get_cmd_id("W9jcR9yqvGlLvyfCi12v"),
        b: prepare_args(JSON.stringify({id: a}))
      }, function (d) {
        b && b.hide();
        if (d.hero) {
          var e = d.hero;
          $(".fh_header").html(e.name);
          var g = $("#popover_opp_all" + a);
          g.empty(), e.godname && f.god_name_line(Loc.gname_a_capt, {godname: {value: e.godname}}).appendTo(g), e.motto && f.motto_line(undefined, Loc.motto_capt, {value: e.motto}).appendTo(g), e.clan && f.guild_name_line(Loc.guild_capt, {
            clan: {value: e.clan},
            level: {value: 12}
          }).appendTo(g), (e.arena_won || e.arena_lost) && f.win_lost_ext(Loc.win_loss_capt, e.arena_won, e.arena_lost, e.godname).appendTo(g), e.alignment && f.simple_line(Loc.alignment_capt, {value: e.alignment}).appendTo(g), e.gold_approx && f.simple_line(Loc.gold_capt, {value: e.gold_approx}).appendTo(g), e.bricks_cnt && f.simple_line(Loc.bricks_capt, {value: e.bricks_cnt / 10 + "%"}).appendTo(g), e.wood && f.simple_line(Loc.wood_capt, {value: e.wood}).appendTo(g);
          if (e.ab && e.ab.length > 0) {
            var h = "";
            $.each(e.ab, function (a, b) {
              h += b, a < e.ab.length - 1 && (h += ", ")
            });
            var i;
            e.ab.length == 1 ? i = Loc.ability_s_b_capt : i = Loc.ability_b_capt;
            var j = f.simple_line(i, {value: h}), k = $("<a></a>");
            k.attr("href", Loc.wiki_prefix + "/" + Loc.wiki_ab_page), k.attr("target", "_blank"), k.attr("title", Loc.wiki_general_title), k.html(h), k.click(function () {
              window.open(this.href);
              return !1
            }), j.v_e.html(k), j.appendTo(g)
          }
          if (hash_keys(e.inventory).length > 0) {
            var l = $('<div class="opp_inv_bl"></div>').appendTo(g);
            $('<h4 class=""></h4>').html(Loc.inventory_b_capt).appendTo(l);
            var m = $("<ul></li>").appendTo(l);
            $.each(e.inventory, function (a, b) {
              if (b) {
                var c = a;
                b.cnt && b.cnt > 1 && (c = c + " (" + b.cnt + "" + Loc.thing_ending + ")"), $("<li></li>").text(c).appendTo(m)
              }
            })
          }
          c.trigger("showPopover")
        }
      })
    }
  }, h = function (a) {
    var b = $("<div class='line'></div>"), c = $("<div class='opp_n'></div>").text(a.hero);
    c.appendTo(b);
    var d = $("<div class='opp_dropdown fb_round_badge'>▼</div>").appendTo(b);
    a.fight_end ? b.opp_hp = $("<div class='opp_h'></div>").html(Loc.opp_defeated) : b.opp_hp = $("<div class='opp_h'></div>").text(a.hp + " / " + a.hpm), b.append(b.opp_hp), $("#hero_block").append('<div id="opp_all_popover' + a.id + '" style="display:none;"><div class="fh_header"></div><div id="popover_opp_all' + a.id + '" class="fh_content opp_p_content"></div></div>'), d.click(g(a.id, d)), b.dropdown = d, a.li = b;
    return b
  }, i = d, j = $("<div></div>");
  j.ref = a, j.list = $("<div></div>").appendTo(j), $.each(i, function (a, b) {
    if (b) {
      var c = h(b);
      j.list.append(c), c.dropdown.popover({
        header: "#opp_all_popover" + b.id + " > .fh_header",
        content: "#opp_all_popover" + b.id + " > .fh_content"
      })
    }
  }), j.update = function () {
    c.css("display") == "none" && hash_keys(d).length > e && c.show();
    var a = [], b = [], f = [], g = [], i = this;
    $.each(d, function (a, c) {
      c && (c.s == "add" && c.li == undefined ? f.push(c) : c.s == "del" ? b.push(c) : c.s == "upd" && g.push(c))
    }), $.each(g, function (a, b) {
      b && (b.s = "processed", b.fight_end ? b.li.opp_hp.html(Loc.opp_defeated) : b.li.opp_hp.text(b.hp + " / " + b.hpm))
    }), $.each(f, function (a, b) {
      if (b) {
        var c = h(b);
        j.list.append(c), c.dropdown.popover({
          header: "#opp_all_popover" + b.id + " > .fh_header",
          content: "#opp_all_popover" + b.id + " > .fh_content"
        }), c.show(500), c.glow(glow_color, glow_time), b.s = "processed"
      }
    }), $.each(b, function (a, b) {
      b && (b.s = "deleting", b.li && b.li.clearQueue().slideUp(500))
    })
  }, j.update.call(j);
  return j
}, UILib.prototype.draw_diary_content = function (a, b, c, d, e, f, g, h) {
  var i, j = function (a, b, f, g) {
    var h = new Date;
    h.setISO8601(f.time);
    var j = !1, k, l = !1;
    f.first && !g && (j = !0);
    if (g) {
      j = !0;
      var m = new Date;
      m.setISO8601(f.time), k = get_days_ago(m);
      if (i != k) {
        var n = get_days_ago(m);
        $('<div class="diary_cs_t"></div>').html(n).appendTo(b), b.addClass("diary_cs"), i = k
      }
      k = formatted_date(h, !0)
    } else k = formatted_date(h, !1);
    var o = $("<div class='d_time'></div>").html(k);
    if (!1)o.attr("title", f.time);
    var p = $("<div class='d_msg'></div>"), q = f.msg;
    f.infl && p.addClass("m_infl");
    var r = $("<div></div>").text(f.msg), q = r.html();
    if (f.m_wiki) {
      var s = $("<a></a>");
      s.attr("href", Loc.wiki_prefix + "/" + f.m_wiki), s.attr("target", "_blank"), s.html(f.m_wiki), s.click(function () {
        window.open(this.href);
        return !1
      }), q = q.replace(f.m_wiki, s.outer())
    }
    if (f.friend_link) {
      var s = $("<a></a>");
      s.attr("href", "/gods/" + f.friend_name), s.attr("target", "_blank"), s.html(f.friend_link), s.click(function () {
        window.open(this.href);
        return !1
      }), q = q.replace(f.friend_link, s.outer())
    }
    if (f.uph_author && !f.uph_v) {
      var s = $("<a>✑</a>");
      s.attr("href", "/gods/" + f.uph_author), s.attr("target", "_blank"), s.attr("title", localize(Loc.uph_author, {author: f.uph_author})), s.click(function () {
        window.open(this.href);
        return !1
      }), q = q.replace("✑", s.outer())
    }
    f.separate && !g && (c.value == "up" ? b.addClass("turn_separator") : b.addClass("turn_separator_inv")), f.opp_infl && b.addClass("opp_infl"), p.html(q), j && b.append(o), b.append(p), f.li = b;
    if (f.voice_id && !g) {
      var t = function (a, b) {
        return function () {
          var c = d.get_spinner(e);
          c.show(), $.post(base_api_url, {
            a: get_cmd_id("lvBuKwP7tQetJZNXXQx7"),
            b: prepare_args(JSON.stringify({vote: b, vote_id: a}))
          }, function (b) {
            c.hide(), $("#vl_" + a).remove()
          });
          return !1
        }
      }, u = $('<a class="no_link div_link vote_link" id="v_yes">+</a>');
      u.attr("title", localize(Loc.shout_up_t, {author: f.voice_a}));
      var v = $('<a class="no_link div_link vote_link">−</a>');
      v.attr("title", localize(Loc.shout_down_t, {author: f.voice_a}));
      var w = $('<a class="no_link div_link vote_link">➠</a>'), x = f.voice_a;
      w.attr("title", localize(Loc.shout_ppage, {author: x}));
      var y = $('<a class="no_link div_link vote_link">☣</a>');
      y.attr("title", Loc.shout_report);
      var z = $('<span id="vl_' + f.voice_id + '"></span>').append($('<span class="vote_links_b"></span>').html(" (").append(u).append("|").append(v).append("|").append(w).append("|").append(y).append(")"));
      p.append(z), u.click(t(f.voice_id, "true")), v.click(t(f.voice_id, "false")), w.click(function (a) {
        window.open("/gods/" + x), a.stopPropagation();
        return !1
      });
      var A = function (a, b, c) {
        return function (d) {
          var e = confirm(Loc.shout_report_confirm);
          if (e) {
            $.post(base_api_url, {
              a: get_cmd_id("Ce1TdUevvGbwt9TXOUqJ"),
              b: prepare_args(JSON.stringify({vote_id: b, text: c, author: a}))
            }, function (a) {
            }), d.stopPropagation();
            return !1
          }
        }
      };
      y.click(A(x, f.voice_id, f.msg))
    } else if (f.voice_a) {
      var w = $('<a class="no_link div_link vote_link">➠</a>'), x = f.voice_a;
      w.attr("title", localize(Loc.shout_ppage, {author: x})), w.click(function (a) {
        window.open("/gods/" + x), a.stopPropagation();
        return !1
      });
      var z = $('<span id="vl_' + f.voice_a + '">').append($('<span class="vote_links_b">').html(" (").append(w).append(")"));
      p.append(z)
    }
    if (f.uph_v && !g) {
      var B = f.uph_v, t = function (a, b) {
        return function () {
          var c = d.get_spinner(e);
          c.show(), $.post(base_api_url, {
            a: get_cmd_id("TyuNIjePNmwRRhlJLgKC"),
            b: prepare_args(JSON.stringify({vote: b, vote_id: a}))
          }, function (b) {
            c.hide(), $("#vl_" + a).remove()
          });
          return !1
        }
      }, u = $('<a class="no_link div_link vote_link" id="v_yes">+</a>');
      u.attr("title", localize(Loc.mod_up_t, {}));
      var v = $('<a class="no_link div_link vote_link">−</a>');
      v.attr("title", localize(Loc.mod_down_t, {}));
      var z = $('<span id="vl_' + B + '"></span>').append($('<span class="vote_links_b"></span>').html(" [").append(u).append("|").append(v).append("]"));
      p.append(z), u.click(t(B, "true")), v.click(t(B, "false"))
    }
    if (d.d_share_enabled) {
      var C = "";
      g && a == 0 && (C = "top:0px;"), b.sn_links = $('<div class="d_line_links" style="display:none;' + C + '"></div>').appendTo(b);
      var D = encodeURIComponent("http://" + Loc.our_domain), m = new Date;
      m.setISO8601(f.time), k = formatted_date(h, !0);
      var E = k + " " + f.msg, F;
      Loc.locale == "ru" ? F = ["Годвилль - игра без игрока", "Годвилль - город богов и героев", "Годвилль - царство рандома", "Годвилль - обитель случайности", "Годвилль - божественная комедия", "Годвилль - с нами боги!"] : F = ["Godville - Gods and Heroes", "Godville - Zero Player Game", "Godville - Gods With Us"];
      var G = encodeURIComponent(F[Math.floor(Math.random() * F.length)]), H = $('<div class="div_link fb_share"></div>').append('<a target="_blank" href="http://www.facebook.com/sharer.php?s=100&&p[url]=' + D + "&&p[title]=" + G + "&&p[summary]=" + E + '"><img src="/images/f_logo.png"/></a>').attr("title", Loc.fbs_share_title), I = $('<div class="d_tweet"></div>').append($('<a target="_blank" href="http://twitter.com/share?url=' + D + "&text=" + "%23" + Loc.twit_tag + "+" + E + "%0A" + '"><img src="/images/twitter_icon.ico"/></a>').attr("title", Loc.twt_share_title));
      if (Loc.locale == "ru") {
        var J = D;
        J = encodeURIComponent("http://vk.com/ogodville");
        var K = ["игра без игрока", "город богов и героев", "царство рандома", "обитель случайности", "божественная комедия", "с нами боги!"], L = encodeURIComponent(K[Math.floor(Math.random() * K.length)]), M = $('<a target="_blank" href="http://vk.com/share.php?url=' + J + "&noparse=true&title=Годвилль+-+" + L + "&description=" + encodeURIComponent(E) + '"><img src="/images/vk_icon.png"/></a>').attr("title", Loc.vk_share_title), N = $('<div class="d_vk"></div>').append(M);
        N.appendTo(b.sn_links), M.click(function () {
          if (E.length > 190) {
            var a = confirm(Loc.vk_share_warn);
            if (!a)return !1
          }
        })
      }
      I.appendTo(b.sn_links), H.appendTo(b.sn_links), b.sn_links.append($('<div class="triangle"></div>')), Loc.locale != "ru" && H.click(HFB.diary_click_f(k + ": " + f.msg));
      var O = function (a) {
        return function () {
          a.tmr_c && (window.clearTimeout(a.tmr_c), a.tmr_c = undefined), a.tmr || (window.clearTimeout(a.tmr), a.tmr = undefined), a.tmr = window.setTimeout(function () {
            a.sn_links.show(), a.tmr = undefined
          }, 2e3)
        }
      }, P = function (a) {
        return function () {
          a.tmr && (window.clearTimeout(a.tmr), a.tmr = undefined), a.tmr_c = window.setTimeout(function () {
            a.sn_links.hide(), a.tmr_c = undefined
          }, 250)
        }
      };
      b.mouseenter(O(b)), b.mouseleave(P(b))
    }
    return b
  }, k = [];
  $.each(b, function (a, b) {
    b && (k[b.pos] = b)
  }), a.list = $("<div class='d_content'></div>"), $.each(k, function (b, d) {
    if (d) {
      var e = $("<div class='line d_line'></div>");
      c.value == "up" ? a.list.append(e) : a.list.prepend(e), j(b, e, d, g), h || delete d.s
    }
  }), a.append(a.list), a.update = function () {
    if (h && h.is_visible && h.is_visible() == !1)return !1;
    var a = [], e = [], f = [], i = [];
    $.each(b, function (b, g) {
      if (g) {
        g.pos != -1 && (a[g.pos] = g);
        if (g.s == "add")if (g.li && h && h.is_visible && h.is_visible() == !0)g.s = "processed", g.li.clearQueue().glow(glow_color, glow_time); else {
          var j = g.pos;
          c.value == "down" && (j = d.state.diary_l - parseInt(g.pos)), f[j] = g
        } else g.s == "del" ? e.push(g) : g.s == "upd" && (i[g.pos] = g)
      }
    }), $.each(i, function (a, b) {
      if (b) {
        var c = b.li, d = $("<div class='line d_line'></div>");
        c.replaceWith(d), j(a, d, b, g), d.clearQueue().glow(glow_color, glow_time), delete b.s
      }
    });
    var k = this;
    $.each(f, function (d, e) {
      if (e) {
        var f = $("<div class='line d_line'></div>");
        f.css("display", "none"), a.length == 0 ? c.value == "up" ? k.list.append(f) : k.list.prepend(f) : (g && a[0] && a[0].li && (a[0].li.removeClass("diary_cs"), $(".d_time", a[0].li).remove()), e.pos == 0 ? c.value == "up" ? f.prependTo(k.list) : f.appendTo(k.list) : c.value == "up" ? a[e.pos - 1] && a[e.pos - 1].li ? f.insertAfter(a[e.pos - 1].li) : f.prependTo(k.list) : a[parseInt(e.pos) + 1] && a[parseInt(e.pos) + 1].li ? f.insertAfter(a[parseInt(e.pos) + 1].li) : f.appendTo(k.list)), j(d, f, e, g), f.show(500), h && h.is_visible && h.is_visible() ? (e.s = "processed", f.clearQueue().glow(glow_color, glow_time)) : delete b[e.msg + e.time].s
      }
    }), $.each(e, function (a, c) {
      c && (c.s = "deleting", c.li && c.li.clearQueue().slideUp(500), delete b[c.msg + c.time])
    })
  }
}, UILib.prototype.create_diary = function (a, b, c, d, e, f) {
  var g = $("<div>"), h = a, i = function (a, c) {
    return function () {
      var c = a.get_spinner(b);
      c.show(), $.post(base_api_url, {a: get_cmd_id("m5S1KBfBxKhNWuu61EjC")}, function (b) {
        $(".bar_spinner").hide(), b && b.status == "success" && b.hero && a.on_json.apply(a, [b])
      })
    }
  };
  if (f) {
    var j = a.get_right_slot_by_parent_ref(b), k = $("<span id='d_refresh' style='' class='refresh_ch'>↻</span>").prependTo(j);
    k.addClass("header_cursor"), k.attr("title", Loc.refresh_title), k.click(i(a, j))
  }
  var l = a.get_left_slot_by_parent_ref(b), m = "▲";
  e.value == "up" && (m = "▼");
  var n = $("<span style='display:none;' class='sort_ch m_hover'>" + m + "</span>").appendTo(l);
  n.addClass("header_cursor"), n.attr("title", Loc.sort_title), n.click(function () {
    var a = jQuery(".d_content"), b = a.children("div");
    if (n.html() == "▲") {
      n.html("▼"), $.Storage.set("d_so", "up"), e.value = "up", $.each(b, function (b, c) {
        c && (c = jQuery(c), c.detach(), a.prepend(c))
      });
      var c = jQuery("#turn_pbar"), d = c.parent();
      c.detach(), d.prepend(c);
      var f = $(".turn_separator_inv");
      $.each(f, function (a, b) {
        b && (b = jQuery(b), b.addClass("turn_separator").removeClass("turn_separator_inv"))
      })
    } else {
      n.html("▲"), $.Storage.set("d_so", "down"), e.value = "down", $.each(b, function (b, c) {
        c && (c = jQuery(c), c.detach(), a.prepend(c))
      });
      var c = jQuery("#turn_pbar"), d = c.parent();
      c.detach(), d.append(c);
      var f = $(".turn_separator");
      $.each(f, function (a, b) {
        b && (b = jQuery(b), b.addClass("turn_separator_inv").removeClass("turn_separator"))
      })
    }
  });
  var o = $("<span id='imp_button'>!</span>").attr("title", Loc.imp_e_title).hide();
  o.appendTo(l), a.state.get_new_by_type("diary_i") > 0 && o.addClass("fr_new_badge"), a.state.bricks_cnt() >= 50 && a.state.get_diary_i_cnt() > 0 && o.show(), o.update = function () {
    o.css("display") == "none" && o.show(), a.state.get_new_by_type("diary_i") > 0 ? o.addClass("fr_new_badge") : o.removeClass("fr_new_badge")
  }, a.nm.register("diary_i", o);
  var p = $("#imp_e_popover_c"), q = !1, r = new Object;
  r.is_visible = function () {
    return q
  };
  var s = function () {
    q = !1, a.nm.unregister_key_for_object("diary_i", p)
  }, t = function () {
    a.state.diary_i_post_update()
  };
  o.popover({
    header: "#imp_e_popover > .fh_header",
    content: "#imp_e_popover > .fh_content",
    closeEvent: s,
    openEvent: t
  });
  var u = this;
  o.click(function (c) {
    o.removeClass("fr_new_badge"), $(".fh_header").html(Loc.imp_e_capt), p.empty();
    var e = new Object;
    e.value = "up", u.draw_diary_content(p, a.state.diary_i, e, h, b, d, !0, r), a.nm.register("diary_i", p), q = !0, p.update(), o.trigger("showPopover")
  }), this.draw_diary_content(g, c, e, h, b, d, !1, undefined);
  return g
}, UILib.prototype.create_news = function (a, b, c) {
  var d = $("<div>"), e = !1, f, g;
  c.stats.monster_name ? (f = c.stats.monster_progress, g = c.stats.monster_name) : (g = {value: ""}, f = 0, e = !0), d.progress_bar = this.line_w_progress(Loc.monster_title, g, f, "#E2A331", Loc.pr_news), d.s_progress_bar = this.progress_bar(Loc.pr_news), d.s_progress_bar.setColor("#F9B436"), d.s_progress_bar.setProgressNoAnim(c.stats.s_progress.value), d.s_progress_bar.addClass("n_pbar"), e ? d.progress_bar.css("display", "none") : d.s_progress_bar.css("display", "none"), d.progress_bar.p_line.addClass("monster_pb"), d.append(d.progress_bar), d.news_line = $("<div class='f_news line'></div>").html(c.last_news.value), d.append(d.news_line), d.append(d.s_progress_bar), d.last_monster = "", d.update = function () {
    b.layout_changed.call(b), c.stats.monster_name ? (this.progress_bar.css("display") == "none" && (this.progress_bar.show(), this.s_progress_bar.setProgressNoAnim(0), this.s_progress_bar.hide()), this.progress_bar.v_e.text(c.stats.monster_name.value), this.last_monster != c.stats.monster_name.value && (this.progress_bar.setProgress(0, !0), this.last_monster = c.stats.monster_name.value), this.progress_bar.setProgress(c.stats.monster_progress.value)) : (this.last_monster = "", this.progress_bar.css("display") == "none" ? this.s_progress_bar.setProgress(c.stats.s_progress.value) : (this.progress_bar.hide(), this.s_progress_bar.show())), this.news_line.text(c.last_news.value)
  }, b.layout_changed = function () {
    var b = a.get_block_caption_by_parent_ref(this);
    c.t_cmd() == 2 ? b.html(Loc.news_trader_b_capt) : $(this).parent().hasClass("c_col") ? b.html(Loc.news_b_capt) : b.html(Loc.news_b_capt_short)
  }, b.layout_changed.call(b);
  return d
}, UILib.prototype.acc_progress = function (a) {
  var b = $('<span class="acc_progress"></span>');
  b.append($("<span></span>").html("|"));
  for (var c = 0; c < 4; c++)b["block" + c] = $('<span class="ch ch_e"></span>').html("█").appendTo(b);
  b.append($("<span></span>").html("|")), b.setProgress = function (a) {
    var a = Math.floor(a);
    for (var b = 0; b < 4; b++)this["block" + b].removeClass("ch_f"), this["block" + b].addClass("ch_e");
    var c = a;
    c > 4 && (c = 4);
    for (var b = 0; b < c; b++)this["block" + b].addClass("ch_f")
  };
  return b
}, UILib.prototype.create_control = function (a, b, c) {
  var d = c.godpower(), e = c.health(), f = c.arena_step_count(), g = $("<div id='cntrl'></div>");
  g.sm = a;
  var h = $('<div class="pbar line"></div>');
  h.append($('<div class="gp_label"></div>').html(Loc.gpTitle));
  var i = c.godpower();
  g.gp_label = $('<div class="gp_val"></div>').html(i + "%"), h.append(g.gp_label), g.append(h), g.gp_bar = this.gp_progress_bar(Loc.pr_gp, c.max_gp()), g.gp_bar.addClass("gp_bpar_c"), g.gp_bar.setProgressNoAnim(i), h.append(g.gp_bar), g.g_voice_line = $('<div class="voice_line"></div>'), (i < 5 || c.health() <= 0) && g.g_voice_line.css("display", "none");
  var j = $('<form id="god_voice_form" action="#" method="post"></form>');
  j.voice_field = $('<input autocomplete="off" id="god_phrase" name="god_phrase" type="text" value="" class="input_text"></input>');
  if (supports_input_placeholder() == !1) {
    var k = function (a, b) {
      return function () {
        a.css("display") != "none" && (a.hide(), $("#god_phrase").focus())
      }
    }, l = function (a) {
      return function () {
        jQuery("#god_phrase").val().length == 0 && a.show()
      }
    }, m = $("#god_phrase"), n = $('<span id="hint_label" class="hint_label;"></span>').html(Loc.input_voice_hint);
    n.click(k(n, m)), n.attr("style", "position:absolute;left:15px;top:5px;"), j.voice_field.focus(k(n, m)), j.voice_field.blur(l(n))
  } else j.voice_field.attr("placeholder", Loc.input_voice_hint);
  var o = "", p = -1;
  g.god_voice_action = !1, j.voice_field.keyup(function (b) {
    if (b.keyCode == "38") {
      var c = a.voices.get_voices(a.state.level(), a.state.is_fighting(), a.state.fight_type()).slice(0).reverse();
      p == 0 ? (j.voice_field.val(o), p = -1) : p != -1 && p < c.length && (p = p - 1, j.voice_field.val(c[p]))
    } else if (b.keyCode == "40") {
      var c = a.voices.get_voices(a.state.level(), a.state.is_fighting(), a.state.fight_type()).slice(0).reverse();
      p < c.length - 1 && (p == -1 && (o = j.voice_field.val()), p = p + 1, j.voice_field.val(c[p]))
    }
    if (g.god_voice_action == !1) {
      var d = j.send_button;
      j.voice_field.val().length > 100 ? ($("#v2l").html(Loc.voice_too_long), $("#v2l").addClass("t_error"), $("#v2l").show(), d.attr("disabled", "disabled")) : $("#v2l").css("display") != "none" && ($("#v2l").hide(), d.removeAttr("disabled"))
    }
  });
  var q = $('<div id="voice_edit_wrap" style="position:relative;overflow:hidden;"></div>');
  q.append(j.voice_field), q.append(n), j.append(q), j.send_button = $('<input type="submit" id="voice_submit"></input>');
  var r = function (a, h) {
    var i = h.get_spinner(b);
    i.show(), d = c.godpower(), e = c.health(), f = c.arena_step_count(), $.ajax({
      type: "POST",
      url: base_api_url,
      data: {a: get_cmd_id("5JgMUahE1BYdtf7quoWz"), b: prepare_args(JSON.stringify(a))},
      success: function (a) {
        i.hide();
        var b = $("#v2l");
        a.status != "success" ? (b.addClass("t_error"), a.display_string || (a.display_string = Loc.network_error)) : b.removeClass("t_error"), b.clearQueue(), b.html(a.display_string), b.slideDown().delay(7e3).slideUp()
      },
      dataType: "json",
      timeout: 15e3,
      complete: function (a, b) {
        if (b != "success") {
          i.hide();
          var c = $("#v2l");
          c.addClass("t_error"), c.html(Loc.command_send_error), c.slideDown().delay(7e3).slideUp(), setTimeout(function () {
            var a = forced_update(h);
            a();
            var b = j.send_button;
            b.removeAttr("disabled"), g.encourage.addClass("div_link"), g.punish.addClass("div_link"), g.miracle.addClass("div_link"), g.to_arena.addClass("div_link"), g.to_dungeon.addClass("div_link"), g.to_chf.addClass("div_link"), g.resurrect.addClass("div_link")
          }, 3e3)
        }
      }
    }), h.m_update_timeout == undefined && (h.m_update_timeout = setTimeout(function () {
      var a = forced_update(h);
      a()
    }, 3e3))
  }, s = function (b) {
    return function (c) {
      c.preventDefault();
      if (b.god_voice_action)return !1;
      if ($("#god_phrase").val().length <= 100) {
        var d = j.send_button;
        d.attr("disabled", "disabled"), $("#god_phrase").attr("disabled", "disabled");
        var e = $("#god_phrase").val();
        e.length > 0 && a.voices.add_voice(a.state.is_fighting(), a.state.fight_type(), e), r({
          action: "god_phrase",
          god_phrase: e
        }, b.sm), b.god_voice_action = !0, o = "", p = -1
      }
      return !1
    }
  };
  j.submit(s(g)), j.send_button.attr("value", Loc.send_voice_button);
  var t = $('<div id="voice_submit_wrap"></div>');
  j.append(t.append(j.send_button)), supports_local_storage() && (j.last_vocies = $('<div class="div_link_nu gvl_popover">✎</div>'), j.last_vocies.attr("title", Loc.last_voices_title), q.prepend(j.last_vocies), j.last_vocies.popover({
    header: "#gv_popover > .fh_header",
    content: "#gv_popover > .fh_content"
  }), j.last_vocies.click(function () {
    $(".fh_header").html(Loc.last_voices);
    var b = $("#gv_popover_c");
    b.empty();
    var c = [].concat(a.voices.get_voices(a.state.level(), a.state.is_fighting(), a.state.fight_type())).reverse(), d = c.length, e = $('<div style="display:none;" class="gv_list_empty"></div>').html(Loc.last_voices_empty).appendTo(b);
    if (c.length == 0)e.show(); else for (idx in c) {
      var f = c[idx], g = $('<div class="wl_line"></div>'), h = $('<div class="gv_text div_link"></div>').text(f).appendTo(g);
      h.attr("title", Loc.last_voices_select);
      var i = function (a) {
        return function () {
          $("#god_phrase").is(":disabled") == !1 && jQuery("#god_phrase").val(a), jQuery("#hint_label").hide(), $.fn.popover.openedPopup.trigger("hidePopover")
        }
      };
      h.click(i(f));
      var k = $('<div class="gv_del div_link"></div>').html("[x]").appendTo(g);
      k.attr("title", Loc.last_voices_delete);
      var l = function (b, c) {
        return function () {
          a.voices.del_voice(a.state.is_fighting(), a.state.fight_type(), c), b.hide(), a.voices.get_voices(a.state.level(), a.state.is_fighting(), a.state.fight_type()).length == 0 && e.show()
        }
      };
      k.click(l(g, d - idx - 1)), b.append(g)
    }
    j.last_vocies.trigger("showPopover")
  })), g.voice_error = $('<div id="v2l" style="display:none;" class="line"></div>'), g.g_voice_line.append(j), g.append(g.g_voice_line);
  var u = function (a, b) {
    a.encourage.removeClass("div_link"), a.punish.removeClass("div_link"), a.miracle.removeClass("div_link"), a.to_arena.removeClass("div_link"), a.to_chf.removeClass("div_link"), a.to_dungeon.removeClass("div_link"), a.resurrect.removeClass("div_link"), a.action_sent = !0, r({action: b}, a.sm);
    return !1
  }, v = function (a, b, c) {
    return function () {
      if (!$(this).hasClass("div_link"))return !1;
      if (b == "to_dungeon")$.post(base_api_url, {a: get_cmd_id("yYKfxTjrO3fuODiRwOOJ")}, function (c) {
        if (c && c.status == "success" && c.msg) {
          var d = confirm(c.msg);
          d && u(a, b)
        }
      }); else {
        if (c) {
          var d = confirm(c);
          if (!d)return !1
        }
        return u(a, b)
      }
    }
  };
  g.remote_disabled_arena = $('<div class="r_blocked" style="display:none;"></div>').html(Loc.remote_disabled_arena), g.append(g.remote_disabled_arena), g.remote_disabled_fight_over = $('<div class="r_blocked" style="display:none;"></div>').html(Loc.remote_disabled_fight_over), g.append(g.remote_disabled_fight_over);
  var w = $("<div id='cntrl1'></div>");
  g.encourage = $("<a href='#' class='no_link div_link enc_link' style='display:none;'></a>").html(Loc.encourage_link), g.encourage.attr("title", Loc.encourage_title), g.encourage.appendTo(w), g.encourage.click(v(g, "encourage", null)), g.punish = $("<a href='#' class='no_link div_link pun_link' style='display:none;'></a>").html(Loc.punish_link), g.punish.attr("title", Loc.punish_title), g.punish.appendTo(w), g.punish.click(v(g, "punish", null)), g.resurrect = $("<a href='#' class='no_link div_link' style='display:none;padding-top:0.3em;clear:both;'></a>").html(Loc.resurrect_link), g.resurrect.attr("title", Loc.resurrect_title), g.resurrect.appendTo(w), g.resurrect.click(v(g, "resurrect", null)), g.actions1 = w;
  var x = $("<div id='cntrl2'></div>");
  g.miracle = $("<a href='#' class='no_link div_link mir_link' style='display:none;'></a>").html(Loc.miracle_link);
  var y = $('<div class="mir_link_wrap"></div>').append(g.miracle);
  g.miracle.attr("title", Loc.miracle_title), y.appendTo(x), g.miracle.click(v(g, "third_action", null)), g.to_arena = $("<a href='#' class='no_link div_link to_arena' style='display:none;'></a>").html(Loc.to_arena_link), g.to_arena.attr("title", Loc.send_to_arena_title);
  var z = $('<div class="arena_link_wrap"></div>').append(g.to_arena);
  z.appendTo(x), g.to_arena.click(v(g, "to_arena", Loc.send_to_arena_confirm)), g.to_arena_msg = $('<div class="arena_msg"></div>'), x.append(g.to_arena_msg), g.to_chf = $("<a href='#' class='no_link div_link to_arena' style='display:none;'></a>").html(Loc.to_chf_link), g.to_chf.attr("title", Loc.send_to_chf_title);
  var A = $('<div class="chf_link_wrap"></div>').append(g.to_chf);
  A.appendTo(x), g.to_dungeon = $("<a href='#' class='no_link div_link to_arena' style='display:none;'></a>").html(Loc.to_dungeon_link), g.to_dungeon.attr("title", Loc.send_to_dungeon_title);
  var B = $('<div class="chf_link_wrap"></div>').append(g.to_dungeon);
  B.appendTo(x), g.to_dungeon.click(v(g, "to_dungeon", undefined)), g.to_dungeon_msg = $('<div class="arena_msg"></div>'), x.append(g.to_dungeon_msg), g.to_chf_after = $("<span class='to_arena' style='display:none;'></span>");
  var A = $('<div class="chf_link_wrap"></div>').append(g.to_chf_after);
  A.appendTo(x), g.to_chf.popover({header: "#chf_popover > .fh_header", content: "#chf_popover > .fh_content"});
  var C = this, D = $("#chf_popover_c"), E = $('<div class="chf_line chf_filt"></div>'), F = $("<input></input>").attr({
    "class": "input_text",
    type: "text"
  });
  F.attr("placeholder", Loc.friend_filter_placeholder), E.append(F), E.insertBefore($("#chf_popover_c").parent()), F.change(function () {
    var a = $(this).val();
    if (a) {
      D.find("div:not(:contains_i(" + a + "))").hide();
      var b = D.find("div:contains_i(" + a + ")").slice(0, 10);
      b.show()
    } else D.find("div").show()
  }).keyup(function () {
    $(this).change()
  }), g.to_chf.click(function (b) {
    $(".fh_header").html(Loc.chf_popover_title), D.empty();
    if (a.messages.friends.length == 0)D.append($('<div class="chf_line"></div>').html(Loc.chf_no_friends)); else {
      var c = a.messages.friends.sort(function (a, b) {
        var c = a.name, d = b.name;
        return c.localeCompare(d)
      });
      $.each(c, function (a, b) {
        var c = $('<div class="chf_line"></div>').text(b.name + " (" + b.heroname + ")");
        c.click(function (a) {
          var c = confirm(localize(Loc.chf_fr_confirm, {godname: b.name}));
          if (!c)return !1;
          r({action: "chf", opp: b.name}, g.sm), $.fn.popover.openedPopup.trigger("hidePopover")
        }), D.append(c)
      }), F.change()
    }
    g.to_chf.trigger("showPopover")
  }), g.limit_block = $("<div style='display:none;'></div>").html(localize(Loc.arena_actions, {actions: 0})), x.append(g.limit_block), g.actions2 = x, g.actions = $('<div id="actions"></div>'), g.append(g.actions.append(w).append(x)), g.acc = $('<div style="display:none;" class="acc_line line"></div>'), g.acc.attr("title", Loc.acc_title), g.charges = $('<div class="battery"></div>'), $('<span class="ch_title"></span>').html(Loc.charges_title).appendTo(g.charges), g.acc_progress = this.acc_progress(), g.acc_progress.setProgress(c.accumulator()), g.charges.append(g.acc_progress), g.acc_val = $('<span class="acc_val"></span>').html(c.accumulator()).appendTo(g.charges);
  var G = function (a) {
    return function () {
      if (a.charge_action_sent || !$(this).hasClass("div_link"))return !1;
      a.charge_action_sent = !0, r({action: "accumulate"}, a.sm);
      return !1
    }
  };
  g.acc_charge = $("<a href='#' class='no_link div_link ch_link' style='display:none;'></a>").html(Loc.acc_charge).attr("title", Loc.charge_desc).click(G(g));
  var H = function (b) {
    return function () {
      if (b.discharge_action_sent || !$(this).hasClass("div_link"))return !1;
      if (c.godpower() > a.gp_confirm_thre_val()) {
        var d = confirm(localize(Loc.acc_discharge_confirm, {godpower: c.godpower()}));
        if (!d)return !1
      }
      b.discharge_action_sent = !0, b.acc_discharge.removeClass("div_link"), r({action: "acc_restore"}, b.sm);
      return !1
    }
  };
  g.acc_discharge = $("<a class='no_link div_link dch_link' style='display:none;'></a>").html(Loc.acc_discharge).attr("title", Loc.discharge_desc).click(H(g));
  var I = $('<div id="acc_links_wrap"></div>');
  g.acc.append(I), g.acc.append(g.charges);
  var J = $("<a class='hch_link' ></a>").attr("href", "/user/profile/plogs").html(Loc.charge_help_link);
  window.fb_frame || window.vk_frame ? (J.html("&nbsp;"), J.removeClass("hch_link")) : J.click(function () {
    window.open(this.href);
    return !1
  }), J.attr("title", Loc.charge_help_title), I.append($("<div></div>").html(g.acc_discharge)), I.append($("<div></div>").html(g.acc_charge)), g.acc.append(J), g.append(g.acc), g.append(g.voice_error), g.update = function () {
    this.charge_action_sent = !1;
    var b = 600, g = c.godpower(), h = c.arena_step_count(), i = !0, k = !0;
    this.gp_label.html(g + "%"), this.first_call ? (this.first_call = !1, this.gp_bar.setProgressNoAnim(g)) : this.gp_bar.setProgress(g, 500, "linear");
    if (this.god_voice_action) {
      this.god_voice_action = !1, $("#god_phrase").val("");
      var l = j.send_button;
      l.removeAttr("disabled"), $("#god_phrase").removeAttr("disabled"), delete a.state.cmds.v
    }
    (d != c.godpower() || e == 0 && c.health() > 0 || f != h) && this.action_sent && (delete a.state.cmds.i, delete a.state.cmds.a, delete a.state.cmds.f, this.action_sent = !1, this.encourage.addClass("div_link"), this.punish.addClass("div_link"), this.miracle.addClass("div_link"), this.to_arena.addClass("div_link"), this.to_dungeon.addClass("div_link"), this.to_chf.addClass("div_link"), this.resurrect.addClass("div_link")), c.stats.temple_completed_at && (c.health() > 0 && g >= 50 && this.miracle.css("display") == "none" && this.miracle.slideDown(b), (c.health() == 0 || g < 50) && this.miracle.css("display") != "none" && this.miracle.slideUp(b)), c.stats.temple_completed_at && (c.health() > 0 && g >= 50 && c.dungeon_available() && this.to_dungeon.css("display") == "none" && this.to_dungeon.slideDown(b), (c.health() == 0 || g < 50 || !c.dungeon_available()) && this.to_dungeon.css("display") != "none" && this.to_dungeon.slideUp(b)), c.health() > 0 && g >= 25 ? c.is_fighting() ? c.arena_cmd_left() == 0 ? (this.encourage.css("display") != "none" && this.encourage.slideUp(b), this.punish.css("display") != "none" && this.punish.slideUp(b), this.miracle.css("display") != "none" && this.miracle.slideUp(b)) : (this.encourage.css("display") == "none" && this.encourage.slideDown(b), this.punish.css("display") == "none" && this.punish.slideDown(b), c.stats.temple_completed_at && g >= 50 && this.miracle.css("display") == "none" && this.miracle.slideDown(b)) : (this.encourage.css("display") == "none" && this.encourage.slideDown(b), this.punish.css("display") == "none" && this.punish.slideDown(b)) : (this.encourage.css("display") != "none" && this.encourage.slideUp(b), this.punish.css("display") != "none" && this.punish.slideUp(b)), c.is_fighting() == !0 && (i = !1, k = !1);
    if (c.health() > 0 && c.arena_available() && c.is_fighting() == !1)c.arena_disabled() ? (c.health() > 10 && c.level() >= 7 && (this.to_arena_msg.attr("title", Loc.send_to_arena_disabled_title), this.to_arena_msg.html(Loc.arena_unavailable_link), this.to_arena_msg.show(), this.to_arena.removeClass("div_link"), i = !1), k = !1) : (this.to_arena_msg.hide(), this.to_arena.addClass("div_link"), i = !0); else if (c.arena_available() == !1) {
      this.to_arena.removeClass("div_link");
      if (c.stats.arena_send_after && c.stats.arena_send_after.value && c.fight_type() != "monster" && !c.is_fighting()) {
        var m = c.stats.arena_send_after.value, n = Math.floor(m / 3600), o = Math.floor(m / 60 - n * 60);
        this.to_arena_msg.html(Loc.arena_avaialble_in);
        var p;
        n > 0 ? p = localize(Loc.arena_avaialble_time, {
          hours: n,
          minutes: o
        }) : p = localize(Loc.arena_avaialble_time_m, {minutes: o}), this.to_arena_msg.append($('<span class="arena_time_str"></span>').html(p)), this.to_arena_msg.show(), i = !1
      } else c.arena_disabled() && c.level() >= 7 ? (this.to_arena_msg.html(Loc.arena_unavailable_link), this.to_arena_msg.show(), i = !1) : (this.to_arena_msg.hide(), i = !1)
    } else this.to_arena.addClass("div_link"), this.to_arena.html(Loc.to_arena_link), this.to_arena.attr("title", Loc.send_to_arena_title), i = i && !0, this.to_arena_msg.hide();
    if (c.dungeon_available() == !1) {
      this.to_dungeon.removeClass("div_link");
      if (c.stats.d_send_after && c.stats.d_send_after.value && !c.is_fighting()) {
        var m = c.stats.d_send_after.value, n = Math.floor(m / 3600), o = Math.floor(m / 60 - n * 60);
        this.to_dungeon_msg.html(Loc.dungeon_avaialble_in);
        var p;
        n > 0 ? p = localize(Loc.arena_avaialble_time, {
          hours: n,
          minutes: o
        }) : p = localize(Loc.arena_avaialble_time_m, {minutes: o}), this.to_dungeon_msg.append($('<span class="arena_time_str"></span>').html(p)), this.to_dungeon_msg.show(), k = !1
      } else k = !1
    } else this.to_dungeon.addClass("div_link"), this.to_dungeon.html(Loc.to_dungeon_link), this.to_dungeon.attr("title", Loc.send_to_dungeon_title), k = k && !0, this.to_dungeon_msg.hide();
    k && this.to_dungeon.css("display") == "none" && this.to_dungeon.slideDown(), k == !1 && this.to_dungeon.css("display") != "none" && this.to_dungeon.slideUp(), !c.arena_disabled() && c.chf_available() && c.is_fighting() == !1 ? this.to_chf.css("display") == "none" && this.to_chf.show() : this.to_chf.css("display") != "none" && this.to_chf.hide();
    if (c.arena_disabled() || c.is_fighting() == !0)this.to_chf_after.css("display") != "none" && this.to_chf_after.hide(); else if (c.stats.chfr_after && c.stats.chfr_after.value != undefined && !c.is_fighting())if (c.stats.chfr_after.value == 0 || c.health() == 0)this.to_chf_after.css("display") != "none" && this.to_chf_after.hide(); else {
      var m = c.stats.chfr_after.value, n = Math.floor(m / 3600), o = Math.floor(m / 60 - n * 60);
      this.to_chf_after.html(Loc.chf_avaialble_in);
      var p;
      n > 0 ? p = localize(Loc.arena_avaialble_time, {
        hours: n,
        minutes: o
      }) : p = localize(Loc.arena_avaialble_time_m, {minutes: o}), this.to_chf_after.append($('<span class="arena_time_str"></span>').html(p)), this.to_chf_after.css("display") == "none" && this.to_chf_after.show()
    }
    c.stats.is_arena_available && c.stats.is_arena_available.value && (i == !0 && c.health() > 0 ? i = i && !0 : i = !1), c.health() == 0 ? (i = !1, k = !1) : i = i & !0, i && this.to_arena.css("display") == "none" && this.to_arena.slideDown(), i == !1 && this.to_arena.css("display") != "none" && this.to_arena.slideUp(), k && this.to_dungeon.css("display") == "none" && this.to_dungeon.slideDown(), k == !1 && this.to_dungeon.css("display") != "none" && this.to_dungeon.slideUp(), c.health() <= 0 ? (this.resurrect.css("display") == "none" && this.resurrect.show(), this.miracle.hide(), this.to_dungeon.hide()) : this.resurrect.css
    ("display") != "none" && this.resurrect.hide(), c.godpower() >= 100 && c.accumulator() < 3 ? this.acc_charge.css("display") == "none" && this.acc_charge.show() : this.acc_charge.css("display") != "none" && this.acc_charge.hide();
    var q;
    this.acc_discharge.css("display") == "none" ? q = !1 : q = !0;
    var r = !1;
    c.accumulator() >= 1 && c.godpower() != c.max_gp() ? r = !0 : r = !1, this.acc_val.html() != c.accumulator() && (this.acc_progress.setProgress(c.accumulator()), this.acc_val.html(c.accumulator()), this.acc_val.clearQueue().glow(glow_color, glow_time)), (c.level() >= 5 || c.accumulator() > 0) && this.acc.show(), c.godpower() == c.max_gp() ? (this.discharge_action_sent = !1, this.acc_discharge.removeClass("div_link")) : (this.discharge_action_sent = !1, this.acc_discharge.addClass("div_link"));
    var s = c.stats.arena_god_cmd_disabled, t = c.stats.fight_end;
    if (c.is_fighting()) {
      var u = !0;
      s && s.value ? (this.remote_disabled_arena.clearQueue().show(), u = !1) : (this.remote_disabled_arena.hide(), u = !0), t && t.value ? (r = !1, this.remote_disabled_fight_over.clearQueue().show(), u = u && !1) : (this.remote_disabled_fight_over.hide(), u = u && !0, r = r && !0), u ? (this.actions.show(), (c.health() <= 0 || g < 5) && this.g_voice_line.css("display") != "none" && this.g_voice_line.slideUp(b), c.health() > 0 && g >= 5 && this.g_voice_line.css("display") == "none" && this.g_voice_line.slideDown(b)) : (this.g_voice_line.clearQueue().hide(), this.actions.clearQueue().hide()), c.arena_cmd_left() >= 0 && (this.limit_block.html(localize(Loc.arena_actions, {actions: c.arena_cmd_left()})), this.limit_block.css("display") == "none" && this.limit_block.fadeIn())
    } else this.limit_block.css("display") != "none" && this.limit_block.clearQueue().fadeOut(), (c.health() <= 0 || g < 5) && this.g_voice_line.css("display") != "none" && this.g_voice_line.slideUp(b), c.health() > 0 && g >= 5 && this.g_voice_line.css("display") == "none" && this.g_voice_line.slideDown(b);
    q == !1 && r ? this.acc_discharge.show() : r == !1 && q && this.acc_discharge.hide()
  }, g.first_call = !0, g.update.call(g), b.layout_changed = function () {
    var b = a.get_block_caption_by_parent_ref(this);
    $(this).parent().hasClass("c_col") ? b.html(Loc.control_b_capt) : b.html(Loc.control_b_capt_short)
  }, b.layout_changed.call(b);
  if (a.state.cmds) {
    a.state.cmds.v && a.state.cmds.v.length > 0 && (g.god_voice_action = !0, j.send_button.attr("disabled", "disabled"), j.voice_field.attr("disabled", "disabled"), j.voice_field.val(a.state.cmds.v)), a.state.cmds.i && (g.action_sent = !0, g.encourage.removeClass("div_link"), g.punish.removeClass("div_link"), g.miracle.removeClass("div_link"));
    if (a.state.cmds.a || a.state.cmds.f)g.action_sent = !0, g.to_arena.removeClass("div_link"), g.to_chf.removeClass("div_link");
    a.state.cmds.ar && (g.discharge_action_sent = !0, g.acc_discharge.removeClass("div_link"))
  }
  return g
}, UILib.prototype.pet_block = function (a, b, c, d, e) {
  c.attr("style", "display:none");
  var f = d;
  c.pet_name = a.nm.register("pet_name", this.simple_line(Loc.p_name_capt, "")), c.pet_name.appendTo(f), c.pet_name_edit = this.pet_name_edit_line(a.state, Loc.p_name_capt, a.state.pet.pet_name, !0), c.pet_name_edit.appendTo(f), c.pet_name.vc = b, c.pet_class = a.nm.register("pet_class", this.wiki_link_line(Loc.p_type_capt, Loc.pet_type_title, a.state.pet.pet_class)), c.pet_class.appendTo(f), c.pet_class.vc = b, c.pet_level = a.nm.register("pet_level", this.pet_level_line(Loc.p_level_capt, e)), c.pet_level.appendTo(f), c.pet_level.vc = b, c.pet_birthday_string = a.nm.register("pet_birthday_string", this.simple_line(Loc.p_age_capt, "")), c.pet_birthday_string.appendTo(f), c.pet_birthday_string.vc = b, c.pet_special = a.nm.register("pet_special", this.simple_line(Loc.p_special, "")), c.pet_special.appendTo(f), c.pet_special.vc = b, c.pet_is_dead = a.nm.register("pet_is_dead_str", this.pet_is_dead_line(b, Loc.p_status_capt, e)), c.pet_is_dead.appendTo(f), $('<div class="line"></div>').appendTo(f);
  var g = $('<div class="line"></div>').appendTo(f);
  c.store_pet = $("<a href='#' class='no_link div_link' style='display:none;text-align:center;'></a>").html(Loc.store_pet_link), c.store_pet.attr("title", Loc.store_pet_title), c.store_pet.appendTo(g), a.nm.register("store_pet", c), c.no_pet_msg = $("<div style='display:none;text-align:center;'></div>").html(Loc.ark_no_pet).appendTo(f);
  var g = $('<div class="line"></div>').appendTo(f);
  c.restore_pet = $("<a href='#' class='no_link div_link' style='display:none;text-align:center;'></a>").html(Loc.restore_pet_link), c.restore_pet.attr("title", Loc.restore_pet_title), c.restore_pet.appendTo(g), c.restore_pet.popover({
    header: "#pets_popover > .fh_header",
    content: "#pets_popover > .fh_content"
  }), c.restore_pet.click(function (b) {
    var d = $("#pets_popover_c");
    d.empty(), $(".fh_header").html(Loc.restore_pet_link);
    if (a.state.pets == undefined || a.state.pets.length == 0)d.append($('<div class="pets_line"></div>').html(Loc.no_stored_pets)); else for (var e = 0; e < a.state.stats.pets_max.value; e++) {
      var f = a.state.pets[e], g = $('<div class="pets_line"></div>');
      if (f == undefined)g.attr("style", "text-align:center"), g.html(Loc.pets_empty); else {
        var i = f.pet_class, j = $("<a>");
        j.attr("href", Loc.wiki_prefix + "/" + i), j.attr("target", "_blank"), j && j.attr("title", Loc.pet_type_title), j.html(i), j.click(function () {
          window.open(this.href);
          return !1
        });
        var k = [f.pet_name, j.outer()];
        f.pet_level && f.pet_level != "" && k.push(f.pet_level + " " + Loc.skill_level_end), f.pet_is_dead_str && f.pet_is_dead_str != "" && k.push(f.pet_is_dead_str);
        var l = $('<a href="#" class="no_link item_act_link_div"></a>').html("@"), m = Loc.restore_pet_link_no_gp, n = !1;
        a.state.a_cmd() ? (l.removeClass("div_link"), m = Loc.store_pet_pending) : a.state.godpower() >= 50 && (m = Loc.restore_pet_link_title, l.addClass("div_link"), n = !0);
        var o = function (b, c) {
          return function () {
            var d = confirm(localize(Loc.restore_pet_link_confirm, {name: b}));
            if (!d)return !1;
            h({action: "restore_pet", name: b, "class": c}, a), $.fn.popover.openedPopup.trigger("hidePopover")
          }
        };
        l.attr("title", m), g.html(k.join(", ") + " (").append(l).append(")"), n ? l.click(o(f.pet_name, f.pet_class)) : l.click(function (a) {
          a.preventDefault();
          return !1
        })
      }
      d.append(g)
    }
    c.restore_pet.trigger("showPopover");
    return !1
  }), c.pet_cmd = $('<div id="pcmd" style="display:none;" class="line"></div>').appendTo(f);
  var h = function (a, b) {
    var d = b.get_spinner(c);
    d.show(), old_gp = e.godpower(), $.ajax({
      type: "POST",
      url: base_api_url,
      data: {a: get_cmd_id("5JgMUahE1BYdtf7quoWz"), b: prepare_args(JSON.stringify(a))},
      success: function (a) {
        d.hide();
        var b = $("#pcmd");
        a.status != "success" ? (b.addClass("t_error"), a.display_string || (a.display_string = Loc.network_error)) : b.removeClass("t_error"), b.clearQueue(), b.html(a.display_string), b.slideDown().delay(7e3).slideUp()
      },
      dataType: "json",
      timeout: 15e3,
      complete: function (a, e) {
        if (e != "success") {
          d.hide();
          var f = $("#pcmd");
          f.addClass("t_error"), f.html(Loc.command_send_error), f.slideDown().delay(7e3).slideUp(), setTimeout(function () {
            var a = forced_update(b);
            a(), c.store_pet.addClass("div_link")
          }, 3e3)
        }
      }
    })
  };
  c.store_pet.click(function () {
    if (!$(this).hasClass("div_link"))return !1;
    var b = confirm(Loc.store_pet_confirm);
    if (!b)return !1;
    c.store_pet.removeClass("div_link");
    var d = h({action: "store_pet"}, a);
    d && c.store_pet.attr("title", Loc.store_pet_pending), event.preventDefault();
    return !1
  }), c.update = function () {
    var b = a.state.wood_cnt(), d = !1, f = !1;
    e.has_pet && (d = !0);
    if (e.has_pet || b >= 1e3) {
      b >= 1e3 && (c.restore_pet.show(), f = !0);
      if (b >= 1e3 && e.has_pet) {
        c.store_pet.show();
        var g = a.state.pets_max(), h = a.state.pets.length;
        g - h == 0 ? (c.store_pet.removeClass("div_link"), c.store_pet.attr("title", Loc.store_pet_full_title)) : a.state.a_cmd() ? (c.store_pet.removeClass("div_link"), c.store_pet.attr("title", Loc.store_pet_pending)) : e.godpower() >= 50 ? (c.store_pet.addClass("div_link"), c.store_pet.attr("title", Loc.store_pet_title)) : (c.store_pet.removeClass("div_link"), c.store_pet.attr("title", Loc.restore_pet_link_no_gp))
      } else c.store_pet.hide();
      for (idx in e.pet_keys) {
        var i = e.pet_keys[idx];
        if (this[i]) {
          var j = false;
          if (e.pet[i]) {
            if (this[i].css("display") == "none") {
              this[i].show();
              j = true
            }
          } else {
            this[i].hide()
          }
          var k = this[i].v_obj;
          this[i].v_obj = e.pet[i];
          if (k == "" || e.pet[i] && e.pet[i].s == "upd" || k && e.pet[i] && e.pet[i]["value"] != k["value"]) {
            j = true
          }
          if (j) {
            if (i == "pet_name") {
              this["pet_name_edit"].v_obj = e.pet[i];
              this["pet_name_edit"].update()
            }
            this[i].update()
          }
        }
      }
      if (this.first_run) {
        this.first_run = false;
        c.no_pet_msg.hide();
        this.show()
      } else {
        c.no_pet_msg.hide();
        this.fadeIn()
      }
      e.pet && e.pet.pet_rename && e.pet.pet_rename.value == !0 ? (c.pet_name_edit.show(), c.pet_name.hide()) : (c.pet_name.show(), c.pet_name_edit.hide())
    }
    if (!d && this.css("display") != "none") {
      for (idx in e.pet_keys) {
        var i = e.pet_keys[idx];
        this[i] && (this[i].hide(), i == "pet_name" && this.pet_name_edit.hide()), c.no_pet_msg.show()
      }
      f || this.fadeOut()
    }
  }, c.first_run = !0, a.nm.register("has_pet", c), c.update.call(c)
}, UILib.prototype.create_map = function (a, b) {
  var c = $("<div style='margin:0.2em 0.5em 0.5em 0.5em;'></div>"), d = a.state, e = null;
  d.stats.daura && d.stats.daura.value && d.stats.daura.value.length > 0 && (e = $("<div style='text-align:center;'></div>").appendTo(c).html(d.stats.daura.value));
  var f = $("<div style='padding:7px 0 7px 0;overflow-x:auto;'></div>").appendTo(c);
  c.update = function () {
    d.d_map.length > 0 && (e == null && a.state.stats.daura && a.state.stats.daura.value && a.state.stats.daura.value.length > 0 && (e = $("<div style='text-align:center;'></div>").appendTo(c).html(a.state.stats.daura.value)), f.empty(), $.each(a.state.d_map, function (a, b) {
      var c = b.length * 20 + b.length, d = $("<div class='dml'></div>").attr("style", "width:" + c + "px").appendTo(f);
      $.each(b, function (a, b) {
        var c = $("<div class='dmc'></div>").html(b);
        b == "@" && c.addClass("map_pos"), c.appendTo(d)
      })
    }))
  }, c.update();
  var g = $("<div class='div_link map_legend'></div>").appendTo(c).html(Loc.map_legend), h = $("<div style='display:none;padding-top:0.5em;margin-left:70px;'></div>").appendTo(c);
  $("<div></div>").appendTo(h).html(Loc.map_legend_pos), $("<div></div>").appendTo(h).html(Loc.map_legend_exit), $("<div></div>").appendTo(h).html(Loc.map_legend_wall), $("<div></div>").appendTo(h).html(Loc.map_legend_unknown), $("<div></div>").appendTo(h).html(Loc.map_legend_exclam), $("<div></div>").appendTo(h).html(Loc.map_legend_s_room), g.click(function () {
    h.toggle()
  });
  return c
}, UILib.prototype.pantheons_block = function (a, b, c, d, e, f, g) {
  b.panth_search = $("<div class='line' id='pantheons_content'></div>"), b.panth_search.html(Loc.pantheons_search), b.append(b.panth_search), b.created = !1;
  var h;
  if (d) {
    h = a.blocks.pantheons;
    var i = function (a, b) {
      return function () {
        var b = a.get_spinner(h);
        b.show(), a.pantheons.fetch_updates.apply(a.pantheons, [a.pantheons, function (a) {
          b.hide()
        }])
      }
    }, j = a.get_right_slot_by_parent_ref(h), k = $("<span style='display:none;' class='refresh_ch'>↻</span>").prependTo(j);
    k.addClass("header_cursor"), k.attr("title", Loc.p_refresh_title), k.click(i(a, j))
  }
  var l = function (b, c, d, e, f) {
    var g = b[c];
    g == undefined && (g = $('<div class="p_group"></div>').appendTo(b), b[c] = g);
    var h = 0;
    $.each(d.data, function (a, b) {
      b.position != "−" && (h = h + 1)
    }), g.css("display") == "none" && h > 0 ? g.show() : g.css("display") != "none" && h == 0 && g.hide(), f || g.addClass("p_group_sep");
    var i = a;
    $.each(d.data, function (a, b) {
      if (b) {
        var c = g["pnth" + b.id];
        if (c == undefined) {
          var d = $('<div class="line panth_line"></div>').appendTo(g);
          b.position == "−" && d.hide(), g["pnth" + b.id] = d, d.p_capt = $('<div class="panth_capt"></div>').html(b.name).appendTo(d), d.p_pos = $('<div class="panth_val"></div>');
          var f = $("<a></a>");
          f.attr("href", "/pantheon/show/" + b.l), d.p_pos.attr("title", Loc.pantheons_place_title), f.html(b.position), f.click(function () {
            window.open(this.href);
            return !1
          }), d.p_pos.append(f);
          var h = $('<div class="p_pos"></div>');
          e && e.data && e.data[a] && b.position != "−" && e.data[a].position != "−" && e.data[a].position != b.position && (e.data[a].position > b.position ? (h.addClass("p_pos_plus"), h.html("+" + (e.data[a].position - b.position))) : e.data[a].position < b.position && (h.addClass("p_pos_minus"), h.html("−" + (b.position - e.data[a].position))), h.attr("title", Loc.pantheons_place_change)), d.p_hist = h, d.append(h), d.p_pos.appendTo(d)
        } else b.s == "upd" && (b.s = "processed", c.p_capt.html(b.name), c.p_pos.children("a").html(b.position), c.css("display") == "none" && b.position != "−" ? c.show() : c.css("display") != "none" && b.position == "−" && c.hide(), c.p_hist && (e && e.data && e.data[a] && b.position != "−" && e.data[a].position != "−" && e.data[a].position != b.position ? (c.p_hist.removeClass("p_pos_plus"), c.p_hist.removeClass("p_pos_minus"), e.data[a].position > b.position ? (c.p_hist.addClass("p_pos_plus"), c.p_hist.html("+" + (e.data[a].position - b.position))) : e.data[a].position < b.position && (c.p_hist.addClass("p_pos_minus"), c.p_hist.html("−" + (b.position - e.data[a].position)))) : c.p_hist.html("")), c.glow(glow_color, glow_time))
      }
    })
  };
  b.update = function () {
    b.created || (b.panth_search.hide(), b.created = !0);
    if (e) {
      if (e() == !1) {
        var d = a.pantheons.get_new_cnt();
        d > 0 ? f(d) : g();
        return
      }
      g()
    }
    var h = 0, i = !1, j = 0;
    for (group_id in a.pantheons.pantheons)$.each(a.pantheons.pantheons[group_id].data, function (a, b) {
      b.position != "−" && (j = j + 1)
    });
    if (j == 0)if (!b.panth_empty) {
      var k = Loc.pantheons_bl7;
      c.level() >= 7 && (k = Loc.pantheons_no_places), b.panth_empty = $('<div style="text-align:center;"></div>').html(k), b.append(b.panth_empty)
    } else b.panth_empty.css("display") == "none" && b.panth_empty.show(); else {
      b.panth_empty && b.panth_empty.css("display") != "none" && b.panth_empty.hide();
      for (group_id in a.pantheons.pantheons)h += 1, h == a.pantheons.group_cnt && (i = !0), l(b, group_id, a.pantheons.pantheons[group_id], a.pantheons.old_pantheons[group_id], i)
    }
  }, a.nm.register("pantheons", b), a.pantheons.check_for_updates.call(a.pantheons) || b.update.call(b), h && (h.layout_changed = function () {
    var b = a.get_block_caption_by_parent_ref(this);
    $(this).parent().hasClass("c_col") ? b.html(Loc.pantheons_b_capt) : b.html(Loc.pantheons_b_capt_short)
  }, h.layout_changed.call(h));
  return b
}, UILib.prototype.equipment_line = function (a, b, c, d) {
  var e = $("<div class='line eq_line'></div>");
  e.attr("id", "eq_" + b), e.v_obj = d, e.capt = $("<div class='eq_capt'>" + c + "</div>").appendTo(e), e.level = $("<div class='eq_level'>" + d.level + "</div>").appendTo(e), e.iname = $("<div class='eq_name'>" + d.name + "</div>").appendTo(e), e.update = function () {
    var b = this.v_obj;
    if (a && a.is_visible && a.is_visible("equip") == !1) {
      this.first_run = !1;
      return !1
    }
    this.v_obj.s == "upd" && (b.s = "processed", b.level == null ? this.iname.css("display") != "none" && (this.iname.fadeOut(), this.level.addClass("eq_empty"), this.level.html(b.name), this.iname.html(""), jQuery(this.iname).clearQueue().glow(glow_color, glow_time)) : (this.level.html() != b.level && (this.level.html(b.level), this.iname.css("display") == "none" && (this.level.removeClass("eq_empty"), this.iname.fadeIn()), this.first_run == !1 && jQuery(this.level).clearQueue().glow(glow_color, glow_time)), this.iname.html() != b.name && (this.iname.html(b.name), jQuery(this.iname).clearQueue().glow(glow_color, glow_time)), this.iname.html() == b.name && this.level.html() == b.level && this.first_run == !1 && (jQuery(this.iname).clearQueue().glow(glow_color, glow_time), jQuery(this.level).clearQueue().glow(glow_color, glow_time)))), this.first_run = !1
  }, e.first_run = !0, e.update.call(e);
  return e
}, UILib.prototype.equipment_block = function (a, b, c, d, e) {
  a.nm.register(e, this.equipment_line(b, 0, Loc.eq_weapon, d.weapon)).appendTo(c), a.nm.register(e, this.equipment_line(b, 1, Loc.eq_shield, d.shield)).appendTo(c), a.nm.register(e, this.equipment_line(b, 2, Loc.eq_head, d.head)).appendTo(c), a.nm.register(e, this.equipment_line(b, 3, Loc.eq_body, d.body)).appendTo(c), a.nm.register(e, this.equipment_line(b, 4, Loc.eq_arms, d.arms)).appendTo(c), a.nm.register(e, this.equipment_line(b, 5, Loc.eq_legs, d.legs)).appendTo(c), a.nm.register(e, this.equipment_line(b, 6, Loc.eq_talisman, d.talisman)).appendTo(c), $('<div class="line"></div>').appendTo(c)
}, UILib.prototype.create_skills = function (a, c) {
  var d = c.skills;
  b = $("<div class='skills_block' id='s_b_id'></div>");
  var e = function (a) {
    var b = $("<li></li>"), c = $('<span class="skill_name"></span>').html(a.name);
    b.append(c);
    var d;
    Loc.locale == "en" ? d = Loc["skill_" + a.type] + " " + Loc.skill_level_end + " " + a.level : d = Loc["skill_" + a.type] + " " + a.level + " " + Loc.skill_level_end;
    var e = $('<span class="skill_info"></span>').html(d);
    b.append(e), b.s_level = a.level, a.span = e, a.li = b;
    return b
  }, f = [];
  for (skill_name in d) {
    var g = d[skill_name];
    f[g.pos] = g
  }
  b.no_skills = $('<div class="line" id="no_skills"></div>').html(Loc.no_skills), f.length > 0 && b.no_skills.attr("style", "display:none;"), b.append(b.no_skills), b.list = $("<ul>").appendTo(b);
  for (idx in f) {
    var h = f[idx], i = e(h);
    b.list.append(i)
  }
  b.update = function () {
    var b = [], c = [], f = [], g = [];
    $.each(d, function (d, e) {
      e && (e.pos != -1 && (b[e.pos] = e), e.s == "add" || e.s == "upd" && !e.li ? e.li == undefined ? f[e.pos] = e : a && a.is_visible && a.is_visible("skills") == !0 && (e.s = "processed") : e.s == "del" ? c.push(e) : e.s == "upd" && (g[e.pos] = e))
    }), b.length > 0 ? this.no_skills.hide() : this.no_skills.show(), $.each(c, function (a, b) {
      b && (b.s = "deleting", b.li && b.li.hide())
    });
    if (a && a.is_visible && a.is_visible("skills") == !1)return !1;
    var h = this;
    $.each(f, function (a, c) {
      if (c) {
        c.s = "processed";
        var d = e(c);
        b.length == 0 ? h.list.append(d) : c.pos == 0 ? d.prependTo(h.list) : d.appendTo(h.list), d.show(500), d.glow(glow_color, glow_time)
      }
    }), $.each(g, function (a, b) {
      if (b) {
        var c = b.li;
        c ? (b.s = "processed", b.li = e(b), c.replaceWith(b.li), c.s_level != b.level && $(b.span).glow(glow_color, glow_time)) : delete b
      }
    })
  }, b.update.call(b);
  return b
}, UILib.prototype.create_arena_turn_progress = function (a, b) {
  var c = $("<div id='turn_pbar' class='line' style='margin-bottom:1.0em;'></div>"), d = b.turn_progress, e = b.turn_length;
  c.stats = b, c.arena_step_count = b.arena_step_count, c.progress_bar = this.progress_bar(Loc.pr_duel), c.progress_bar.setColor("#B3BDC8"), c.progress_bar.setProgressNoAnim(d.value);
  var f = parseInt(e.value), g = f * d.value / 100, h = f - g;
  ar_pb_update = function (a, b, d, e) {
    var f = !1, g = !1;
    return function () {
      if (b && b.value != undefined) {
        b.value = b.value + d;
        if (b.value <= 100)f = !1, g = !1, b.value > 100 && (b.value = 100), c.progress_bar.setProgressNoAnim(b.value); else if (b.value > 103) {
          if (f == !1) {
            var a = forced_update(e);
            a(), f = !0
          }
        } else if (b.value > 115 && g == !1) {
          var a = forced_update(e);
          a(), g = !0
        }
      }
    }
  };
  var i = 300, j = 100 / (f * 1e3 / i);
  c.interval_id = setInterval(ar_pb_update(f, d, j, a), i), c.sm = a, c.progress_bar.attr("title", ""), c.append(c.progress_bar), c.update = function () {
    gv_log("turn progress update");
    var a = !1, b = parseInt(this.stats.turn_length.value), c
  };
  return c
}, UILib.prototype.create_arena_fight_log = function (a) {
  var b = a.a_blocks.m_fight_log, c = a.get_a_block_content("m_fight_log"), d = a.get_block_caption_by_parent_ref(b);
  log_header_up = function (a, b) {
    return function () {
      var c = "";
      a.fight_type() == "town" ? c = Loc.duel_arena_capt : a.fight_type() == "challenge" ? c = Loc.duel_challenge_capt : a.fight_type() == "dungeon" ? c = Loc.duel_dungeon_capt : a.fight_type() == "monster" || a.fight_type() == "monster_m" || a.fight_type() == "multi_monster" ? c = Loc.duel_monster_capt : c = Loc.duel_arena_travel, a.stats.arena_step_count && a.stats.arena_step_count.value && (c += localize(Loc.dual_arena_step, {step: a.stats.arena_step_count.value})), b.html(c)
    }
  }, d.update = log_header_up(a.state, d), d.update(), a.nm.register("arena_step_count", d);
  var e = this.create_arena_turn_progress(a, a.state.stats);
  a.nm.register("turn_progress", e), a.d_sort.value == "up" && e.appendTo(c);
  var f = !0;
  window.fb_frame && (f = !0), a.nm.register("m_fight_log", this.create_diary(a, b, a.state.a_fight_log, a.state.godname(), a.d_sort, f)).appendTo(c), $('<div class="line"></div>').appendTo(c), a.d_sort.value == "down" && e.appendTo(c)
}, UILib.prototype.make_title_line = function (a, b, c, d) {
  var e, f;
  a && a.value == "female" ? f = Loc.window_title_hf : f = Loc.window_title_hm, b && b.value == "female" ? e = Loc.window_title_gf : e = Loc.window_title_gm;
  return c ? localize(Loc.window_title, {godname: c.value, god_gender: e, hero_gender: f, hero_name: d.value}) : d.value
}, UILib.prototype.create_invite_friends_panel = function (a, b) {
  var c = !1, d = !1;
  b.click(function () {
    $(".frbutton_m_pressed").trigger("click"), c = !0, jQuery.facebox.settings.closeImage = "/images/closelabel.png", jQuery.facebox.settings.loadingImage = "/images/loading.gif", jQuery.facebox({div: "#page_settings"});
    var a = $("#facebox");
    jQuery("div#facebox div.popup div.content").addClass("spage"), a.draggable({opacity: .5});
    return !1
  }), $(document).bind("afterClose.facebox", function () {
    d && (c = !1, d = !1)
  }), $(document).bind("beforeReveal.facebox", function () {
    if (c && d == !1) {
      jQuery("div#facebox div.popup div.content").empty();
      var b = jQuery("div#facebox div.popup div.content");
      d = !0, b.append(jQuery("<h2></h2>").html(Loc.fb_fr_invite_header));
      var e = jQuery('<div class="set_line" id="ps_footer"></div>');
      e.update = function () {
        var c = localize(Loc.fb_fr_invites_desc, {count: a.state.invites_left()});
        $(this).html(c).appendTo(b)
      }, e.update(), a.nm.register("invites_left", e);
      var f = $('<textarea class="input_text" cols="16" id="fb_invite_message" name="invite_message" rows="4" wrap="virtual;"></textarea>');
      f.html(Loc.invite_message);
      var g = $('<div class="set_line fr_inv_first"></div>');
      $('<div class="fb_rb_msg_i_w"></div>').append($("<div></div>").html(Loc.fr_invites_message)).appendTo(g), g.append(f), b.append(g), b.append(jQuery("<h4></h4>").html(Loc.fb_fr_invite_fb_header));
      var h = $('<div border="0" align="middle" style="displa:none;position:absolute;right:25px;top:30px;" class="spinner_img"></div>').appendTo(b), i = $("<ul></ul>"), j = $('<div class="set_line"</div>'), k = $("<input class='input_text fr_inv_filt' type='text'></input>");
      k.attr("placeholder", Loc.friend_filter_placeholder), k.change(function () {
        var a = $(this).val();
        if (a) {
          i.find("li:not(:contains_i(" + a + "))").hide();
          var b = i.find("li:contains_i(" + a + ")").slice(0, 10);
          b.show()
        } else i.find("li").show()
      }).keyup(function () {
        $(this).change()
      }), j.append(k), b.append(j), b.append($('<div id="fr_inv_status" class="set_line"></div>')), b.append(i), b.append(jQuery('<h4 class="fr_inv_normal_header"></h4>').html("... or Invite by email or godname"));
      var l = $('<input autocomplete="off" id="fb_invite_email" name="invite_email" type="text" value="" class="input_text"></input>');
      l.attr("placeholder", Loc.invites_email_name);
      var m = $('<input type="submit" id="fb_invite_submit"></input>');
      m.attr("value", Loc.invites_send_button), m.click(function () {
        m.attr("disabled", "disabled"), h.show();
        var b = {email: jQuery("#fb_invite_email").val(), msg: jQuery("#fb_invite_message").val(), b: !0};
        $.post(base_api_url, {a: get_cmd_id("54pcE5UCp82zxcEQcBwj"), b: prepare_args(JSON.stringify(b))}, function (b) {
          h.hide();
          var c = $("#fb_invite_error");
          if (b.status != "success")c.addClass("error"), c.removeClass("success"), b.desc || (b.desc = Loc.network_error); else {
            c.removeClass("error"), c.addClass("success"), $("#fb_invite_email").val("");
            var d = forced_update(a);
            d()
          }
          c.show(), c.html(b.desc), setTimeout(function () {
            c.fadeOut()
          }, 3e3), $("#fb_invite_submit").removeAttr("disabled")
        })
      });
      var n = $('<div id="fb_invite_error" class="set_line"></div>');
      $('<div class="set_line"></div>').append(l).append(m).append(n).appendTo(b), h.show(), FB.api("me/friends", function (b) {
        h.hide();
        var c = b.data.sort(function (a, b) {
          var c = a.name.toLowerCase(), d = b.name.toLowerCase();
          if (c < d)return -1;
          if (c > d)return 1;
          return 0
        });
        for (var d in c) {
          var e = c[d], f = $('<li class="fb_fr_list_item"></li>'), g = $('<div class="fb_fr_list_item_d"></div>').appendTo(f);
          g.append('<img class="fb_fr_img" src="' + window.location.protocol + "//" + "graph.facebook.com/" + e.id + '/picture"></img>');
          var j = $('<div class="div_link_nu"></div>').text(e.name);
          g.append($('<div class="fb_fr_list_name_w"></div>').append(j));
          var k = function (b) {
            return function () {
              var c = confirm(localize(Loc.fr_fr_invite_confirm, {name: b.name}));
              if (!c)return !1;
              h.show(), $.post(base_api_url, {
                a: get_cmd_id("bk1yXKUzxwWKvsQOtpt5"),
                b: prepare_args(JSON.stringify({uid: b.id}))
              }, function (c) {
                h.hide();
                var d = c.status, e = $("#fr_inv_status");
                if (d == "not_friend") {
                  var f = $("#fb_invite_message").val();
                  FB.ui({method: "apprequests", to: b.id, message: f, data: ""}, function (c) {
                    c != null && $.post(base_api_url, {
                      a: get_cmd_id("xAZqO7epAERoAsmUTDFj"),
                      b: prepare_args(JSON.stringify({uid: b.id}))
                    }, function (b) {
                      var c = b.status;
                      if (c == "success") {
                        e.addClass("success"), e.removeClass("error"), e.html(Loc.fb_fr_invite_send);
                        var d = forced_update(a);
                        d()
                      } else e.addClass("error"), e.removeClass("success"), e.html(Loc.fb_fr_invite_error);
                      e.clearQueue().show(), setTimeout(function () {
                        e.fadeOut()
                      }, 3e3)
                    })
                  })
                } else {
                  var f;
                  d == "success" ? (f = Loc.fb_fr_invite_success, e.addClass("success"), e.removeClass("error")) : d == "already_friend" ? (f = Loc.fb_fr_invite_af, e.addClass("success"), e.removeClass("error")) : (d == "no_invites" ? f = Loc.fb_fr_invite_ni : d == "error" && (f = Loc.fb_fr_invite_error), e.addClass("error"), e.removeClass("success")), e.html(f), e.clearQueue().show(), setTimeout(function () {
                    e.fadeOut()
                  }, 3e3)
                }
              })
            }
          };
          f.click(k(e)), i.append(f)
        }
      })
    }
  });
  return !1
}, UILib.prototype.shop_name_edit_line = function (a, b, c, d) {
  var e = this.simple_line(b, c);
  if (d) {
    var f = $('<span class="motto_edit_sym div_link_nu">✎</span>');
    f.attr("title", Loc.set_shop_name_title), e.c_e.append(f);
    var g = function (a) {
      return function () {
        a.show()
      }
    }, h = function (a) {
      return function () {
        a.hide()
      }
    };
    e.edit_line = $('<div class="motto_edit"></div>'), e.edit_line.hide();
    var i = $('<input autocomplete="off" id="shop_name_input" type="text" value="" class="input_text"></input>');
    e.edit_line.append(i), e.edit_save = $('<div class="motto_edit_control">✓</div>').attr("title", Loc.pet_name_save_title), e.edit_cancel = $('<div class="motto_edit_control div_link">✕</div>').attr("title", Loc.pet_name_cancel_title), e.save_spinner = $('<div border="0" align="middle" style="float:left;padding-top:8px;" class="spinner_img"></div>');
    var j = function () {
      return function () {
        e.edit_line.slideUp()
      }
    };
    e.edit_cancel.click(j()), e.status_line = $('<div class="motto_status error"></div>'), e.edit_line.append(e.edit_save), e.edit_line.append(e.save_spinner), e.edit_line.append(e.edit_cancel), e.edit_line.append(e.status_line), e.edit_line.append($("<div></div>").text(Loc.set_shop_name_desc)), e.append(e.edit_line);
    var k = function (a) {
      return function () {
        if (a.edit_save.hasClass("div_link") != !1) {
          var b = $("#shop_name_input").val(), d = confirm(localize(Loc.shop_rename_confirm, {name: b}));
          d && (a.save_spinner.show(), a.edit_save.hide(), $.post(base_api_url, {
            a: get_cmd_id("NYysRCyzpcMWbRpShXQy"),
            b: prepare_args(JSON.stringify({name: b}))
          }, function (d) {
            var e = d.status;
            e == "success" ? (c.value = b, a.v_e.text(localize(Loc.shop_name_tmpl, {name: b})), a.edit_line.slideUp(), a.status_line.html("")) : d.desc && a.status_line.html(d.desc), a.save_spinner.hide(), a.edit_save.show()
          }))
        }
      }
    };
    i.keyup("keypress", function (a) {
      var b = a.keyCode ? a.keyCode : a.which;
      if (b == 13) {
        var c = k(e);
        c()
      } else if (b == 27) {
        var c = j();
        c()
      } else {
        var d = $("#shop_name_input").val();
        e.last_value == d ? e.edit_save.removeClass("div_link") : (e.status_line.html(""), e.edit_save.addClass("div_link"))
      }
    }), e.edit_save.click(k(e));
    var l = function () {
      return function () {
        var a = "";
        i.val(a), e.edit_line.css("display") == "none" && (e.last_value = a, $("#shop_name_input").val(e.last_value), e.status_line.html(""), e.edit_line.slideDown(), e.edit_save.removeClass("div_link"), e.save_spinner.hide(), e.edit_save.show(), $("#shop_name_input").focus())
      }
    };
    e.v_e.click(l()), f.click(l())
  }
  return e
}, UILib.prototype.trader_block = function (a, b, c, d, e) {
  if (!e.trader_av())c.attr("style", "display:none"); else {
    var f = d;
    c.shop_name = this.shop_name_edit_line(a.state, Loc.shop_name, {value: localize(Loc.shop_name_tmpl, {name: e.stats.shop_name.value})}, e.shop_rename()), c.shop_name.appendTo(f), c.t_level = a.nm.register("t_level", this.line_w_progress(Loc.tlevel_capt, e.stats.t_level, e.stats.t_level_pr, "#F9B436", Loc.pr_level)), c.t_level.appendTo(f);
    var g = $('<div class="line"></div>').appendTo(f);
    c.send_shop = $("<a href='#' class='no_link div_link' style='display:none;text-align:center;'></a>").html(Loc.send_shop), c.send_shop.attr("title", Loc.send_shop_title), c.send_shop.appendTo(g), c.send_shop.click(function (b) {
      b.preventDefault();
      if (!!c.send_shop.hasClass("div_link")) {
        var d = confirm(Loc.send_shop_link_confirm);
        if (!d)return !1;
        h({action: "send_trader"}, c.send_shop, a)
      }
    });
    var g = $('<div class="line"></div>').appendTo(f);
    c.restore_shop = $("<a href='#' class='no_link div_link' style='display:none;text-align:center;'></a>").html(Loc.restore_shop), c.restore_shop.attr("title", Loc.restore_shop_title), c.restore_shop.appendTo(g), c.restore_shop.click(function (b) {
      b.preventDefault();
      if (!!c.restore_shop.hasClass("div_link")) {
        var d = confirm(Loc.restore_shop_link_confirm);
        if (!d)return !1;
        h({action: "stop_trader"}, c.send_shop, a)
      }
    }), a.nm.register("t_cmd", c), a.nm.register("godpower", c);
    var h = function (a, b, d) {
      var f = d.get_spinner(c);
      f.show(), b.removeClass("div_link"), old_gp = e.godpower(), $.ajax({
        type: "POST",
        url: base_api_url,
        data: {a: get_cmd_id("5JgMUahE1BYdtf7quoWz"), b: prepare_args(JSON.stringify(a))},
        success: function (a) {
          f.hide();
          var b = $("#tordr");
          a.status != "success" ? (b.addClass("t_error"), a.display_string || (a.display_string = Loc.network_error)) : b.removeClass("t_error"), b.clearQueue(), b.html(a.display_string), b.slideDown().delay(7e3).slideUp()
        },
        dataType: "json",
        timeout: 15e3,
        complete: function (a, c) {
          if (c != "success") {
            f.hide();
            var e = $("#tordr");
            e.addClass("t_error"), e.html(Loc.command_send_error), e.slideDown().delay(7e3).slideUp(), setTimeout(function () {
              var a = forced_update(d);
              a(), b.addClass("div_link")
            }, 3e3)
          }
        }
      })
    }, g = $('<div class="line"></div>').appendTo(f);
    c.show_order = $("<a href='#' class='no_link div_link' style='text-align:center;'></a>").html(Loc.show_orders_link), c.show_order.attr("title", Loc.show_orders_link_title), c.show_order.appendTo(g), c.show_order_cmd = $('<div id="tordr" style="display:none;" class="line"></div>').appendTo(f), c.orders = $("<div></div>").appendTo(f);
    var i = function (b) {
      return function (d) {
        var e = a.get_spinner(c);
        e.show(), $.ajax({
          type: "POST",
          url: base_api_url,
          data: {a: get_cmd_id("CnV5dUTEijtCky822p0Z"), b: prepare_args(JSON.stringify({artifact: b}))},
          success: function (a) {
            e.hide();
            var d = $("#tordr");
            a.status != "success" ? (d.addClass("t_error"), a.display_string || (a.display_string = Loc.network_error), d.clearQueue(), d.html(a.display_string), d.slideDown().delay(7e3).slideUp()) : (d.removeClass("t_error"), d.hide()), c.orders.empty(), c.orders.append($('<div style="text-align:center;"></div>').text(localize(Loc.order_pending, {order: b})))
          },
          dataType: "json",
          timeout: 15e3,
          complete: function (a, b) {
            if (b != "success") {
              e.hide();
              var c = $("#tordr");
              c.addClass("t_error"), c.html(Loc.command_send_error), c.slideDown().delay(7e3).slideUp()
            }
          }
        }), d.preventDefault(), d.stopPropagation();
        return !1
      }
    };
    c.show_order.click(function (b) {
      var d = a.get_spinner(c);
      d.show(), $.ajax({
        type: "POST",
        url: base_api_url,
        data: {a: get_cmd_id("NOi5hcPevRWvkbhsW5z5")},
        success: function (a) {
          d.hide();
          var b = $("#tordr");
          a.status != "success" ? (b.addClass("t_error"), a.display_string || (a.display_string = Loc.network_error), b.clearQueue(), b.html(a.display_string), b.slideDown().delay(7e3).slideUp()) : (b.removeClass("t_error"), b.hide()), c.orders.empty();
          if (a.active)c.orders.append($('<div style="text-align:center;"></div>').text(localize(Loc.order_pending, {order: a.active}))); else if (a.orders) {
            a.orders.length > 0 && $("<div></div>").html(Loc.orders_header).appendTo(c.orders);
            var f = $("<ul id='t_orders'></ul>").appendTo(c.orders);
            $.each(a.orders, function (a, b) {
              var c = $("<li></li>").text(b), d = $('<a href="#" class="no_link item_act_link_div"></a>').html("@"), g, h = !1;
              e.godpower() >= 50 ? (g = Loc.order_activate_title, d.addClass("div_link"), h = !0) : g = Loc.order_activate_no_gp_title, d.attr("title", g);
              var j = $('<div class="item_act_link_div"></div>').html(" (").append(d).append(")");
              h ? d.click(i(b)) : d.click(function (a) {
                a.preventDefault();
                return !1
              }), c.append(j), c.appendTo(f)
            })
          }
        },
        dataType: "json",
        timeout: 15e3,
        complete: function (b, e) {
          if (e != "success") {
            d.hide();
            var f = $("#tordr");
            f.addClass("t_error"), f.html(Loc.command_send_error), f.slideDown().delay(7e3).slideUp(), setTimeout(function () {
              var b = forced_update(a);
              b(), c.show_order.addClass("div_link")
            }, 3e3)
          }
        }
      }), b.preventDefault()
    }), c.update = function () {
      c.restore_shop.addClass("div_link"), e.godpower() >= 50 ? c.send_shop.addClass("div_link") : c.send_shop.removeClass("div_link"), e.t_cmd() == 1 ? (c.send_shop.show(), c.restore_shop.hide()) : e.t_cmd() == 2 ? (c.send_shop.hide(), c.restore_shop.show()) : (c.send_shop.show(), c.send_shop.removeClass("div_link"), c.restore_shop.hide())
    }, c.first_run = !0, c.update.call(c)
  }
};
var glow_color = "#D4D4D4", glow_time = 3e3, base_api_url;
$(document).ready(function () {
  base_api_url = window.location.protocol + "//" + window.gv_domain + window.gv_port + "/fbh/feed"
});
var forced_update = function (a) {
  return function () {
    $.post(base_api_url, {a: get_cmd_id("m5S1KBfBxKhNWuu61EjC")}, function (b) {
      b && b.status == "success" && b.hero && a.on_json.apply(a, [b])
    })
  }
}, status_check = function (a) {
  return function () {
    $.post(base_api_url, {a: get_cmd_id("u2iZlzPPsST6a7jhFg4y")}, function (b) {
      b && b.status == "success" && b.hero && a.on_json.apply(a, [b])
    })
  }
}, set_msg_update = function (a) {
  if (a.force_msg_update_timer != 0)gv_log("forced message update already scheduled. ignore."); else {
    var b = function (a) {
      return function () {
        $.post(base_api_url, {a: get_cmd_id("G4LFOuNINtvAFR1pJXTy")}, function (b) {
          b && b.status == "success" && b.hero && (gv_log("fire forced messages update"), a.force_msg_update_timer = 0, a.on_json.apply(a, [b]))
        })
      }
    };
    gv_log("scheduling forced message update."), a.force_msg_update_timer = setTimeout(b(a), 3e3)
  }
}, prepare_args = function (a) {
  return randomstring(5) + Gcv.encode(a) + randomstring(3)
}, get_cmd_id = function (a) {
  keys = {
    Bja2XQ1F4t9uo9YNkrTH: "ulcZnxiDtNpgwrFSHHYC",
    "3hOqa3hA2Gjh7tEWSD5T": "9W1f6FIbcM8jgpgaKZy5",
    KztXWDej9YxdBu0LCMUf: "SO9ibG1N6FlxSvmZpUjt",
    fjQtRFHERdTEvAbY3p2m: "A33kQDcbmpBC39ocBMVU",
    m5S1KBfBxKhNWuu61EjC: "OZGK7ior8w2omUIsNhZ6",
    AJ53peA1Kl3eoRv1fnbW: "ywCvjEbxoW9YSaLT7vKD"
    ,
    agQHqM4rCoT0CaDvq44I: "2ahcM6oMrfS4DfuMyv1g",
    "54pcE5UCp82zxcEQcBwj": "Vy0FUsHs0T6sqqDFobCW",
    lvBuKwP7tQetJZNXXQx7: "9tUdvaq6kWLAKOMcadwv",
    "5JgMUahE1BYdtf7quoWz": "YFQT8EtYAQwiIgmiUA2V",
    QCFRPkOrNhNB5tAZhEy5: "pkZ8dUzy0spUvy5XyYs4",
    IPzdqJ1FIhISEEKnlYrl: "77b3f1WgtjPlNfuyUAjN",
    GJyYqhQtKRYCWFp1UwM5: "m7q8iLgRil1tzkjfG0x5",
    QfW08b8BVphsw65Adv5D: "dp9iHgnA8OonwksM1I88",
    QBx5eknHRruO94WLhxCR: "LGyLLcJCYKHurUUgtNQN",
    G4LFOuNINtvAFR1pJXTy: "GDz5mXXypczssAYGjAty",
    u2iZlzPPsST6a7jhFg4y: "jka7nYaMz1ZIhYwQ2Pge",
    ARKYteoAvq5ne3JfYpcV: "UZayz1EYe6TLXl5Xbyxa",
    bk1yXKUzxwWKvsQOtpt5: "wEUvcdWI5QM29n74dMkT",
    xAZqO7epAERoAsmUTDFj: "15d2cp5A2iv5YLX55d0Q",
    WzCGcLhzgkHj35wake2c: "OcRy0XlLkHJVL16opNws",
    z0uVDOyRiCLKIBhDnnVw: "f7dbXWvYXCCPfQLIfvmt",
    oTSzzK6ZYFu0a4N7lDu1: "PH36fkU0nUsrs0e8LiF5",
    "66LpWTKQaNrTqvRxNCvW": "bYadpk6N29nhUVojiH34",
    dg3yOKCzGwdKvsTOtdt4: "iNCaDWOi15wJs4uFJJvI",
    nYrBGlddZVxNgxJLFffQ: "MRsaFLGpTaPol6FFhAtS",
    "7Ub7bq4b4fKpsydXuVOm": "3GGcSQqPm4DC1ynsBr8l",
    VLL6RhIsTFlKlHly3rUb: "F3fmZRhSir9QJJe8PPHn",
    vS9Mnm48PCKUaKPuwod6: "KwkC3rjUcffkbpCIaxfO",
    R2jD74ywz4d7QXjcQ75r: "QPxZTriOpbZ2uQ220Y2a",
    W9jcR9yqvGlLvyfCi12v: "l3SMK7bFCCy2XnbOnFrt",
    Ce1TdUevvGbwt9TXOUqJ: "KYIBWPpDscFPF3CqYEsT",
    yYKfxTjrO3fuODiRwOOJ: "BhyjK8yaDXc6mKTI6do7",
    BDvAKtPWPV4ZM4jEeC2F: "diWmFNYwAuRpBpLhJmzL",
    NOi5hcPevRWvkbhsW5z5: "ddueG7bi41IjyeVs32vl",
    CnV5dUTEijtCky822p0Z: "ut9zkasjHvpj2xhtvg9e",
    NYysRCyzpcMWbRpShXQy: "FstZ9Z1Sg2mjgwvy92WK",
    TyuNIjePNmwRRhlJLgKC: "y7NAnVNkprAwqCgswvNQ"
  };
  return randomstring(4) + keys[a] + randomstring(5)
}, elsapsed = 0, timeout = 0, interval_id = 0, turbo_image_click_func = function () {
  return function () {
    var a = $.Storage.get("tme");
    a || (a = "true"), a == "true" ? a = "false" : a = "true", $.Storage.set("tme", a), setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3)
  }
};
ScreenManager.prototype.gp_confirm_thre_val = function () {
  var a = $.Storage.get("gp_thre");
  if (a == undefined)return this.state.max_gp() - 50;
  var b = jQuery.parseJSON($.Storage.get("gp_thre"));
  parseInt(b);
  if (b == "" || isNaN(b))b = this.state.max_gp() - 50;
  return b
}, ScreenManager.prototype.switch_theme = function (a) {
  var b = $("#main_wrapper");
  if (this.skin && this.skin == new_skin)return !1;
  a == "th_retro" ? jQuery.fx.off = !0 : jQuery.fx.off = !1, $.Storage.set("ui_s", a), $("link[href*='" + this.theme + ".css']").remove(), $("head").append($("<link rel='stylesheet' href='" + window.location.protocol + "//" + window.gv_domain + window.gv_port + "/stylesheets/" + a + ".css' type='text/css' media='screen' />")), this.theme = a
}, ScreenManager.prototype.create_layout_selector = function (a) {
  var b = $('<div border="0" align="middle" style="display: none;" class="spinner_img"></div>'), c = $('<select id="layout_s" name="layout_s"></select>'), d = [{
    id: "3c",
    val: Loc.restore_columns3
  }, {id: "5c", val: Loc.restore_columns5}];
  for (idx in d) {
    var e = d[idx], f = $("<option value='" + e.id + "'>" + e.val + "</option>");
    this.page_layout == e.id && f.attr("selected", "selected"), c.append(f)
  }
  var g = this;
  c.change(function () {
    var a = $("#layout_s").val();
    g.page_layout != "3c" && a == "3c" ? (b.show(), g.page_layout = "3c", g.clear_layout_settings(), $.Storage.set("pl", "3c"), setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3)) : g.page_layout != "5c" && a == "5c" && (b.show(), g.page_layout = "5c", g.clear_layout_settings(), g.clear_blocks_for_column("hero", "l_left"), g.clear_blocks_for_column("hero", "r_right"), g.clear_blocks_for_column("arena", "l_left"), g.clear_blocks_for_column("arena", "r_right"), $.Storage.set("pl", "5c"), setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3))
  }), $('<div id="layout_selector"></div>').append($("<span></span>").html(Loc.restore_columns_capt)).append(c).append(b).appendTo(a)
}, ScreenManager.prototype.create_skin_selector = function (a) {
  if (!jQuery.browser.msie) {
    this.theme == "th_retro" && (jQuery.fx.off = !0);
    var b = $('<select id="theme_s" name="theme_s"></select>'), c = [{
      id: "th_retro",
      val: Loc.th_retro
    }, {id: "th_classic", val: Loc.th_classic}, {id: "th_yellow", val: Loc.th_yellow}, {
      id: "th_emerald",
      val: Loc.th_emerald
    }, {id: "th_violet", val: Loc.th_violet}, {id: "th_divine", val: Loc.th_blue}, {
      id: "th_nightly",
      val: Loc.th_nightly
    }];
    this.state.ggender() == "f" && c.push({id: "th_pink", val: Loc.th_pink});
    for (idx in c) {
      var d = c[idx], e = $("<option value='" + d.id + "'>" + d.val + "</option>");
      this.theme == d.id && e.attr("selected", "selected"), b.append(e)
    }
    var f = this;
    b.change(function () {
      f.switch_theme($("#theme_s").val())
    }), $('<div id="theme_selector"></div>').append($("<span></span>").html(Loc.themes_capt)).append(b).appendTo(a)
  }
}, ScreenManager.prototype.create_ampm_selector = function (a) {
  var b = $('<select id="ampm_s" name="ampm_s"></select>'), c = [{id: "12h", val: Loc.am_pm_12h}, {
    id: "24h",
    val: Loc.am_pm_24h
  }];
  for (idx in c) {
    var d = c[idx], e = $("<option value='" + d.id + "'>" + d.val + "</option>");
    window.ampm == d.id && e.attr("selected", "selected"), b.append(e)
  }
  var f = this;
  b.change(function () {
    var a = $("#ampm_s").val();
    window.ampm != a && ($.Storage.set("tampm", a), setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3))
  }), $('<div id="theme_selector"></div>').append($("<span></span>").html(Loc.am_pm_capt)).append(b).appendTo(a)
}, ScreenManager.prototype.set_status = function (a) {
  this.last_turbo_message = a, this.turbo_image.attr("title", a)
}, ScreenManager.prototype.display_timer = function (a) {
  var b = function () {
    elapsed++, timeout - elapsed > 0 && a.turbo_image.attr("title", a.last_turbo_message + " " + Loc.TurboReconnect + (timeout - elapsed) + Loc.TurboReconnectSec)
  };
  interval_id = setInterval(b, 1e3)
}, ScreenManager.prototype.on_status_changed = function (a, b) {
  var c = "", d = "status: " + a;
  if (b) {
    if (b["proto"]) {
      c = b["proto"];
      d += " proto:" + b["proto"]
    }
    if (b["code"]) {
      d += " code:" + b["code"]
    }
    if (b["timeout"]) {
      d += " timeout:" + b["timeout"]
    }
  }
  gv_log(d);
  if (a != "connecting" || c != "comet" && c != "websockets") {
    if (a == "connected") {
      var c = b.proto, e = this.turbo_image;
      c == "comet" && (e.removeClass("t_yellow t_red"), e.addClass("t_green"), this.turbo_mode = !0, this.set_status(Loc.TurboOnConnected)), c == "websockets" && (e.removeClass("t_yellow t_red"), e.addClass("t_blue"), this.turbo_mode = !0, this.set_status(Loc.TurboOnConnectedWS));
      if (this.pending_error == !0) {
        this.pending_error = !1;
        var f = this, g = forced_update(f);
        g()
      }
    } else if (a == "error") {
      this.turbo_mode = !1;
      var c = b.proto, h;
      timeout = b.timeout, c == "comet" && (h = b.code, this.set_status(Loc.TurboConnectionErrorTooltip)), c == "websockets" && this.set_status(Loc.TurboConnectionErrorTooltip), elapsed = 0, this.display_timer(this);
      var e = this.turbo_image;
      e.removeClass("t_blue t_green"), e.addClass("t_yellow");
      var i = new Date;
      if (this.last_bg_update == undefined || i - this.last_bg_update >= 3e4) {
        this.last_bg_update = new Date;
        var f = this, g = forced_update(f);
        g()
      }
      this.pending_error = !0
    } else if (a == "failed") {
      this.turbo_mode = !1;
      if (c == "comet") {
        var h = b.code, j = $("#p_status");
        j.show();
        var k = Loc.TurboConnectionError;
        h && (k += " (" + Loc.TurboConnectionCode + h + ")."), j.html(k + " <br/>" + Loc.TurboConnectionCodeDesc), j.delay(15e3).slideUp()
      }
      c != "websockets";
      var e = this.turbo_image;
      e.removeClass("t_blue t_green t_yellow"), e.addClass("t_red"), this.pending_error = !0
    }
  } else {
    this.turbo_mode = !1, this.set_status(Loc.TurboOnStatus), interval_id != 0 && (window.clearInterval(interval_id), interval_id = 0);
    var e = this.turbo_image;
    e.removeClass("t_red t_blue t_green"), e.addClass("t_yellow")
  }
  if (a == "connecting" && c == "poll") {
    this.turbo_mode = !1;
    var e = this.turbo_image;
    e.removeClass("t_red"), e.addClass("t_yellow"), this.set_status(Loc.TurboDisabled)
  }
}, ScreenManager.prototype.add_block = function (a, b, c, d, e) {
  for (idx in e) {
    var f = e[idx], g;
    if ((f == "control" || f == "m_control") && window.gv_fzpg)continue;
    if (f == "gl3d" && !window.gv3d)continue;
    Loc[f + "_b_capt"] ? g = Loc[f + "_b_capt"] : g = "";
    var h = !1;
    this.blocks_spinner[f] && (h = !0), block = b.create_block(a, g, f, h), d.append(block), c[f] = block
  }
}, ScreenManager.prototype.clear_blocks_for_column = function (a, b) {
  $.Storage.remove(this.page_layout + "_" + a + "_" + b)
}, ScreenManager.prototype.set_blocks_for_column = function (a, b, c) {
  $.Storage.set(this.page_layout + "_" + a + "_" + b, JSON.stringify(c))
}, ScreenManager.prototype.get_blocks_for_column_raw = function (a, b) {
  return $.Storage.get(this.page_layout + "_" + a + "_" + b)
}, ScreenManager.prototype.get_blocks_for_column = function (a, b, c) {
  var d;
  a == "hero" ? d = this.h_blocks[b] : d = this.as_blocks[b];
  var e = undefined, f = undefined;
  f = this.get_blocks_for_column_raw(a, b);
  if (f && a == "arena") {
    var g = jQuery.parseJSON(f);
    g && (jQuery.inArray("fight_log", g) != -1 || jQuery.inArray("info", g) != -1) && (f = undefined)
  }
  if (f) {
    e = jQuery.parseJSON(f);
    var h = subtract_arrays(e, c);
    h.length > 0 && (e = subtract_arrays(e, h))
  }
  e == undefined && (e = d);
  return e
}, ScreenManager.prototype.set_block_state = function (a, b) {
  b && b == "closed" ? this.h_state[a] = "c" : this.h_state[a] = "o", $.Storage.set("states", JSON.stringify(this.h_state))
}, ScreenManager.prototype.get_block_state = function (a) {
  return this.h_state[a] && this.h_state[a] == "c" ? "closed" : "open"
}, ScreenManager.prototype.set_arena_block_state = function (a, b) {
  b && b == "closed" ? this.as_state[a] = "c" : this.as_state[a] = "o", $.Storage.set("as_states", JSON.stringify(this.as_state))
}, ScreenManager.prototype.get_arena_block_state = function (a) {
  return this.as_state[a] && this.as_state[a] == "c" ? "closed" : "open"
}, ScreenManager.prototype.create_hero_layout = function (a, b) {
  this.blocks = {};
  if (this.page_layout == "3c") {
    var c = [].concat(this.h_blocks.left, this.h_blocks.center, this.h_blocks.right), d = this.get_blocks_for_column("hero", "left", c), e = this.get_blocks_for_column("hero", "center", c), f = this.get_blocks_for_column("hero", "right", c), g = [].concat(d, e, f), h = subtract_arrays(c, g);
    h.length > 0 && (d = d.concat(h)), this.add_block("hero", this, this.blocks, $("#left_block"), d), this.add_block("hero", this, this.blocks, $("#central_block"), e), this.add_block("hero", this, this.blocks, $("#right_block"), f), $("#left_left_block").remove(), $("#right_right_block").remove()
  } else if (this.page_layout == "2c") {
    var c = [].concat(this.h_blocks.left, this.h_blocks.center), d = this.get_blocks_for_column("hero", "left", c), e = this.get_blocks_for_column("hero", "center", c), g = [].concat(d, e), h = subtract_arrays(c, g);
    h.length > 0 && (d = d.concat(h)), this.add_block("hero", this, this.blocks, $("#left_block"), d), this.add_block("hero", this, this.blocks, $("#central_block"), e), $("#right_block").remove(), $("#left_left_block").remove(), $("#right_right_block").remove()
  } else {
    var c = [].concat(this.h_blocks.l_left, this.h_blocks.left, this.h_blocks.center, this.h_blocks.right, this.h_blocks.r_right), i = this.get_blocks_for_column("hero", "l_left", c), d = this.get_blocks_for_column("hero", "left", c), e = this.get_blocks_for_column("hero", "center", c), f = this.get_blocks_for_column("hero", "right", c), j = this.get_blocks_for_column("hero", "r_right", c), g = [].concat(i, d, e, f, j), h = subtract_arrays(c, g);
    h.length > 0 && (d = d.concat(h)), this.add_block("hero", this, this.blocks, $("#left_left_block"), i), this.add_block("hero", this, this.blocks, $("#left_block"), d), this.add_block("hero", this, this.blocks, $("#central_block"), e), this.add_block("hero", this, this.blocks, $("#right_block"), f), this.add_block("hero", this, this.blocks, $("#right_right_block"), j), $("#left_left_block").show(), $("#right_right_block").show()
  }
}, ScreenManager.prototype.create_arena_layout = function (a, b) {
  if (this.page_layout == "3c")this.a_blocks = {}, this.add_block("arena", this, this.a_blocks, $("#a_left_block"), this.get_blocks_for_column("arena", "left", this.as_blocks.left)), this.add_block("arena", this, this.a_blocks, $("#a_central_block"), this.get_blocks_for_column("arena", "center", this.as_blocks.center)), this.add_block("arena", this, this.a_blocks, $("#a_right_block"), this.get_blocks_for_column("arena", "right", this.as_blocks.right)), $("#a_left_left_block").remove(), $("#a_right_right_block").remove(); else if (this.page_layout == "2c") {
    this.a_blocks = {};
    var c = this.get_blocks_for_column("arena", "left", this.as_blocks.left), d = this.get_blocks_for_column("arena", "center", this.as_blocks.center);
    (subtract_arrays(this.as_blocks.left, c).length > 0 || subtract_arrays(c, this.as_blocks.left).length > 0) && this.clear_blocks_for_column("arena", "left"), (subtract_arrays(this.as_blocks.center, d).length > 0 || subtract_arrays(d, this.as_blocks.center).length > 0) && this.clear_blocks_for_column("arena", "center"), this.add_block("arena", this, this.a_blocks, $("#a_left_block"), this.get_blocks_for_column("arena", "left", this.as_blocks.left)), this.add_block("arena", this, this.a_blocks, $("#a_central_block"), this.get_blocks_for_column("arena", "center", this.as_blocks.center)), $("#a_right_block").remove(), $("#a_left_left_block").remove(), $("#a_right_right_block").remove()
  } else {
    var e = [].concat(this.as_blocks.l_left, this.as_blocks.left), f = [].concat(this.as_blocks.right, this.as_blocks.r_right), g = [].concat(this.get_blocks_for_column("arena", "l_left", e), this.get_blocks_for_column("arena", "left", e));
    if (subtract_arrays(e, g).length > 0 || subtract_arrays(g, e).length > 0)this.clear_blocks_for_column("arena", "l_left"), this.clear_blocks_for_column("arena", "left");
    var h = [].concat(this.get_blocks_for_column("arena", "r_right", f), this.get_blocks_for_column("arena", "right", f));
    if (subtract_arrays(f, h).length > 0 || subtract_arrays(f, e).length > 0)this.clear_blocks_for_column("arena", "r_right"), this.clear_blocks_for_column("arena", "right");
    this.a_blocks = {}, this.add_block("arena", this, this.a_blocks, $("#a_left_left_block"), this.get_blocks_for_column("arena", "l_left", e)), this.add_block("arena", this, this.a_blocks, $("#a_left_block"), this.get_blocks_for_column("arena", "left", e)), this.add_block("arena", this, this.a_blocks, $("#a_central_block"), this.get_blocks_for_column("arena", "center", this.as_blocks.center)), this.add_block("arena", this, this.a_blocks, $("#a_right_block"), this.get_blocks_for_column("arena", "right", f)), this.add_block("arena", this, this.a_blocks, $("#a_right_right_block"), this.get_blocks_for_column("arena", "r_right", f)), $("#a_left_left_block").show(), $("#a_right_right_block").show()
  }
}, ScreenManager.prototype.show_search_screen = function () {
  window.fb_frame && this.ui.show_search_screen(), $("#search_line1").html(this.state.search1), $("#search_block").show(), $("#hero_columns").hide(), this.search_interval == undefined && (this.search_cnt = 0, this.search_interval = start_search(this))
}, ScreenManager.prototype.show_hero_screen = function () {
  this.search_interval && (window.clearInterval(this.search_interval), this.search_interval = undefined), $("#search_line2").hide(), $("#search_block").hide(), this.state.is_fighting() ? $("#arena_columns").fadeIn() : $("#hero_columns").fadeIn(), window.fb_frame && this.ui.hide_search_screen(this)
}, ScreenManager.prototype.play_sound = function (a, b) {
  var c = window.location.protocol + "//" + document.domain + window.gv_port;
  typeof soundManager != "undefined" ? soundManager.supported() && (soundManager.stopAll(), soundManager.play("mySound", c + "/" + a)) : $.getScript("/javascripts/sm2.js", function (d, e, f) {
    soundManager.setup({
      url: c + "/soundmanager2.swf", onready: function () {
        soundManager.supported() && soundManager.play("mySound", c + "/" + a), b && setTimeout("document.location.href ='" + document.location.pathname + "'", 2e3)
      }
    })
  })
}, ScreenManager.prototype.a_notify = function () {
  if (!document.createElement("audio").canPlayType)this.play_sound("arena.mp3", !0); else {
    var a = '<audio src="arena.ogg" preload="auto" autobuffer autoplay="true"></audio>';
    $(a).insertAfter("#main_wrapper");
    if (($(document.activeElement).is("input") || $(document.activeElement).is("textarea")) && $(document.activeElement).attr("id") != "god_phrase" && $(document.activeElement).val().length > 3) {
      var b = confirm(Loc.duel_switch_confirm);
      if (!b)return !1
    }
    setTimeout("document.location.href ='" + document.location.pathname + "'", 3e3)
  }
}, ScreenManager.prototype.on_decode_error = function (a) {
  var b = forced_update(this);
  b()
}, ScreenManager.prototype.on_json = function (a) {
  gv_log(a), a.cmds ? this.state.cmds = a.cmds : this.state.cmds || (this.state.cmds = {});
  var b = this.state.data_update(a);
  if (b) {
    this.dn == undefined && (this.dn = new WebNotify(this.state, this)), this.dn.check_changes(), this.m_update_timeout && (clearTimeout(this.m_update_timeout), this.m_update_timeout = undefined);
    if (this.state.chf_pending() && !b.arena_fight) {
      var c = function (a, b, c) {
        return function (d) {
          a.show(), $.post(base_api_url, {
            a: get_cmd_id("z0uVDOyRiCLKIBhDnnVw"),
            b: prepare_args(JSON.stringify({chfr: b, chfr_by: c}))
          }, function (b) {
            var c = b.status;
            b.msg && b.msg.length > 0 ? ($("#chf_content").html(b.msg), setTimeout(function () {
              $("#chf_q").slideUp()
            }, 3e3)) : $("#chf_q").slideUp(), a.hide()
          })
        }
      }, d = $("#chf_capt");
      d.html(Loc.chf_pending_title);
      var e = $('<div border="0" align="middle" style="display:none;padding-left:1em;margin-top:-9px;" class="spinner_img"></div>').appendTo(d);
      $("#chf_content").empty();
      var f = this.state.chf_pending();
      $("#chf_content").append($("<div></div>").html(localize(Loc.chf_pending_text, {godname: f})));
      var g = $('<div id="chf_controls"></div>'), h = $('<div class="div_link chf_link"></div>').html(Loc.chf_button_accept).appendTo(g);
      h.click(c(e, "1", f));
      var i = $('<div class="div_link chf_link"></div>').html(Loc.chf_button_reject).appendTo(g);
      i.click(c(e, "0", f)), $("#chf_content").append(g), $("#chf_content").append($('<div style="clear:both;"></div>')), $("#chf_q").css("display") == "none" && this.play_sound("ch.mp3", !1), $("#chf_q").show()
    }
    this.screen_created ? b.arena_fight == !0 || b.fight_type != undefined || this.screen_type == "hero" && this.state.o_health() > 0 ? this.a_notify() : b.arena_fight == !1 ? setTimeout("document.location.href ='" + document.location.pathname + "'", 0) : b.updated && b.updated.length > 0 && this.update_from_keys(b.updated) : (b.expired || (this.pantheons = new Pantheons(this.nm, this.state), this.state.is_fighting() ? (this.screen_type = "arena", this.update_from_keys(b["new"]), this.create_initial_arena(), $("#arena_columns").show(), this.make_sortable_arena(), this.add_settings_link(), this.screen_created = !0) : (this.screen_type = "duel", this.update_from_keys(b["new"]), this.create_initial_hero(), $("#hero_columns").show(), this.make_sortable_hero(), this.add_settings_link(), this.screen_created = !0), this.messages == undefined && (this.messages = new Messages(this.nm, this.state.godn)), this.messages_created == undefined && (this.messages_created = !0, this.create_messages()), !window.fb_frame || typeof FB == "undefined" || !FB.Canvas), jQuery.browser.opera && jQuery.browser.version < 11.1 && ($(".block_h").addClass("opera_header_fix"), $("#hint_label").attr("style", "position:absolute;left:15px;top:0.5em;")), jQuery.browser.msie && ($(".block_h").addClass("ie_header_fix"), $(".block").addClass("ie_block_fix"), $(".popover").addClass("popover_ie_fix"))), this.check_hints(a), this.check_ach(a), this.check_messages(a), b.expired ? this.search_displayed == !1 && (this.search_displayed = !0, $(".reset_layout").hide(), this.show_search_screen()) : this.search_displayed == !0 && (this.search_displayed = !1, this.show_hero_screen()), this.state.post_data_update(), this.pantheons && this.pantheons.post_update()
  }
  !window.fb_frame || typeof FB == "undefined" || !FB.Canvas
}, ScreenManager.prototype.is_turbo_mode_enabled = function () {
  var a = $.Storage.get("tme");
  if (a == undefined && jQuery.browser.opera && "WebSocket"in window == undefined)return !1;
  return a == "true" ? !0 : !1
}, ScreenManager.prototype.is_comet_mode_enabled = function () {
  return jQuery.browser.opera ? !1 : !0
}, ScreenManager.prototype.update_from_keys = function (a) {
  this.nm.notify_all.apply(this.nm, [a])
}, ScreenManager.prototype.on_s_expired_callback = function () {
  document.location.href = document.location.pathname
}, ScreenManager.prototype.create_ideabox = function (a, b, c) {
  a.attr("style", "display:none");
  var d = b, e = $("<div></div>").appendTo(d);
  form = $('<form id="send_feedback_form" action="#" method="post"></form>').appendTo(e);
  var f = $('<div class="line"></div>');
  f.html(Loc.ideabox_intro).appendTo(form), d.form = form;
  var g = $('<div class="line" id="selector_line"></div>');
  g.html(Loc.ideabox_selector).appendTo(form);
  var h = function (a) {
    var b = [];
    b.push({id: "other", msg: Loc.ideabox_other}), b.push({
      id: "bug_report",
      msg: Loc.ideabox_bug_report
    }), b.push({id: "idea", msg: Loc.ideabox_idea}), Loc.locale == "ru" && b.push({
      id: "payment",
      msg: Loc.ideabox_payment
    }), c.level() >= 10 && (b.push({id: "monster", msg: Loc.ideabox_monster}), b.push({
      id: "artifact",
      msg: Loc.ideabox_artifact
    }), b.push({id: "news_fields", msg: Loc.ideabox_news_fields}), b.push({
      id: "diary",
      msg: Loc.ideabox_diary
    })), c.level() >= 20 && (b.push({id: "quest", msg: Loc.ideabox_quest}), b.push({
      id: "equipment",
      msg: Loc.ideabox_equipment
    }), b.push({id: "duel", msg: Loc.ideabox_duel}), b.push({
      id: "dungeon",
      msg: Loc.ideabox_dungeon
    }), b.push({id: "newspaper", msg: Loc.ideabox_newspaper}));
    for (idx in b) {
      var d = b[idx];
      a.append("<option value='" + d.id + "'>" + d.msg + "</option>")
    }
  };
  form.selector = $('<select id="feedback_id" name="feedback[id]"></select>'), h(form.selector);
  var i = function (a) {
    return function () {
      a.selector.val() != a.current_selected && ($("#idea_" + a.current_selected).hide(), a.current_selected = a.selector.val(), $("#idea_" + a.selector.val()).show())
    }
  }, j = i(form);
  form.selector.change(j), form.selector.keypress(j), form.current_selected = "other", form.selector.appendTo(g);
  var k = function (a) {
    return $("<div id='idea_" + a + "' style='display:none;'></div>")
  };
  form.id_other = k("other").appendTo(form), form.id_other.show(), form.message_field = $('<textarea class="input_text" id="other_message" name="other_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_other), $("<div class='idea_notes'></div>").html(Loc.ideabox_note).appendTo(form.id_other), $("<span class='idea_error' id='other_message_err'></span>").appendTo(form.id_other), form.id_quest = k("quest").appendTo(form);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_quest_text);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_quest_text_desc).appendTo(l), $("<span class='idea_error' id='quest_text_err'></span>").appendTo(l), l.appendTo(form.id_quest), form.quest_text = $('<input id="quest_text" name="quest_text" type="text" value="" class="input_text"></input>').appendTo(form.id_quest);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_quest_end);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_quest_end_desc).appendTo(l), $("<span class='idea_error' id='quest_end_err'></span>").appendTo(l), l.appendTo(form.id_quest), form.quest_end = $('<input id="quest_end" name="quest_end" type="text" value="" class="input_text"></input>').appendTo(form.id_quest);
  var l = $("<div class='ib_capt'>").html(Loc.ideabox_reference);
  $("<span class='ib_desc'>").html(Loc.ideabox_reference_desc).appendTo(l), l.appendTo(form.id_quest), form.quest_reference = $('<input id="quest_reference" name="quest_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_quest), $('<div class="idea_notes"></div>').html(Loc.ideabox_quest_note).appendTo(form.id_quest), form.id_bug_report = k("bug_report").appendTo(form), form.bug_report_message = $('<textarea class="input_text" id="bug_report_message" name="bug_report_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_bug_report), $("<span class='idea_error' id='bug_report_message_err'></span>").appendTo(form.id_bug_report), $('<div class="idea_notes"></div>').html(Loc.ideabox_bug_report_note).appendTo(form.id_bug_report), form.id_idea = k("idea").appendTo(form), form.idea_message_field = $('<textarea class="input_text" id="idea_message" name="idea_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_idea), $("<span class='idea_error' id='idea_message_err'></span>").appendTo(form.id_idea), $('<div class="idea_notes"></div>').html(Loc.ideabox_idea_note).appendTo(form.id_idea), form.id_payment = k("payment").appendTo(form), form.payment_message_field = $('<textarea class="input_text" id="payment_message" name="payment_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_payment), $("<span class='idea_error' id='payment_message_err'></span>").appendTo(form.id_payment), $('<div class="idea_notes"></div>').html(Loc.ideabox_payment_note).appendTo(form.id_payment), form.id_monster = k("monster").appendTo(form);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_monster_text).appendTo(form.id_monster);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_monster_text_desc).appendTo(l), $("<span class='idea_error' id='monster_text_err'></span>").appendTo(l), form.monster_text = $('<input id="monster_text" name="monster_text" type="text" value="" class="input_text"></input>').appendTo(form.id_monster);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_monster_artifact_text).appendTo(form.id_monster);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_monster_artifact_text_desc).appendTo(l), $("<span class='idea_error' id='monster_artifact_text_err'></span>").appendTo(l), form.monster_artifact_text = $('<input id="monster_artifact_text" name="monster_artifact_text" type="text" value="" class="input_text"></input>').appendTo(form.id_monster);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_monster);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.monster_reference = $('<input id="monster_reference" name="monster_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_monster), $('<div class="idea_notes">').html(Loc.ideabox_monster_note).appendTo(form.id_monster), form.id_artifact = k("artifact").appendTo(form);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_artifact_text).appendTo(form.id_artifact);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_artifact_text_desc).appendTo(l), $("<span class='idea_error' id='artifact_text_err'></span>").appendTo(l), form.artifact_text = $('<input id="artifact_text" name="artifact_text" type="text" value="" class="input_text"></input>').appendTo(form.id_artifact);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_artifact);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.artifact_reference = $('<input id="artifact_reference" name="artifact_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_artifact), $('<div class="idea_notes">').html(Loc.ideabox_artifact_note).appendTo(form.id_artifact), form.id_news_fields = k("news_fields").appendTo(form);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_news_fields_text).appendTo(form.id_news_fields);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_news_fields_text_desc).appendTo(l), $("<span class='idea_error' id='news_fields_text_err'></span>").appendTo(l), form.news_fields_text = $('<textarea id="news_fields_text" name="news_fields_text" type="text" value="" class="input_text"></textarea>'), form.news_fields_text.appendTo(form.id_news_fields);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_news_fields);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.news_fields_reference = $('<input id="news_fields_reference" name="news_fields_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_news_fields), form.id_diary = k("diary").appendTo(form), form.diary_message = $('<textarea class="input_text" id="diary_message" name="diary_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_diary);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_diary);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), $("<span class='idea_error' id='diary_reference_err'></span>").appendTo(l), form.diary_reference = $('<input id="diary_reference" name="diary_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_diary), $('<div class="idea_notes"></div>').html(Loc.ideabox_diary_note).appendTo(form.id_diary), form.id_equipment = k("equipment").appendTo(form);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_equipment_type).appendTo(form.id_equipment);
  form.equipment_select = $('<select id="equipment_id" name="equipment[id]"></select>');
  var m = [{id: "equip_weapon", val: Loc.ideabox_eq_weapon}, {
    id: "equip_shield",
    val: Loc.ideabox_eq_shield
  }, {id: "equip_head", val: Loc.ideabox_eq_head}, {id: "equip_body", val: Loc.ideabox_eq_body}, {
    id: "equip_arms",
    val: Loc.ideabox_eq_arms
  }, {id: "equip_legs", val: Loc.ideabox_eq_legs}, {id: "equip_talisman", val: Loc.ideabox_eq_talisman}];
  for (idx in m) {
    var n = m[idx];
    form.equipment_select.append($("<option value='" + n.id + "'>" + n.val + "</option>"))
  }
  form.equipment_select.appendTo(form.id_equipment);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_equipment_text).appendTo(form.id_equipment);
  $("<span class='idea_error' id='equipment_text_err'></span>").appendTo(l), form.equipment_text = $('<input id="equipment_text" name="equipment_text" type="text" value="" class="input_text"></input>').appendTo(form.id_equipment);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_equipment);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.equipment_reference = $('<input id="equipment_reference" name="equipment_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_equipment), form.id_duel = k("duel").appendTo(form), form.duel_message = $('<textarea class="input_text" id="duel_message" name="duel_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_duel), $("<span class='idea_error' id='duel_message_err'></span>").appendTo(form.id_duel);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_duel);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.duel_reference = $('<input id="duel_reference" name="duel_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_duel), form.id_dungeon = k("dungeon").appendTo(form), form.dungeon_message = $('<textarea class="input_text" id="dungeon_message" name="dungeon_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_dungeon), $("<span class='idea_error' id='dungeon_message_err'></span>").appendTo(form.id_dungeon);
  var l = $("<div class='ib_capt'></div>").html(Loc.ideabox_reference).appendTo(form.id_dungeon);
  $("<span class='ib_desc'></span>").html(Loc.ideabox_reference_desc).appendTo(l), form.dungeon_reference = $('<input id="dungeon_reference" name="dungeon_reference" type="text" value="" class="input_text"></input>').appendTo(form.id_dungeon), form.id_newspaper = k("newspaper").appendTo(form), form.newspaper_message = $('<textarea class="input_text" id="newspaper_message" name="newspaper_message" rows="4" wrap="virtual;"></textarea>').appendTo(form.id_newspaper), $("<span class='idea_error' id='newspaper_message_err'></span>").appendTo(form.id_newspaper), form.status_message = $('<div id="feedback_status"></div>').appendTo(form);
  var o = $('<div id="feedback_submit_w"></div>').appendTo(form);
  form.send_button = $('<input type="submit" id=" feedback_submit"></input>').appendTo(o), form.send_button.attr("value", Loc.ideabox_send_button), c.level() >= 15 && (form.own_ideas_link = $('<div class="approved_link"></div>').append($('<a href="/ideabox/index/approved" target="_blank"></div>').html(Loc.ideabox_approved_link)).appendTo(form));
  var p = function (a, b) {
    var c = $("#" + a), d = $("#" + a + "_err");
    if (c.val().length > b) {
      d.html(localize(Loc.ideabox_error_max_length, {len: b})), d.fadeIn();
      return !1
    }
    d.hide();
    return !0
  }, q = function (a, b) {
    var c = $("#" + a), d = $("#" + a + "_err");
    if (c.val().length < b) {
      d.html(localize(Loc.ideabox_error_min_length, {len: b})), d.fadeIn();
      return !1
    }
    d.hide();
    return !0
  }, r = function (a) {
    switch (a.selector.val()) {
      case"monster":
        return p("monster_text", 25) && p("monster_artifact_text", 40) && q("monster_text", 4);
      case"artifact":
        return p("artifact_text", 40) && q("artifact_text", 4);
      case"equipment":
        return p("equipment_text", 30) && q("equipment_text", 4);
      case"diary":
        return p("diary_message", 2e3) && q("diary_message", 4);
      case"idea":
        return p("idea_message", 2e3) && q("idea_message", 4);
      case"bug_report":
        return p("bug_report_message", 2e3) && q("bug_report_message", 4);
      case"quest":
        return p("quest_text", 300) && p("quest_end", 300) && q("quest_text", 4);
      case"duel":
        return p("duel_message", 2e3) && q("duel_message", 4);
      case"dungeon":
        return p("dungeon_message", 2e3) && q("dungeon_message", 4);
      case"payment":
        return p("payment_message", 2e3) && q("payment_message", 4);
      case"news_fields":
        return p("news_fields_text", 100) && q("news_fields_text", 4);
      case"content":
        return p("content_text", 500) && p("content_reference", 1500) && q("content_text", 4) && q("content_reference", 4);
      case"newspaper":
        return p("newspaper_message", 2e3) && q("newspaper_message", 4);
      case"other":
        return p("other_message", 2e3) && q("other_message", 4);
      default:
        return !1
    }
  }, s = function (a) {
    var b = {type: a.selector.val(), comment: "", b: !0};
    switch (a.selector.val()) {
      case"monster":
        b.msg = a.monster_text.val(), b.monster_artifact = a.monster_artifact_text.val(), b.comment = a.monster_reference.val();
        break;
      case"artifact":
        b.type = "trophy", b.msg = a.artifact_text.val(), b.comment = a.artifact_reference.val();
        break;
      case"equipment":
        b.type = a.equipment_select.val(), b.msg = a.equipment_text.val(), b.comment = a.equipment_reference.val();
        break;
      case"diary":
        b.msg = a.diary_message.val(), b.comment = a.diary_reference.val();
        break;
      case"idea":
        b.msg = a.idea_message_field.val();
        break;
      case"bug_report":
        b.msg = a.bug_report_message.val();
        break;
      case"quest":
        b.msg = a.quest_text.val(), b.quest_end = a.quest_end.val(), b.comment = a.quest_reference.val();
        break;
      case"duel":
        b.type = "arena", b.msg = a.duel_message.val(), b.comment = a.duel_reference.val();
        break;
      case"dungeon":
        b.type = "dungeon", b.msg = a.dungeon_message.val(), b.comment = a.dungeon_reference.val();
        break;
      case"payment":
        b.msg = a.payment_message_field.val();
        break;
      case"news_fields"
      :
        b.msg = a.news_fields_text.val(), b.comment = a.news_fields_reference.val();
        break;
      case"content":
        b.msg = a.content_text.val(), b.content_reference = a.content_reference.val();
        break;
      case"newspaper":
        b.msg = a.newspaper_message.val();
        break;
      case"other":
        b.msg = a.message_field.val();
        break;
      default:
    }
    return b
  }, t = this, u = function (b, c) {
    var d = b.get_spinner(a);
    d.show(), c.send_button.attr("disabled", "disabled"), c.status_message.hide(), $.ajax({
      type: "POST",
      url: base_api_url,
      data: {a: get_cmd_id("QCFRPkOrNhNB5tAZhEy5"), b: prepare_args(JSON.stringify(s(c)))},
      success: function (a) {
        a.status != "success" ? (c.status_message.addClass("t_error"), a.desc || (a.desc = Loc.network_error)) : (c.status_message.removeClass("t_error"), a.desc ? c.status_message.html(a.desc) : c.status_message.html(Loc.ideabox_submit_success), $inputs = jQuery("#send_feedback_form .input_text"), $inputs.each(function () {
          $(this).val("")
        })), c.send_button.removeAttr("disabled"), c.status_message.html(a.desc), c.status_message.clearQueue().slideDown().delay(7e3).slideUp()
      },
      complete: function (a, b) {
        d.hide()
      },
      error: function (a, b, d) {
        c.status_message.addClass("t_error"), c.send_button.removeAttr("disabled"), c.status_message.html(Loc.network_error), c.status_message.clearQueue().slideDown().delay(7e3).slideUp()
      }
    })
  }, v = function (a, b) {
    return function (c) {
      r(b) && u(a, b), c.preventDefault();
      return !1
    }
  };
  form.submit(v(this, form)), a.update = function () {
    c.level() >= 4 && this.css("display") == "none" && this.show()
  }, c.level() < 4 && this.nm.register("level", a), a.update.call(a)
}, ScreenManager.prototype.check_hints = function (a) {
  if (a && a.hints && a.hints.length > 0) {
    var b = this;
    $.post(base_api_url, {
      a: get_cmd_id("IPzdqJ1FIhISEEKnlYrl"),
      b: prepare_args(JSON.stringify({hints: a.hints}))
    }, function (c) {
      c && c.status == "success" && c.hints && b.hints.show_hints.apply(b.hints, [a.hints, c.hints])
    })
  }
  this.state.check_lbp_update(a.lbp) && this.hints.show_blog_notifs.apply(this.hints, [a.lbp])
}, ScreenManager.prototype.check_ach = function (a) {
  var b = hash_keys(a.gca), c = hash_keys(a.gcak), d = [];
  if (a.status == "success" && b && b.length > 0) {
    for (var e in a.gca) {
      var f = a.gca[e];
      f && f == 100 && c[e] != "1" && a.gcak && a.gcak[e] == undefined && d.push(e)
    }
    var a = this.ach.filter(d, a.gcak);
    d = a["new"];
    if (d.length > 0) {
      var g = this;
      $.post(base_api_url, {
        a: get_cmd_id("66LpWTKQaNrTqvRxNCvW"),
        b: prepare_args(JSON.stringify({ids: d}))
      }, function (b) {
        b && b.status == "success" && b.ach && g.ach.show_all.apply(g.ach, [d, b.ach, a.old])
      })
    }
  }
}, ScreenManager.prototype.check_messages = function (a) {
  if (this.messages == undefined)return !1;
  if (a && a.hero && a.hero.m_id != undefined) {
    var b = this.messages.check_messages.apply(this.messages, [a.hero.m_id, this.state.godname(), this.force_msg_update_timer]);
    b == !0 && this.force_msg_update_timer != 0 && (clearTimeout(this.force_msg_update_timer), this.force_msg_update_timer = 0, gv_log("cleared forced message update timeout."))
  }
  a && a.gc_mid != undefined && a.gc_n == this.state.guild() && this.messages.check_messages_gc.apply(this.messages, [a.gc_mid, a.gc_mid_k, this.state.godname()])
}, ScreenManager.prototype.clear_layout_settings = function () {
  $.Storage.remove("hero_left"), $.Storage.remove("hero_hero_center"), $.Storage.remove("hero_hero_right"), $.Storage.remove("arena_left"), $.Storage.remove("arena_hero_center"), $.Storage.remove("arena_hero_right"), this.clear_blocks_for_column("hero", "left"), this.clear_blocks_for_column("hero", "center"), this.clear_blocks_for_column("hero", "right"), this.clear_blocks_for_column("arena", "left"), this.clear_blocks_for_column("arena", "center"), this.clear_blocks_for_column("arena", "right"), $.Storage.remove("states")
}, ScreenManager.prototype.add_settings_link = function () {
  var a = !1, b = !1, c = this, d = function () {
    a = !0, jQuery.facebox.settings.closeImage = "/images/closelabel.png", jQuery.facebox.settings.loadingImage = "/images/loading.gif", $("#page_settings").empty(), jQuery.facebox({div: "#page_settings"});
    var b = $("#facebox");
    jQuery("div#facebox div.popup div.content").addClass("spage"), b.draggable({opacity: .5})
  };
  !window.fb_frame && Loc.locale == "ru" ? $("#turbo_icon").click(turbo_image_click_func()) : $("#turbo_icon").click(d), $("#page_settings_link").click(d), $(document).bind("afterClose.facebox", function () {
    b && (b = !1, a = !1)
  }), $(document).bind("beforeReveal.facebox", function () {
    if (a && b == !1) {
      b = !0;
      var d = jQuery("div#facebox div.popup div.content");
      d.empty(), jQuery("<h2></h2>").html(Loc.ps_capt).appendTo(d), jQuery('<div class="set_line" id="ps_footer"></div>').html(Loc.ps_footer).appendTo(d), d.append(jQuery("<h4></h4>").html(Loc.ps_appearance_capt));
      var e;
      window.fb_frame || (e = jQuery('<div class="set_line"></div>').appendTo(d), c.create_layout_selector(e)), jQuery.browser.msie ? e = jQuery('<div class="set_line"></div>').html(Loc.ps_ns_themes).appendTo(d) : (e = jQuery('<div class="set_line"></div>').appendTo(d), c.create_skin_selector(e)), Loc.locale == "en" && (e = jQuery('<div class="set_line"></div>').appendTo(d), c.create_ampm_selector(e)), d.append(jQuery("<h4></h4>").html(Loc.ps_options_capt));
      var f = $('<table class="setting_tbl"></table>').appendTo(d), e = jQuery('<tr class="opt_line" style=""></tr>').appendTo(f), g = $('<span id=""></span>').html(Loc.ps_turbo_msg);
      jQuery('<div style="font-size:80%;"></div>').html(Loc.ps_turbo_note).appendTo(g), $('<td class="s_c1"></td>').append(g).appendTo(e);
      var h = jQuery('<input type="checkbox"></input>').appendTo($("<td></td>").appendTo(e));
      "WebSocket"in window || "MozWebSocket"in window || c.is_comet_mode_enabled() != !1 ? c.tme == "true" && h.attr("checked", "checked") : h.attr("disabled", "disabled");
      var i = $('<div border="0" align="middle" style="display:none;left:390px;" class="spinner_img"></div>').appendTo(g);
      h.click(function () {
        i.show();
        var a = turbo_image_click_func();
        a()
      });
      var e = jQuery('<tr class="opt_line" style=""></tr>').appendTo(f);
      if (!window.fb_frame) {
        $('<td class="s_c1"></td>').append($('<span id=""></span>').html(Loc.ps_make_default)).appendTo(e);
        var j = jQuery('<input type="checkbox"></input>').appendTo($("<td></td>").appendTo(e)), k = $.cookie("sh");
        (!k || k == "1") && j.attr("checked", "checked"), j.click(function () {
          var a = $.cookie("sh");
          a && a == "1" ? $.cookie("sh", "0", {path: "/", expires: 365}) : $.cookie("sh", "1", {
            path: "/",
            expires: 365
          })
        })
      }
      var e = jQuery('<tr class="opt_line" style=""></tr>').appendTo(f), l = $('<td class="s_c1"></td>').appendTo(e);
      jQuery("<span></span>").html(Loc.ps_disable_sharing).appendTo(l);
      var m = jQuery('<input type="checkbox"></input>').appendTo($("<td></td>").appendTo(e)), n = $('<div border="0" align="middle" style="display:none;left:400px;" class="spinner_img"></div>').appendTo(l);
      c.d_share_enabled || m.attr("checked", "checked"), m.click(function () {
        n.show(), c.d_share_enabled ? jQuery.Storage.set("d_share_en", JSON.stringify(!1)) : $.Storage.remove("d_share_en"), setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3)
      });
      var e = jQuery('<tr class="opt_line" style=""></tr>').appendTo(f);
      $('<td class="s_c1"></td>').append($("<span></span>").html(Loc.ps_gp_confirm_thre)).appendTo(e);
      var o = $("<td></td>").appendTo(e), p = $('<input id="gp_thre_val" autocomplete="off" class="input_text" value="' + c.gp_confirm_thre_val() + '"></input>').appendTo(o);
      jQuery("<span>%</span>").appendTo(o), p.change(function () {
        var a = $(this).val(), b = parseInt(a), d;
        a == "" ? d = "" : isNaN(b) ? d = c.state.max_gp() - 50 : b < 0 ? d = c.state.max_gp() - 50 : b > c.state.max_gp() ? d = c.state.max_gp() : d = b, $(this).val(d), d !== "" && jQuery.Storage.set("gp_thre", JSON.stringify(d))
      }).keyup(function () {
        $(this).change()
      });
      if (supports_local_storage()) {
        d.append(jQuery("<h4></h4>").html(Loc.ps_notif_capt));
        if (typeof Notification == "undefined")$('<div class="set_line"></div>').html(Loc.ps_notif_unavailable).appendTo(d); else {
          var f = $('<table class="setting_tbl"></table>').appendTo(d), q = ["death", "duel", "mquest", "quest", "levelup", "sa", "return_town", "invite", "fr_msg"], r = function (a) {
            return function (b) {
              var d = c.dn.toggle_setting(a);
              d ? $(this).attr("checked", "checked") : $(this).removeAttr("checked")
            }
          };
          $.each(q, function (a, b) {
            var d = jQuery('<tr class="opt_line"></tr>').appendTo(f), e = $('<span id=""></span>').html(Loc["ps_notif_" + b]).attr("title", Loc["ps_notif_" + b + "_d"]);
            $('<td class="s_c1"></td>').append(e).appendTo(d);
            var g = jQuery('<input type="checkbox"></input>').appendTo($("<td></td>").appendTo(d));
            c.dn.read_setting(b) ? g.attr("checked", "checked") : g.removeAttr("checked"), g.click(r(b))
          });
          var s = jQuery('<div class="set_line div_link"></div>').appendTo(d);
          s.html(Loc.ps_notif_test), s.click(function () {
            c.dn.notify("test")
          }), jQuery('<div style="font-size:80%;padding:0 70px 0 100px"></div>').html(Loc.ps_notif_test_d).appendTo(d)
        }
      }
      window.fb_frame || d.append($('<div class="set_line" style="margin-top:2em;"></div>').html(Loc.ps_discuss));
      var e = jQuery('<div class="set_line" style="margin-top:0.5em;"></div>').appendTo(d);
      if (!window.fb_frame) {
        var t = jQuery('<span class="div_link"></span>').html(Loc.ps_reset_settings).appendTo(e);
        jQuery('<div style="font-size:80%;padding-top:0.3em;"></div>').html(Loc.ps_reset_settings_note).appendTo(e), t.click(function () {
          var a = confirm(Loc.ps_reset_settings_q);
          if (!a)return !1;
          for (var b in localStorage)localStorage.removeItem(b);
          setTimeout("document.location.href ='" + document.location.pathname + "'", 1e3)
        })
      }
    }
  }), $(".reset_layout").show()
}, ScreenManager.prototype.make_sortable_hero = function () {
  var a = this;
  $("div.group_wrapper").sortable({
    handle: $(".b_handle"),
    connectWith: $("div.group_wrapper"),
    placeholder: "widget-placeholder",
    forcePlaceholderSize: !0,
    revert: 300,
    delay: 100,
    opacity: .8,
    stop: function (b, c) {
      var d = $("#left_block").sortable("toArray");
      a.set_blocks_for_column("hero", "left", d);
      var e = $("#central_block").sortable("toArray");
      a.set_blocks_for_column("hero", "center", e);
      var f, g, h;
      if (a.page_layout == "3c" || a.page_layout == "5c")f = $("#right_block").sortable("toArray"), a.set_blocks_for_column("hero", "right", f);
      a.page_layout == "5c" && (g = $("#left_left_block").sortable("toArray"), a.set_blocks_for_column("hero", "l_left", g), h = $("#right_right_block").sortable("toArray"), a.set_blocks_for_column("hero", "r_right", h));
      var i = [].concat(d, e);
      a.page_layout == "3c" ? i = i.concat(f) : a.page_layout == "5c" && (i = i.concat(f, g, h));
      for (idx in i)block_id = i[idx], a.blocks[block_id] && a.blocks[block_id].layout_changed && a.blocks[block_id].layout_changed.call(a.blocks[block_id])
    }
  }), $(".block_h").mouseover(function (a) {
    jQuery(this).children(".l_slot").children(".m_hover").clearQueue().show(), jQuery(this).children(".r_slot").children(".m_hover").clearQueue().show()
  }), $(".block_h").mouseout(function (a) {
    jQuery(this).children(".l_slot").children(".m_hover").clearQueue().hide(), jQuery(this).children(".r_slot").children(".m_hover").clearQueue().hide()
  });
  var a = this;
  $(".h_min").click(function () {
    var b = jQuery(this).parent().parent().parent().attr("id"), c = jQuery(this).parent().parent().parent().children(".block_content"), d = jQuery(this).parent().parent().parent().children(".block_h").children(".r_slot").children();
    if (a.get_block_state(b) == "closed") {
      jQuery(this).html("↑"), a.set_block_state(b, "open"), c.slideDown();
      var e = a.block_clbks["s_" + b];
      e && e()
    } else {
      jQuery(this).html("↓"), a.set_block_state(b, "closed"), c.slideUp();
      var e = a.block_clbks["h_" + b];
      e && e()
    }
  })
}, ScreenManager.prototype.make_sortable_arena = function () {
  var a = this;
  $(".l_group").sortable({
    handle: $(".b_handle"),
    connectWith: $("div.l_group"),
    placeholder: "widget-placeholder",
    forcePlaceholderSize: !0,
    revert: 300,
    delay: 100,
    opacity: .8,
    stop: function (b, c) {
      var d = $("#a_left_block").sortable("toArray");
      a.set_blocks_for_column("arena", "left", d);
      if (a.page_layout == "5c") {
        var e = $("#a_left_left_block").sortable("toArray");
        a.set_blocks_for_column("arena", "l_left", e)
      }
    }
  }), $("#a_central_block").sortable({
    handle: $(".b_handle"),
    placeholder: "widget-placeholder",
    forcePlaceholderSize: !0,
    revert: 300,
    delay: 100,
    opacity: .8,
    stop: function (b, c) {
      var d = $("#a_central_block").sortable("toArray");
      a.set_blocks_for_column("arena", "center", d)
    }
  }), $(".r_group").sortable({
    handle: $(".b_handle"),
    connectWith: $("div.r_group"),
    placeholder: "widget-placeholder",
    forcePlaceholderSize: !0,
    revert: 300,
    delay: 100,
    opacity: .8,
    stop: function (b, c) {
      var d = $("#a_right_block").sortable("toArray");
      a.set_blocks_for_column("arena", "right", d);
      if (a.page_layout == "5c") {
        var e = $("#a_right_right_block").sortable("toArray");
        a.set_blocks_for_column("arena", "r_right", e)
      }
    }
  }), $(".reset_layout").show(), $(".block_h").mouseover(function (a) {
    jQuery(this).children(".l_slot").children(".m_hover").clearQueue().show(), jQuery(this).children(".r_slot").children(".m_hover").clearQueue().show()
  }), $(".block_h").mouseout(function (a) {
    jQuery(this).children(".l_slot").children(".m_hover").clearQueue().hide(), jQuery(this).children(".r_slot").children(".m_hover").clearQueue().hide()
  });
  var a = this;
  $(".h_min").click(function () {
    var b = jQuery(this).parent().parent().parent().attr("id"), c = jQuery(this).parent().parent().parent().children(".block_content");
    a.get_arena_block_state(b) == "closed" ? (jQuery(this).html("↑"), a.set_arena_block_state(b, "open"), c.slideDown()) : (jQuery(this).html("↓"), a.set_arena_block_state(b, "closed"), c.slideUp())
  })
}, ScreenManager.prototype.create_block = function (a, b, c, d) {
  var e = !1, f, g;
  a == "hero" ? f = this.get_block_state : f = this.get_arena_block_state, f.apply(this, [c]) == "closed" ? (g = "↓", e = !0) : g = "↑";
  var h = "";
  d && (h = '<div border="0" align="middle" class="bar_spinner spinner_img" style="display: none;"></div>');
  var i = $("<div id='" + c + "'class='block'><div class='block_h'><span class='l_slot'> <span class='b_handle m_hover' style='display:none;' title='" + Loc.move_hint + "'>●</span> </span><div class='block_title'>" + b + "</div><span class='r_slot'>" + h + "<span class='h_min m_hover' style='display:none;'>" + g + "</span></span></div><div class='block_content'></div>");
  e && $(".block_content", i).hide();
  return i
}, ScreenManager.prototype.get_block_content = function (a) {
  return this.blocks[a] ? this.blocks[a].children(".block_content") : null
}, ScreenManager.prototype.get_block_caption = function (a) {
  return this.blocks[a].children(".block_h").children(".block_title")
}, ScreenManager.prototype.get_block_caption_by_parent_ref = function (a) {
  return a.children(".block_h").children(".block_title")
}, ScreenManager.prototype.get_a_block_content = function (a) {
  return this.a_blocks[a] ? this.a_blocks[a].children(".block_content") : null
}, ScreenManager.prototype.get_a_block_caption = function (a) {
  return this.a_blocks[a].children(".block_h").children(".block_title")
}, ScreenManager.prototype.get_block_caption_by_parent_ref = function (a) {
  return a.children(".block_h").children(".block_title")
}, ScreenManager.prototype.get_right_slot_by_parent_ref = function (a) {
  return a.children(".block_h").children(".r_slot")
}, ScreenManager.prototype.get_left_slot_by_parent_ref = function (a) {
  return a.children(".block_h").children(".l_slot")
}, ScreenManager.prototype.get_a_right_slot = function (a) {
  return this.a_blocks[a].children(".block_h").children(".r_slot")
}, ScreenManager.prototype.get_spinner = function (a) {
  return a.children(".block_h").children(".r_slot").children(".bar_spinner")
};
var create_messages_content = function (a, b, c, d, e, f) {
  jQuery.expr[":"].contains_i = function (a, b, c) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(c[3].toUpperCase()) >= 0
  };
  var g = $('<div class="frline fsearchbar"></div>'), h = $("<input></input>").attr({
    "class": "input_text",
    type: "text"
  });
  h.attr("placeholder", Loc.friend_filter_placeholder), g.append(h), d.search_bar = g, h.change(function () {
    var a = $(this).val();
    if (a) {
      d.f_list.find("div:not(:contains_i(" + a + "))").hide();
      var b = d.f_list.find("div:contains_i(" + a + ")").slice(0, 10);
      b.show()
    } else d.f_list.find("div").show(), $(".frlist_right").hide();
    $(".frdelete").hide()
  }).keyup(function () {
    $(this).change()
  });
  var i = function (c) {
    return function (e) {
      var f = "gc_" + c, g = function (b) {
        a.turbo_mode || (b.poll_updater = window.setInterval(function () {
          gv_log("chat poll update"), a.messages.load_msg_for_guild(c, undefined) && b.spinner.show()
        }, 6e4))
      }, h = function (d, e) {
        return function () {
          if (e.css("display") == "none") {
            $(".frbutton_pressed").removeClass("frbutton_pressed"), $(".frMsgBlock").hide(), e.show(), b.register(f, e.msg_area), a.messages.load_msg_for_guild(c, a.messages.gc_m_id) && d.spinner.show();
            var h;
            e.msg_area.scrollHeight ? h = e.msg_area.scrollHeight : h = e.msg_area.height(), e.msg_area_w.scrollTop(h), d.addClass("frbutton_pressed"), d.t_area.focus(), d.new_msg_mark && (d.new_msg_mark.remove(), d.new_msg_mark = undefined), g(d), a.turbo_mode || a.messages.load_msg_for_guild(c, undefined) && d.spinner.show()
          } else d.poll_updater && (window.clearInterval(d.poll_updater), d.poll_updater = undefined), b.unregister(f), e.hide(), d.removeClass("frbutton_pressed")
        }
      }, i = d["gc_" + c];
      if (i == undefined) {
        i = $('<div class="msgDock frDockCell"></div>'), $(".frbutton_pressed").removeClass("frbutton_pressed"), i.addClass("frbutton_pressed");
        var j = $('<div class="dockfrname_w"></div>');
        j.appendTo(i);
        var k = $('<div class="dockfrname"></div>').html(Loc.fr_gch_link).appendTo(j);
        i.fr_name_w = j, i.fr_name = k;
        var l = $('<div class="dockfr_close div_link">[x]</div>').hide();
        l.attr("title", Loc.fr_gch_close_title), l.click(function (a) {
          b.unregister(f), b.unregister_key_for_object("gc_mid", i), i.remove(), d["gc_" + c] = undefined, a.stopPropagation()
        }), i.append(l), d["gc_" + c] = i, i.prependTo(d.chat_placeholder);
        var m = $('<div class="dockfr_ppage div_link">➠</div>').hide();
        m.click(function (b) {
          window.open("/stats/guild/" + a.state.guild()), b.stopPropagation()
        }), m.attr("title", Loc.guild_link_title), i.append(m), i.mouseover(function (a) {
          l.clearQueue().show(), m.clearQueue().show()
        }), i.mouseout(function (a) {
          l.hide(), m.hide()
        });
        var n = $('<div class="frMsgBlock"></div>'), o = $('<div class="fr_chat_header">&nbsp;</div>').appendTo(n);
        subject = a.messages.get_gc_topic();
        var p = $('<div class="gc_topic"></div>').appendTo(n), q = $(window).height(), r = q - 300;
        r < 275 && (r = 275);
        var s = $('<div style="height:' + r + 'px;" class="frMsgArea"></div>').appendTo(n);
        s.subject = p, i.spinner = $('<div border="0" align="middle" class="msg_spinner spinner_img" style="display:none;right:25px;"></div>'), n.append(i.spinner);
        var t = $("<div></div>").appendTo(s);
        t.append($('<div class="fr_msg_loading"></div>').html(Loc.fr_loading_messages)), n.msg_area = t, n.msg_area_w = s;
        var u = $('<div class="frInputArea"></div>').appendTo(n), v = $('<textarea style="width:340px;height:28px;font-size:12px;"></textarea>').appendTo(u);
        i.t_area = v, v.bind("focus", function () {
          i.new_msg_mark && (i.new_msg_mark.remove(), i.new_msg_mark = undefined)
        }), window.setTimeout(function () {
          v.focus()
        }, 1), v.autogrow(), v.attr("disabled", "disabled");
        var w = function (b, c) {
          return function (d) {
            if (d.which == 13) {
              d.preventDefault();
              var e = b.val();
              b.attr("disabled", "disabled"), set_msg_update(a), i.spinner.show(), $.ajax({
                type: "POST",
                url: base_api_url,
                data: {
                  a: get_cmd_id("7Ub7bq4b4fKpsydXuVOm"),
                  b: prepare_args(JSON.stringify({m: e, sid: a.messages.gc_m_id}))
                },
                success: function (d) {
                  d.status == "success" ? (a.messages.process_msg_for_guild(a.messages, c, d.msg.reverse()), b.val(""), b.trigger("change"), b.focus()) : d.status == "error" && d.desc && (i.spinner.hide(), i.error_line.addClass("t_error"), i.error_line.text(d.desc), i.error_line.slideDown("fast", function () {
                    window.setTimeout(function () {
                      i.error_line.slideUp(), b.removeAttr("disabled")
                    }, 5e3)
                  }))
                },
                complete: function (a, c) {
                  b.removeAttr("disabled"), i.spinner.hide()
                },
                error: function (a, c, d) {
                  i.error_line.addClass("t_error"), i.error_line.text(Loc.network_error), i.error_line.slideDown("fast", function () {
                    window.setTimeout(function () {
                      i.error_line.slideUp(), b.removeAttr("disabled")
                    }, 5e3)
                  })
                }
              })
            }
          }
        };
        v.keypress(w(v, c)), i.m_block = n, i.append(n), $(".frMsgBlock").hide(), n.show(), i.show_new_msg_flag = function () {
          i && i.new_msg_mark == undefined && (i.new_msg_mark = $('<span class="fr_new_msg">★</span>'), i.new_msg_mark.attr("title", Loc.fr_new_messages_helper_title), i.new_msg_mark.prependTo(j))
        }, i.update = function () {
          $(v).is(":focus") || i.show_new_msg_flag(), n.css("display") != "none" && a.messages.load_msg_for_guild(c, a.messages.gc_m_id)
        }, i.error_line = $('<div class="gc_status" style="display:none;"></div>').appendTo(n), t.update = function () {
          gv_log("gc messages update " + n.children(".frdelete_link").length);
          if (n.children(".frclose_link").length == 0) {
            o.text(localize(Loc.fr_gch_w_title, {guild: a.state.guild()}));
            var b = $('<div class="frclose_link div_link">[x]</div>').appendTo(n);
            b.attr("title", Loc.fr_gch_close_title), b.click(function (a) {
              $(this).parent().parent().children(".dockfr_close").trigger("click"), a.stopPropagation();
              return !1
            });
            if (a.messages.gc_ext_perms) {
              var d = $('<div class="gc_banned_link div_link">❖</div>').appendTo(n);
              d.attr("title", Loc.fr_chat_banned_link), d.click(function () {
                i.spinner.show(), $.post(base_api_url, {a: get_cmd_id("R2jD74ywz4d7QXjcQ75r")}, function (a) {
                  i.spinner.hide();
                  if (a.status == "error" && a.desc)i.error_line.addClass("t_error"), i.error_line.text(a.desc), i.error_line.slideDown("fast", function () {
                    window.setTimeout(function () {
                      i.error_line.slideUp()
                    }, 5e3)
                  }); else if (a.status == "success") {
                    var b = !1, c = !0;
                    $(document).bind("afterClose.facebox", function () {
                      b && (b = !1, c = !1)
                    }), $(document).bind("beforeReveal.facebox", function () {
                      if (c) {
                        b = !0;
                        var d = jQuery("div#facebox div.popup div.content");
                        d.empty();
                        if (a.gods.length == 0)$('<div class="set_line" style="margin:1em;"></div>').html(Loc.fr_chat_banned_empty).appendTo(d); else {
                          d.append(jQuery("<h4></h4>").html(Loc.fr_chat_banned));
                          var e = jQuery('<div class="set_line"></div>').appendTo(d), f = $('<table id="gc_banned_t"></table').appendTo(e), g = $('<div style="display:none;">test</div>').appendTo(e), h = $("<tr></tr>").appendTo(f);
                          $("<th></th>").html(Loc.fr_chat_banned_god).appendTo(h), $("<th></th>").html(Loc.fr_chat_banned_hero).appendTo(h), $("<th></th>").html(Loc.fr_chat_banned_rank).appendTo(h);
                          var i = $('<div border="0" align="middle" style="display:none;right:8px;top:3px;left:auto; class="spinner_img"></div>');
                          $("<th></th>").html(Loc.fr_chat_banned_action).append(i).appendTo(h);
                          for (var j in a.gods) {
                            var k = a.gods[j], h = $("<tr></tr>").appendTo(f);
                            $("<td></td>").html($('<a target="_blank" href="/gods/' + k.u + '">' + k.u + "</a>")).appendTo(h), $("<td></td>").html(k.h).appendTo(h), $("<td></td>").html(k.r).appendTo(h);
                            var l = $("<td></td>").appendTo(h);
                            if (k.a) {
                              var m = $('<div class="div_link"></div>').html(Loc.fr_chat_unban).appendTo(l), n = function (a, b, c, d) {
                                return function (e) {
                                  var f = confirm(localize(Loc.fr_chat_unban_confirm, {god: a.u}));
                                  if (!f)return !1;
                                  b.show();
                                  var g = function (a) {
                                    return function (d) {
                                      b.hide(), d.desc && (d.status == "error" ? c.addClass("t_error") : (c.removeClass("t_error"), $(a).remove()), c.text(d.desc), c.slideDown("fast", function () {
                                        window.setTimeout(function () {
                                          c.slideUp()
                                        }, 5e3)
                                      }))
                                    }
                                  };
                                  $.post(base_api_url, {
                                    a: get_cmd_id("vS9Mnm48PCKUaKPuwod6"),
                                    b: prepare_args(JSON.stringify({u: a.u}))
                                  }, g(d)), e.preventDefault();
                                  return !1
                                }
                              };
                              m.click(n(k, i, g, m))
                            }
                          }
                        }
                      }
                    }), jQuery.facebox.settings.closeImage = "/images/closelabel.png", jQuery.facebox.settings.loadingImage = "/images/loading.gif", jQuery.facebox({div: "#page_settings"});
                    var d = $("#facebox");
                    jQuery("div#facebox div.popup div.content").addClass("spage"), d.draggable({opacity: .5})
                  }
                })
              })
            }
          }
          var e = a.messages.get_gc_topic();
          e && s.subject.text(e), t.empty();
          var f = a.messages.get_msg_for_guild(c);
          a.messages.wr_perms ? v.attr("disabled") && (v.removeAttr("disabled"), v.val(""), v.focus()) : (v.attr("disabled", "disabled"), v.val(Loc.fr_chat_wr_unavail));
          if (f && f.length > 0) {
            for (id in f) {
              var g = f[id], h = $('<div class="fr_msg_l"></div>').text(g.m), j = new Date;
              j.setISO8601(g.t), j.setTime(j.getTime() + window.time_diff);
              var k = new Date, l = time_ago_interval(j), m;
              k - j < 864e5 ? m = formatted_date(j, !0) : m = formatted_date_full(j, !0);
              var p = "fr_msg_meta gc_fr_msg_meta fr_auth_lab", q = $('<div class="' + p + '"></div>');
              h.append(q);
              var r = $('<span class="gc_fr_msg_meta gc_fr_god gc_fr_el"></span>').text(g.u).attr("title", Loc.fr_chat_name).appendTo(q), u = function (a) {
                return function (b) {
                  v.val().length == 0 ? v.val("@" + a) : v.val(v.val() + " @" + a), v.focus(), b.stopPropagation();
                  return !1
                }
              };
              r.click(u(g.u)), $('<span class="gc_fr_el"></span>').text(l).attr("title", m).appendTo(q);
              if (a.messages.gc_ext_perms && g.u != a.state.godname()) {
                var w = $('<span style="display:none;" class="gc_fr_bg gc_fr_ban">[☠]</span>');
                w.attr("title", Loc.fr_chat_ban_link).prependTo(q);
                var x = function (a, b, c) {
                  return function () {
                    var d = confirm(localize(Loc.fr_chat_ban_confirm, {god: b}));
                    if (!d)return !1;
                    i.spinner.show(), $.post(base_api_url, {
                      a: get_cmd_id("VLL6RhIsTFlKlHly3rUb"),
                      b: prepare_args(JSON.stringify({u: b, m: c}))
                    }, function (b) {
                      i.spinner.hide(), b.desc && (b.status == "error" ? i.error_line.addClass("t_error") : i.error_line.removeClass("t_error"), i.error_line.text(b.desc), i.error_line.slideDown("fast", function () {
                        window.setTimeout(function () {
                          i.error_line.slideUp()
                        }, 5e3)
                      })), a.remove()
                    })
                  }
                };
                w.click(x(w, g.u, g.m))
              }
              var y = function (a) {
                return function (b) {
                  window.open("/gods/" + a), b.stopPropagation();
                  return !1
                }
              }, z;
              g.u != a.state.godname() && (z = $('<span style="display:none;" class="gc_fr_bg gc_fr_page">[➠]</span>'), z.attr("title", Loc.fr_chat_to_ppage).prependTo(q), z.click(y(g.u)));
              var A = function (a, b) {
                return function () {
                  a && a.clearQueue().show(), b && b.clearQueue().show()
                }
              }, B = function (a, b) {
                return function () {
                  a && a.hide(), b && b.hide()
                }
              };
              h.mouseover(A(w, z)), h.mouseout(B(w, z));
              var C = g.m.indexOf("@" + a.state.godname()), D = g.m[C + a.state.godname().length + 1];
              C != -1 && (D == undefined || !D.match(/[а-яёa-z0-9A-ZА-ЯЁ]/)) && h.addClass("m_infl"), g.s ? h.addClass("gc_sys_msg") : g.u == a.state.godname() && h.addClass("fr_msg_l_my"), t.append(h)
            }
            var E;
            t.scrollHeight ? E = t.scrollHeight : E = t.height(), t.current_position && (E = E - t.current_position, t.current_position = undefined), s.scrollTop(E)
          } else a.messages.gc_error ? (t.append($('<div class="fr_no_messages"></div>').text(a.messages.gc_error)), v.attr("disabled", "disabled")) : (t.append($('<div class="fr_no_messages"></div>').html(Loc.fr_gch_no_messages)), v.attr("disabled") && a.messages.wr_perms && (v.removeAttr("disabled"), v.val(""), v.focus()));
          i.spinner.css("display") != "none" && i.spinner.hide()
        }, b.register("gc_mid", i), b.register(f, t), a.messages.load_msg_for_guild(c, undefined), g(i), i.fr_name_w.click(h(i, n))
      } else i.fr_name_w.trigger("click")
    }
  };
  if (a.state.guild().length > 0) {
    d.fpopup.gch = $('<div class="div_link frline show_gc fr_line_top"></div>').html(Loc.fr_gch_link);
    var j = "__guildchat";
    d.fpopup.gch.click(i(j)), window.fbe ? d.fpopup.prepend(d.fpopup.gch) : d.fpopup.append(d.fpopup.gch), d.fpopup.gch.update = function () {
      var b = a.messages.get_gc_msg_cnt();
      b > 0 && (d["gc_" + j] == undefined || d["gc_" + j].hasClass("frbutton_pressed") == !1) ? d.fpopup.gch.html(Loc.fr_gch_link + " (" + b + ")") : d.fpopup.gch.html(Loc.fr_gch_link)
    }, a.nm.register("gc_msg_badge", d.fpopup.gch), d.fpopup.gch.update.call(d.fpopup.gch)
  }
  if (window.fbe || f) {
    var k = a.state;
    d.fpopup.invite = $('<div id="fr_invite" style="display:none;" class="frline div_link fr_line_top"></div>'), k.invites_left() > 0 ? d.fpopup.invite.html(Loc.fr_invite_friend + " (" + k.invites_left() + ")") : d.fpopup.invite.html(Loc.fr_invite_friend), window.fbe ? d.fpopup.prepend(d.fpopup.invite) : d.fpopup.append(d.fpopup.invite.hide()), k.invites_left() > 0 && d.fpopup.invite.show(), d.fpopup.invite.update = function () {
      var a = Loc.fr_invite_friend, b = !1;
      k.invites_left() > 0 && (a = Loc.fr_invite_friend + " (" + k.invites_left() + ")", b = !0), this.css("display") == "none" && b ? this.fadeIn() : this.css("display") != "none" && b == !1 && this.hide(), d.fpopup.invite.html(a)
    }, a.ui.create_invite_friends_panel(a, d.fpopup.invite), b.register("invites_left", d.fpopup.invite)
  }
  e == !1 ? d.fpopup.append(d.search_bar) : d.fpopup.prepend(d.search_bar);
  var l = function (c) {
    var e = function (b, d) {
      return function () {
        if (d.css("display") == "none") {
          $(".frbutton_pressed").removeClass("frbutton_pressed"), $(".frMsgBlock").hide(), d.show();
          var e;
          d.msg_area.scrollHeight ? e = d.msg_area.scrollHeight : e = d.msg_area.height(), d.msg_area_w.scrollTop(e), b.addClass("frbutton_pressed"), b.t_area.focus(), b.new_msg_mark && (b.new_msg_mark.remove(), b.new_msg_mark = undefined)
        } else d.hide(), b.removeClass("frbutton_pressed");
        a.messages.mark_as_read(c)
      }
    }, f = d["fc_" + c];
    if (f == undefined) {
      f = $('<div class="msgDock frDockCell"></div>'), $(".frbutton_pressed").removeClass("frbutton_pressed"), f.addClass("frbutton_pressed");
      var h = "m_" + c, i = c;
      i.length > 13 && (i = i.substr(0, 12) + "...");
      var j = $('<div class="dockfrname_w"></div>');
      j.appendTo(f);
      var k = $('<div class="dockfrname"></div>').html(i).appendTo(j);
      f.fr_name_w = j, f.fr_name = k;
      var l = $('<div class="dockfr_close div_link">[x]</div>').hide();
      l.attr("title", Loc.fr_chat_close_title), l.click(function (a) {
        b.unregister(h), f.remove(), d["fc_" + c] = undefined, d["fl_" + c].removeClass("frline_a"), a.stopPropagation()
      }), f.append(l), d["fl_" + c].addClass("frline_a"), d["fc_" + c] = f, f.prependTo(d.chat_placeholder);
      var m = $('<div class="dockfr_ppage div_link">➠</div>').hide();
      m.click(function (a) {
        window.open("/gods/" + c), a.stopPropagation()
      }), m.attr("title", Loc.fr_chat_to_ppage), f.append(m), f.mouseover(function (a) {
        l.clearQueue().show(), m.clearQueue().show()
      }), f.mouseout(function (a) {
        l.hide(), m.hide()
      });
      var n = $('<div class="frMsgBlock"></div>'), o = $('<div class="fr_chat_header">&nbsp;</div>').appendTo(n), p = $('<div style="height:275px;" class="frMsgArea"></div>').appendTo(n);
      f.spinner = $('<div border="0" align="middle" class="msg_spinner spinner_img" style="display:none;right:25px;"></div>'), n.append(f.spinner);
      var q = $("<div></div>").appendTo(p);
      q.append($('<div class="fr_msg_loading"></div>').html(Loc.fr_loading_messages)), n.msg_area = q, n.msg_area_w = p;
      var r = $('<div class="frInputArea"></div>').appendTo(n);
      f.error_line = $('<div class="gc_status" style="display:none;"></div>').appendTo(n);
      var s = $('<textarea style="width:340px;height:28px;font-size:12px;"></textarea>').appendTo(r);
      f.t_area = s, window.setTimeout(function () {
        s.focus()
      }, 1), s.autogrow();
      var t = function (b, c) {
        return function (d) {
          if (d.which == 13) {
            d.preventDefault();
            var e = b.val();
            if (e.length > 4e3) {
              f.error_line.addClass("t_error"), f.error_line.text(Loc.fr_msg_too_long), f.error_line.slideDown("fast", function () {
                window.setTimeout(function () {
                  f.error_line.slideUp(), b.removeAttr("disabled")
                }, 5e3)
              });
              return
            }
            b.attr("disabled", "disabled"), set_msg_update(a), f.spinner.show(), $.ajax({
              type: "POST",
              url: base_api_url,
              data: {a: get_cmd_id("GJyYqhQtKRYCWFp1UwM5"), b: prepare_args(JSON.stringify({to: c, msg: e}))},
              success: function (a) {
                b.val(""), b.trigger("change")
              },
              complete: function (a, c) {
                b.removeAttr("disabled"), f.spinner.hide()
              },
              error: function (a, c, d) {
                f.error_line.addClass("t_error"), f.error_line.text(Loc.network_error), f.error_line.slideDown("fast", function () {
                  window.setTimeout(function () {
                    f.error_line.slideUp(), b.removeAttr("disabled")
                  }, 5e3)
                })
              }
            })
          }
        }
      };
      s.keypress(t(s, c)), f.m_block = n, f.append(n), $(".frMsgBlock").hide(), n.show(), f.show_new_msg_flag = function () {
        f && f.new_msg_mark == undefined && (f.new_msg_mark = $('<span class="fr_new_msg">★</span>'), window.isActive == !1 && a.play_sound("msg.mp3", !1), f.new_msg_mark.attr("title", Loc.fr_new_messages_helper_title), f.new_msg_mark.prependTo(j))
      }, f.update = function () {
        gv_log(c + " nm update");
        if (n.children(".frdelete_link").length == 0) {
          var b = a.messages.h_friends[c], e = Loc.fr_god_m, f = Loc.fr_god_m_link;
          b.ug && b.ug == "female" && (e = Loc.fr_god_f, f = Loc.fr_god_f_link);
          var h = Loc.fr_hero_m;
          b.hg && b.hg == "female" && (h = Loc.fr_hero_f);
          var i = localize(Loc.fr_chat_title, {
            god_title: e,
            god_name: c,
            god_link: f,
            hero_title: h,
            hero_name: b.heroname,
            hero_t: h
          });
          o.html(i);
          var j = $('<div class="frdelete_link div_link">☠</div>').appendTo(n), k = $('<div class="frclose_link div_link">[x]</div>').appendTo(n), l = $('<div class="fr_msg_delete_link div_link">♲</div>').appendTo(n);
          k.attr("title", Loc.fr_chat_close_title), k.click(function (a) {
            $(this).parent().parent().children(".dockfr_close").trigger("click"), a.stopPropagation();
            return !1
          }), j.attr("title", Loc.fr_delete_friend_title);
          var m = function (b, c) {
            return function (b) {
              b.preventDefault(), b.stopPropagation();
              var e = confirm(Loc.fr_friend_delete_confirm);
              if (!e)return !1;
              d["fl_" + c].remove(), d["fl_" + c] = undefined, d["fc_" + c] && d["fc_" + c].hide(), a.messages.mark_as_read(c), set_msg_update(a);
              var f = d["fc_" + c];
              f.spinner.show(), $.post(base_api_url, {
                a: get_cmd_id("QBx5eknHRruO94WLhxCR"),
                b: prepare_args(JSON.stringify({name: c}))
              }, function (a) {
                f.spinner.hide()
              })
            }
          };
          j.click(m(g, c)), l.attr("title", Loc.fr_msg_delete_all_title);
          var r = function (b) {
            return function (c) {
              c.stopPropagation();
              var e = confirm(Loc.fr_msg_delete_all_confirm);
              if (!e)return !1;
              var f = d["fc_" + b];
              f.spinner.show(), $.post(base_api_url, {
                a: get_cmd_id("oTSzzK6ZYFu0a4N7lDu1"),
                b: prepare_args(JSON.stringify({name: b}))
              }, function (c) {
                a.messages.delete_all_msg_for_friend(b), f.spinner.hide()
              });
              return !1
            }
          };
          l.click(r(c))
        }
        q.empty();
        var t = a.messages.get_msg_for_friend(c);
        if (t && t.length > 0) {
          var u = a.messages.h_pages[c];
          if (t.length % 25 == 0 && (q.last_page_num == undefined || q.last_page_num != u || q.max_page_num && q.max_page_num > u)) {
            var v = $('<div class="fr_msg_l fr_msg_next m_hover"></div>'), w = $('<img border="0" align="middle" class="fr_msg_spinner" style="display:none;" src="/images/spinner.gif"></img>');
            v.html(Loc.fr_more_messages), w.appendTo(v), v.click(function () {
              q.last_page_num = a.messages.h_pages[c], w.show(), a.messages.load_next_page_for_friend(c, a.messages.h_pages[c] + 1), q.scrollHeight ? q.current_position = q.scrollHeight : q.current_position = q.height()
            }), q.append(v)
          }
          q.max_page_num = u;
          var x = !1;
          for (id in t) {
            x = !1;
            var y = t[id], z = $('<div class="fr_msg_l"></div>').text(y.msg), A = new Date;
            A.setISO8601(y.sent_at), A.setTime(A.getTime() + window.time_diff);
            var B = new Date, C;
            B - A < 864e5 ? C = formatted_date(A, !0) : C = formatted_date_full(A, !0);
            var D = $('<div style="display:none;" class="fr_msg_meta"></div>'
            ).html(C);
            z.append(D);
            var E = $('<div style="display:none;" class="fr_msg_delete">[x]</div>');
            E.attr("title", Loc.fr_msg_delete_title), z.append(E);
            var F = function (b, c) {
              return function () {
                b.remove(), set_msg_update(a), $.post(base_api_url, {
                  a: get_cmd_id("QfW08b8BVphsw65Adv5D"),
                  b: prepare_args(JSON.stringify({id: c}))
                }, function (a) {
                })
              }
            };
            E.click(F(z, y.id));
            var G = function (a, b) {
              return function () {
                a.clearQueue().show(), b.clearQueue().show()
              }
            }, H = function (a, b) {
              return function () {
                a.hide(), b.hide()
              }
            };
            z.mouseover(G(D, E)), z.mouseout(H(D, E)), y.from == a.state.godname() && (z.addClass("fr_msg_l_my"), x = !0), q.append(z)
          }
          var I;
          q.scrollHeight ? I = q.scrollHeight : I = q.height(), q.current_position && (I = I - q.current_position, q.current_position = undefined), s.focus(), p.scrollTop(I), window.isActive == !1 && this.new_msg_mark == undefined && x == !1 && a.play_sound("msg.mp3", !1)
        } else q.append($('<div class="fr_no_messages"></div>').html(Loc.fr_chat_no_messages))
      }, b.register(h, f), a.messages.load_msg_for_friend(c), f.fr_name_w.click(e(f, n))
    } else f.fr_name_w.trigger("click")
  };
  d.update = function () {
    a.messages.friends.length == 0 ? d.no_friends == undefined ? (d.no_friends = $('<div class="fr_no_friends"></div>'), a.messages.loaded ? d.no_friends.html(Loc.fr_no_friends) : d.no_friends.html(Loc.fr_loading), e == !1 ? this.f_list.append(d.no_friends) : this.f_list.prepend(d.no_friends), this.search_bar.hide()) : a.messages.loaded ? d.no_friends.html(Loc.fr_no_friends) : d.no_friends.html(Loc.fr_loading) : d.no_friends && (d.no_friends.remove(), d.no_friends = undefined, this.search_bar.show());
    var b = a.messages.friends.reverse();
    $.each(a.messages.to_delete, function (b, c) {
      if (c) {
        var e = a.messages.h_friends[c];
        if (e && e.s == "del") {
          var f = d["fl_" + c];
          f && f.css("display") != "none" ? f.slideUp().delay(1e4).remove() : f && (f.remove(), d["fl_" + c] = undefined);
          var g = d["fc_" + c];
          g && (g.remove(), d["fc_" + c] = undefined), a.messages.mark_as_read(c), delete a.messages.h_friends[c]
        }
      }
    }), a.messages.to_delete = [];
    for (id in a.messages.to_update) {
      var c = a.messages.to_update[id], f = a.messages.h_friends[c], g = d["fl_" + c];
      if (f && g) {
        var h = $(".frmsg", g);
        h.removeClass("frmsg_o"), h.removeClass("frmsg_i"), f.msg ? (f.msg.from == a.state.godname() ? h.addClass("frmsg_o") : h.addClass("frmsg_i"), h.text(f.msg.msg), h.attr("title", f.msg.msg)) : (h.html(""), h.attr("title", ""))
      }
      var i = a.messages.h_friends[c].ms;
      if (d["fc_" + c]) {
        if (i && i == "upd")if (d["fc_" + c].hasClass("frbutton_pressed")) {
          a.messages.mark_as_read(c);
          var j = a.messages.last_msg_for_friend_author(c);
          j != a.state.godname() && a.nm.notify_all.apply(a.nm, [["new_msg_star"]])
        } else if (i && i == "upd") {
          a.messages.mark_as_read(c), !d["fc_" + c].hasClass("frbutton_pressed") && f.msg.from != a.state.godname() && (d["fc_" + c].show_new_msg_flag(), a.nm.notify_all.apply(a.nm, [["new_msg_star"]]));
          var k = d["fc_" + c], m = k.parent();
          k.detach(), m.prepend(k)
        }
        a.messages.load_msg_for_friend(c)
      } else i && i == "upd" ? a.messages.h_friends[c].msg && a.messages.h_friends[c].msg.from == a.state.godname() ? a.messages.mark_as_read(c) : g && g.new_msg_mark == undefined && (g.new_msg_mark = $('<span class="fr_new_msg">★</span>'), g.new_msg_mark.attr("title", Loc.fr_new_messages_helper_title), g.new_msg_mark.prependTo(g)) : g && g.new_msg_mark && (g.new_msg_mark.remove(), g.new_msg_mark = undefined)
    }
    a.messages.to_update = [];
    for (id in b) {
      var f = a.messages.h_friends[b[id].name], n, c = f.name, g = d["fl_" + c];
      if (g == undefined) {
        n = $('<div class="frline"></div>');
        var o = $('<span class="frname"></span>');
        n.append(o.text(f.name)), d["fl_" + c] = n;
        var p;
        f.msg ? (p = $('<div class="frmsg"></div>'), f.msg.from == a.state.godname() ? p.addClass("frmsg_o") : p.addClass("frmsg_i"), p.text(f.msg.msg), p.attr("title", f.msg.msg)) : p = $('<div class="frmsg"></div>'), n.append(p).ellipsis(), f.ms && f.ms == "upd" && (f.msg && f.msg.from == a.state.godname() ? a.messages.mark_as_read(c) : (n.new_msg_mark = $('<span class="fr_new_msg">★</span>'), n.new_msg_mark.attr("title", Loc.fr_new_messages_helper_title), n.new_msg_mark.prependTo(n)));
        var q = function (b, c) {
          return function () {
            b.new_msg_mark && (b.new_msg_mark.remove(), b.new_msg_mark = undefined), a.messages.mark_as_read(c), l(c)
          }
        }, r = $('<div  style="display:none;" class="frlist_right div_link">➠</div>'), s = function (a) {
          return function (b) {
            window.open("/gods/" + a), b.stopPropagation()
          }
        };
        r.click(s(c)), r.attr("title", Loc.fr_chat_to_ppage), n.append(r);
        var t = function (a) {
          return function () {
            a.clearQueue().show()
          }
        }, u = function (a) {
          return function () {
            a.hide()
          }
        };
        n.mouseover(t(r)), n.mouseout(u(r)), n.click(q(n, f.name)), e == !1 ? this.f_list.append(n) : this.f_list.prepend(n)
      } else n = g, n.detach(), e == !1 ? this.f_list.append(n) : this.f_list.prepend(n)
    }
  }, d.update.call(d)
};
ScreenManager.prototype.create_messages_sh = function () {
  var a = $("#main_wrapper"), b = this, c = this.nm, d = $('<div class="msgDockWrapper"></div>');
  jQuery.browser.msie && d.addClass("ie_fix"), jQuery.browser.opera && d.addClass("opera_fix"), d.dock = $('<div class="msgDock frbutton"></div>').html(Loc.fr_button), d.chat_placeholder = $('<div class="chat_ph"></div>');
  var e = $('<div style="display:none;" class="fr_new_badge fr_new_badge_pos"></div>').appendTo(d.dock);
  e.attr("title", Loc.fr_link_badge_title);
  var f = undefined;
  e.update = function () {
    b.messages.fr_upd_cnt > 0 ? (this.html(b.messages.fr_upd_cnt), this.show(), f && f < b.messages.fr_upd_cnt && window.isActive == !1 && b.play_sound("msg.mp3", !1), f = b.messages.fr_upd_cnt) : this.hide()
  }, b.nm.register("messages_badge", e), d.dock.new_badge = e, e.update.call(e);
  var g = $('<div style="display:none;" class="fr_new_badge gc_new_badge gc_new_badge_pos"></div>').appendTo(d.dock);
  g.attr("title", Loc.fr_gch_link_badge_title), g.update = function () {
    var a = b.messages.get_gc_msg_cnt(), c = "__guildchat";
    a > 0 && (d["gc_" + c] == undefined || d["gc_" + c].hasClass("frbutton_pressed") == !1) ? (this.html(a), this.show()) : this.hide()
  }, b.nm.register("gc_msg_badge", g), d.dock.new_badge_gc = g, g.update.call(g), d.fpopup = $('<div class="msgDockPopup"></div>').hide(), d.f_list = $('<div class="msgDockPopupW"></div>'), d.append(d.dock), d.append(d.chat_placeholder), a.append(d), d.append(d.fpopup), d.f_list.appendTo(d.fpopup);
  var h = undefined;
  d.dock.click(function () {
    var a = $(window).height(), c = a - 200;
    c < 200 && (c = 200), d.f_list.attr("style", "max-height:" + c + "px;");
    if (d.fpopup.css("display") == "none") {
      d.fpopup.show(), d.dock.addClass("frbutton_m_pressed");
      var e = $(".msgDockPopupW")[0];
      setTimeout(function () {
        var a = jQuery(".msgDockPopupW")[0];
        h == undefined ? a.scrollTop = a.scrollHeight : a.scrollTop = h
      }, 1), window.fb_loaded && !window.fb_frame && FB.getLoginStatus(function (a) {
        a.status === "connected" && b.state.invites_left() > 0 && d.fpopup.invite.show()
      })
    } else {
      var e = $(".msgDockPopupW")[0];
      h = $(e).scrollTop(), d.dock.removeClass("frbutton_m_pressed"), d.fpopup.hide()
    }
  }), create_messages_content(b, c, a, d, !1, !1), $(document).bind("click", function (a) {
    if ($(a.target).parents(".msgDockWrapper").length === 0 && $(a.target).parents(".fr_msg_l").length === 0) {
      var b = $(".frbutton_pressed");
      $(".dockfrname_w", b).trigger("click"), $(".frbutton_m_pressed").trigger("click")
    }
  }), b.nm.register("messages", d), b.messages.loaded && d.update.call(d)
}, ScreenManager.prototype.create_messages_fb = function () {
  var a = $("#main_wrapper"), b = this, c = this.nm, d = $('<div class="msgDockWrapper"></div>');
  jQuery.browser.msie && d.addClass("ie_fix"), jQuery.browser.opera && d.addClass("opera_fix"), d.dock = $("#tb_friends"), $("#tb_friends").html(Loc.fr_button), d.chat_placeholder = $('<div class="chat_ph_fb"></div>');
  var e = $('<div style="display:none;" class="fr_new_badge fr_new_badge_fb"></div>').appendTo(d.dock);
  e.update = function () {
    b.messages.fr_upd_cnt > 0 ? (this.html(b.messages.fr_upd_cnt), this.show()) : this.hide()
  }, b.nm.register("messages_badge", e), d.dock.new_badge = e, e.update.call(e), d.fpopup = $('<div class="msgDockPopupFb"></div>').hide(), d.f_list = $('<div class="msgDockPopupW"></div>'), d.append(d.chat_placeholder), a.append(d), $("#tb_friends_w").append(d.fpopup), d.f_list.appendTo(d.fpopup), d.dock.click(function () {
    d.fpopup.css("display") == "none" ? (d.fpopup.show(), d.dock.addClass("frbutton_m_pressed"), $("#tb_friends_w").addClass("frbutton_pressed")) : (d.dock.removeClass("frbutton_m_pressed"), $("#tb_friends_w").removeClass("frbutton_pressed"), d.fpopup.hide())
  }), create_messages_content(b, c, a, d, !0, !0), $(document).bind("click", function (a) {
    if ($(a.target).parents(".msgDockWrapper").length === 0 && $(a.target).parents(".tb_friends_cell").length === 0 && $(a.target).parents(".fr_msg_l").length === 0) {
      var b = $(".frbutton_pressed");
      $(".dockfrname_w", b).trigger("click"), $(".frbutton_m_pressed").trigger("click")
    }
  }), b.nm.register("messages", d), b.messages.loaded && d.update.call(d)
}, ScreenManager.prototype.create_messages = function () {
  window.fb_frame ? this.create_messages_fb() : this.create_messages_sh()
}, ScreenManager.prototype.create_3d_block = function (a) {
  var b = $("<div></div>").appendTo(a);
  $('<canvas id="example"></canvas>').appendTo(b), $('<div id="framerate"></div>').appendTo(b).hide(), $('<div id="console"></div>').appendTo(b), start()
}, ScreenManager.prototype.create_initial_hero = function () {
  this.create_hero_layout();
  var a = this.get_block_content("stats");
  this.nm.register("name", this.ui.hero_name_line(Loc.hname_capt, this.state.stats.name, this.state.stats.godname)).appendTo(a), window.fb_frame && this.nm.register("godname", this.ui.simple_line(Loc.gname_a_capt, this.state.stats.godname)).appendTo(a), this.nm.register("motto", this.ui.motto_line(this.state, Loc.motto_capt, this.state.stats.motto, !0)).appendTo(a), this.nm.register("alignment", this.ui.simple_line(Loc.alignment_capt, this.state.stats.alignment)).appendTo(a), this.nm.register("clan", this.ui.guild_name_line(Loc.guild_capt, this.state.stats)).appendTo(a), this.nm.register("level", this.ui.line_w_progress(Loc.hlevel_capt, this.state.stats.level, this.state.stats.exp_progress, "#F9B436", Loc.pr_level)).appendTo(a), window.fb_frame || (this.nm.register("inventory_num", this.ui.line_w_progress_2val(Loc.inv_capt, this.state.stats.inventory_num, this.state.stats.inventory_max_num, "#882D17", Loc.pr_inv)).appendTo(a), this.nm.register("health", this.ui.health_line(Loc.health_capt, this.state.stats.health, this.state.stats.max_health)).appendTo(a)), this.nm.register("quest", this.ui.quest_line(Loc.quest_capt, this.state.stats.quest, this.state.stats.quests_completed, this.state.stats.quest_progress, "pink")).appendTo(a), window.fb_frame || this.nm.register("gold_we", this.ui.simple_line(Loc.gold_capt, this.state.stats.gold_we)).appendTo(a), this.nm.register("monsters_killed", this.ui.simple_line(Loc.m_killed_capt, this.state.stats.monsters_killed)).appendTo(a), this.nm.register("death_count", this.ui.simple_line(Loc.death_count_capt, this.state.stats.death_count)).appendTo(a), this.nm.register("win_lost", this.ui.win_loss_line(this, this.blocks.stats, Loc.win_loss_capt, this.state.stats.arena_won, this.state.stats.arena_lost)).appendTo(a), this.nm.register("bricks_cnt", this.ui.bricks_line(Loc.bricks_capt, this.state.stats.bricks_cnt, this.state.stats.temple_completed_at)).appendTo(a), this.nm.register("wood", this.ui.wood_line(Loc.wood_capt, this.state.stats.wood)).appendTo(a), this.nm.register("retirement", this.ui.retirement_line(Loc.retirement_capt, this.state.stats.retirement, this.state.stats.temple_completed_at)).appendTo(a), this.nm.register("aura_name", this.ui.aura_line(Loc.aura_capt, this.state)).appendTo(a), this.nm.register("distance", this.ui.distance_line(Loc.town_capt, this.state, this.state.stats.distance, this.state.stats)).appendTo(a), $('<div class="line"></div>').appendTo(a);
  var b = this.blocks.pet;
  if (b) {
    var c = this.get_block_content("pet");
    this.ui.pet_block(this, !1, b, c, this.state)
  }
  var d = this.blocks.trader;
  if (d) {
    var c = this.get_block_content("trader");
    this.ui.trader_block(this, !1, d, c, this.state)
  }
  a = this.get_block_content("inventory");
  if (a) {
    var e = this.get_spinner(this.blocks.inventory);
    this.nm.register("inventory", this.ui.create_inventory(this, undefined, this.blocks.inventory, this.state, this.state.inventory, e, !1, !1)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  b = this.blocks.invites, b && (c = this.get_block_content("invites"), this.ui.create_invites(this, b, c, this.state.stats.invites_left)), b = this.blocks.ideabox, b && (c = this.get_block_content("ideabox"), this.create_ideabox(b, c, this.state)), a = this.get_block_content("diary");
  if (a) {
    var f = !0;
    window.fb_frame && (f = !0), this.nm.register("diary", this.ui.create_diary(this, this.blocks.diary, this.state.diary, this.state.godname(), this.d_sort, f)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  a = this.get_block_content("news"), a && (this.nm.register("news", this.ui.create_news(this, this.blocks.news, this.state)).appendTo(a), $('<div class="line"></div>').appendTo(a));
  if (!window.gv_fzpg) {
    var a = this.get_block_content("control");
    this.nm.register("control", this.ui.create_control(this, this.blocks.control, this.state)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  a = this.get_block_content("pantheons");
  if (a) {
    var g = this, h = this.get_left_slot_by_parent_ref(this.blocks.pantheons), i = $('<div id="panth_new_badge" class="fr_new_badge panth_badge">1</div>').appendTo(h);
    i.update = function () {
      var a = g.pantheons.get_new_cnt();
      $("#panth_new_badge").html(a), a > 0 ? $("#panth_new_badge").show() : $("#panth_new_badge").hide()
    }, this.block_clbks.s_pantheons = function () {
      i.hide(), g.nm.notify_all.apply(g.nm, [["pantheons"]])
    }, this.block_clbks.h_pantheons = function () {
    }, this.nm.register("pantheons_badge", i), this.ui.pantheons_block(this, a, this.state, !0, function () {
      return g.get_block_state("pantheons") == "open" ? !0 : !1
    }, function (a) {
      $("#panth_new_badge").html(a), $("#panth_new_badge").show()
    }, function () {
      $("#panth_new_badge").hide()
    })
  }
  a = this.get_block_content("equipment"), a && this.ui.equipment_block(this, !1, a, this.state.equipment, "equipment"), a = this.get_block_content("skills"), a && (this.nm.register("skills", this.ui.create_skills(this, this.state)).appendTo(a), $('<div class="line"></div>').appendTo(a)), window.gv3d && (a = this.get_block_content("gl3d"), a && this.create_3d_block(a)), a = this.get_block_content("ies_block"), a && (this.ui.create_ies_block(this, a, this.state), $('<div class="line"></div>').appendTo(a)), document.title = this.ui.make_title_line(this.state.stats.gender, this.state.stats.ggender, this.state.stats.godname, {value: ""})
}, ScreenManager.prototype.create_initial_arena = function () {
  this.create_arena_layout();
  var a = this.get_a_block_content("alls");
  if (a) {
    var b = this.get_a_block_caption("alls"), c = this.get_spinner(this.a_blocks.alls);
    b.html(Loc.alls_b_capt), this.nm.register("alls", this.ui.create_opps_block(this, c, this.a_blocks.alls, this.state.alls, 0)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  var a = this.get_a_block_content("m_info"), b = this.get_a_block_caption("m_info");
  b.html(Loc.m_info_b_capt), this.nm.register("godname", this.ui.god_name_line(Loc.gname_a_capt, this.state.stats)).appendTo(a), this.nm.register("name", this.ui.simple_line(Loc.hname_a_capt, this.state.stats.name)).appendTo(a), this.nm.register("age_str", this.ui.simple_line(Loc.age_capt, this.state.stats.age_str)).appendTo(a), this.nm.register("motto", this.ui.motto_line(this.state, Loc.motto_capt, this.state.stats.motto, !0)).appendTo(a), this.nm.register("alignment", this.ui.simple_line(Loc.alignment_capt, this.state.stats.alignment)).appendTo(a), this.nm.register("clan", this.ui.guild_name_line(Loc.guild_capt, this.state.stats)).appendTo(a), this.nm.register("level", this.ui.line_w_progress(Loc.hlevel_capt, this.state.stats.level, this.state.stats.exp_progress, "#F9B436", Loc.pr_level)).appendTo(a), window.fb_frame || (this.nm.register("inventory_num", this.ui.line_w_progress_2val(Loc.inv_capt, this.state.stats.inventory_num, this.state.stats.inventory_max_num, "#882D17", Loc.pr_inv)).appendTo(a), this.nm.register("health", this.ui.health_line(Loc.health_capt, this.state.stats.health, this.state.stats.max_health)).appendTo(a)), this.nm.register("gold_we", this.ui.simple_line(Loc.gold_capt, this.state.stats.gold_we)).appendTo(a), this.nm.register("death_count", this.ui.simple_line(Loc.death_count_capt, this.state.stats.death_count)).appendTo(a), this.nm.register("win_lost", this.ui.win_loss_line(this, this.a_blocks.m_stats, Loc.win_loss_capt, this.state.stats.arena_won, this.state.stats.arena_lost)).appendTo(a), this.nm.register("bricks_cnt", this.ui.bricks_line(Loc.bricks_capt, this.state.stats.bricks_cnt, this.state.stats.temple_completed_at)).appendTo(a), $('<div class="line"></div>').appendTo(a), a = this.get_a_block_content("m_inventory");
  if (a) {
    var c = this.get_spinner(this.a_blocks.m_inventory);
    this.nm.register("inventory", this.ui.create_inventory(this, undefined, this.a_blocks.m_inventory, this.state, this.state.inventory, c, !1, !1)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  this.ui.create_arena_fight_log(this);
  if (!window.gv_fzpg) {
    var a = this.get_a_block_content("m_control");
    this.nm.register("control", this.ui.create_control(this, this.a_blocks.m_control, this.state)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  this.state.fight_type() == "dungeon" ? (a = this.get_a_block_content("map"), this.nm.register("d_map", this.ui.create_map(this, a)).appendTo(a)) : this.a_blocks.map.attr("style", "display:none;");
  var a = this.get_a_block_content("opps");
  if (a) {
    var b = this.get_a_block_caption("opps"), c = this.get_spinner(this.a_blocks.opps);
    b.html(Loc.opps_b_capt), this.nm.register("opps", this.ui.create_opps_block(this, c, this.a_blocks.opps, this.state.opps, 1)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  a = this.get_a_block_content("o_info");
  if (a)if (this.state.fight_type() == "dungeon")this.a_blocks.o_info.attr("style", "display:none;"); else {
    b = this.get_a_block_caption("o_info"), b.html(Loc.o_info_b_capt);
    var d = this;
    if (d.state.o_stats.godname) {
      d.nm.register("o_godname", d.ui.god_name_line(Loc.gname_a_capt, d.state.o_stats)).appendTo(a);
      var e;
      d.state.o_stats.gender && d.state.o_stats.gender.value == "female" ? e = Loc.hname_a_capt_f : e = Loc.hname_a_capt_m, d.nm.register("o_name", d.ui.simple_line(e, d.state.o_stats.name)).appendTo(a)
    } else d.state.o_stats.g_name && d.state.o_stats.g_name.value ? d.nm.register("o_name", d.ui.wiki_link_line_w_value(Loc.hname_capt, Loc.monster_name_link_title, d.state.o_stats.name, d.state.o_stats.g_name)).appendTo(a) : d.nm.register("o_name", d.ui.wiki_link_line(Loc.hname_capt, Loc.monster_name_link_title, d.state.o_stats.name)).appendTo(a);
    d.state.o_stats.age_str && d.nm.register("o_age_str", d.ui.simple_line(Loc.age_capt, d.state.o_stats.age_str)).appendTo(a), d.nm.register("o_motto", d.ui.motto_line(d.state, Loc.motto_capt, d.state.o_stats.motto, !1)).appendTo(a), d.state.o_stats.alignment && d.nm.register("o_alignment", d.ui.simple_line(Loc.alignment_capt, d.state.o_stats.alignment)).appendTo(a), d.state.o_stats.clan && d.nm.register("o_clan", d.ui.guild_name_line(Loc.guild_capt, d.state.o_stats)).appendTo(a), d.state.o_stats.exp_progress && d.nm.register("o_level", d.ui.line_w_progress(Loc.hlevel_capt, d.state.o_stats.level, d.state.o_stats.exp_progress, "#F9B436", Loc.pr_level)).appendTo(a), d.nm.register("o_inventory_num", d.ui.line_w_progress_2val(Loc.inv_capt, d.state.o_stats.inventory_num, d.state.o_stats.inventory_max_num, "#882D17", Loc.pr_inv)).appendTo(a), d.nm.register("o_health", d.ui.health_line(Loc.health_capt, d.state.o_stats.health, d.state.o_stats.max_health).attr("id", "o_hl1")).appendTo(a), d.nm.register("o_gold_we", d.ui.simple_line(Loc.gold_capt, d.state.o_stats.gold_we)).appendTo(a), d.state.o_stats.death_count && d.nm.register("o_death_count", d.ui.simple_line(Loc.death_count_capt, d.state.o_stats.death_count)).appendTo(a), (d.state.o_stats.arena_won || d.state.o_stats.arena_lost) && d.nm.register("o_win_lost", d.ui.win_loss_line(d, null, Loc.win_loss_capt, d.state.o_stats.arena_won, d.state.o_stats.arena_lost)).appendTo(a), d.state.o_stats.bricks_cnt && d.nm.register("o_bricks_cnt", d.ui.bricks_line(Loc.bricks_capt, d.state.o_stats.bricks_cnt, d.state.o_stats.temple_completed_at)).appendTo(a);
    if (d.state.o_stats.ab && hash_keys(d.state.o_stats.ab).length > 0) {
      var f = "";
      $.each(d.state.o_stats.ab.value, function (a, b) {
        f += b, a < d.state.o_stats.ab.value.length - 1 && (f += ", ")
      });
      var b;
      d.state.o_stats.ab.value.length == 1 ? b = Loc.ability_s_b_capt : b = Loc.ability_b_capt;
      var g = d.ui.simple_line(b, {value: f}), h = $("<a></a>");
      h.attr("href", Loc.wiki_prefix + "/" + Loc.wiki_ab_page), h.attr("target", "_blank"), h.attr("title", Loc.wiki_general_title), h.html(f), h.click(function () {
        window.open(this.href);
        return !1
      }), g.v_e.html(h), g.appendTo(a)
    }
    $('<div class="line"></div>').appendTo(a)
  }
  a = this.get_a_block_content("o_inventory");
  if (a)if (this.state.fight_type() == "dungeon")this.a_blocks.o_inventory.attr("style", "display:none;"); else {
    var i = !1;
    if (this.state.fight_type() == "monster" || this.state.fight_type() == "monster_m" || this.state.fight_type() == "multi_monster")i = !0;
    this.nm.register("o_inventory", this.ui.create_inventory(this, undefined, this.a_blocks.o_inventory, this.state, this.state.o_inventory, null, i, !0)).appendTo(a), $('<div class="line"></div>').appendTo(a)
  }
  a = this.get_a_block_content("m_opponent"), a && (this.state.fight_type() == "dungeon" ? this.a_blocks.m_opponent.attr("style", "display:none;") : this.ui.create_m_oponent_block(this, a, this.state)), document.title = "(!) " + this.ui.make_title_line(this.state.stats.gender, this.state.stats.ggender, this.state.stats.godname, {value: ""});
  if (this.state.stats.perm_link && this.state.stats.perm_link.value) {
    var j = this, k = $("#fbclink");
    k.click(function (a) {
      window.open("/duels/log/" + j.state.stats.perm_link.value), a.stopPropagation();
      return !1
    }), k.parent().show()
  }
  var l = forced_update(this);
  window.onfocus = l
};
var swfobject = function () {
  function V(b) {
    var c = /[\\\"<>\.;]/, d = c.exec(b) != null;
    return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
  }

  function U(a, b) {
    if (!!x) {
      var c = b ? "visible" : "hidden";
      t && P(a) ? P(a).style.visibility = c : T("#" + a, "visibility:" + c)
    }
  }

  function T(c, d, e, f) {
    if (!y.ie || !y.mac) {
      var g = i.getElementsByTagName("head")[0];
      if (!g)return;
      var h = e && typeof e == "string" ? e : "screen";
      f && (v = null, w = null);
      if (!v || w != h) {
        var j = Q("style");
        j.setAttribute("type", "text/css"), j.setAttribute("media", h), v = g.appendChild(j), y.ie && y.win && typeof i.styleSheets != a && i.styleSheets.length > 0 && (v = i.styleSheets[i.styleSheets.length - 1]), w = h
      }
      y.ie && y.win ? v && typeof v.addRule == b && v.addRule(c, d) : v && typeof i.createTextNode != a && v.appendChild(i.createTextNode(c + " {" + d + "}"))
    }
  }

  function S(a) {
    var b = y.pv, c = a.split(".");
    c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0;
    return b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
  }

  function R(a, b, c) {
    a.attachEvent(b, c), o[o.length] = [a, b, c]
  }

  function Q(a) {
    return i.createElement(a)
  }

  function P(a) {
    var b = null;
    try {
      b = i.getElementById(a)
    } catch (c) {
    }
    return b
  }

  function O(a) {
    var b = P(a);
    if (b) {
      for (var c in b)typeof b[c] == "function" && (b[c] = null);
      b.parentNode.removeChild(b)
    }
  }

  function N(a) {
    var b = P(a);
    b && b.nodeName == "OBJECT" && (y.ie && y.win ? (b.style.display = "none", function () {
      b.readyState == 4 ? O(a) : setTimeout(arguments.callee, 10)
    }()) : b.parentNode.removeChild(b))
  }

  function M(a, b, c) {
    var d = Q("param");
    d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
  }

  function L(c, d, f) {
    var g, h = P(f);
    if (y.wk && y.wk < 312)return g;
    if (h) {
      typeof c.id == a && (c.id = f);
      if (y.ie && y.win) {
        var i = "";
        for (var j in c)c[j] != Object.prototype[j] && (j.toLowerCase() == "data" ? d.movie = c[j] : j.toLowerCase() == "styleclass" ? i += ' class="' + c[j] + '"' : j.toLowerCase() != "classid" && (i += " " + j + '="' + c[j] + '"'));
        var k = "";
        for (var l in d)d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
        h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", n[n.length] = c.id, g = P(c.id)
      } else {
        var m = Q(b);
        m.setAttribute("type", e);
        for (var o in c)c[o] != Object.prototype[o] && (o.toLowerCase() == "styleclass" ? m.setAttribute("class", c[o]) : o.toLowerCase() != "classid" && m.setAttribute(o, c[o]));
        for (var p in d)d[p] != Object.prototype[p] && p.toLowerCase() != "movie" && M(m, p, d[p]);
        h.parentNode.replaceChild(m, h), g = m
      }
    }
    return g
  }

  function K(a) {
    var c = Q("div");
    if (y.win && y.ie)c.innerHTML = a.innerHTML; else {
      var d = a.getElementsByTagName(b)[0];
      if (d) {
        var e = d.childNodes;
        if (e) {
          var f = e.length;
          for (var g = 0; g < f; g++)(e[g].nodeType != 1 || e[g].nodeName != "PARAM") && e[g].nodeType != 8 && c.appendChild(e[g].cloneNode(!0))
        }
      }
    }
    return c
  }

  function J(a) {
    if (y.ie && y.win && a.readyState != 4) {
      var b = Q("div");
      a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(K(a), b), a.style.display = "none", function () {
        a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
      }()
    } else a.parentNode.replaceChild(K(a), a)
  }

  function I(b, c, d, e) {
    u = !0, r = e || null, s = {success: !1, id: d};
    var g = P(d);
    if (g) {
      g.nodeName == "OBJECT" ? (p = K(g), q = null) : (p = g, q = d), b.id = f;
      if (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310)b.width = "310";
      if (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137)b.height = "137";
      i.title = i.title.slice(0, 47) + " - Flash Player Installation";
      var j = y.ie && y.win ? "ActiveX" : "PlugIn", k = "MMredirectURL=" + h.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + j + "&MMdoctitle=" + i.title;
      typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k;
      if (y.ie && y.win && g.readyState != 4) {
        var l = Q("div");
        d += "SWFObjectNew", l.setAttribute("id", d), g.parentNode.insertBefore(l, g), g.style.display = "none", function () {
          g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
        }()
      }
      L(b, c, d)
    }
  }

  function H() {
    return !u && S("6.0.65") && (y.win || y.mac) && !(y.wk && y.wk < 312)
  }

  function G(c) {
    var d = null, e = P(c);
    if (e && e.nodeName == "OBJECT")if (typeof e.SetVariable != a)d = e; else {
      var f = e.getElementsByTagName(b)[0];
      f && (d = f)
    }
    return d
  }

  function F() {
    var b = m.length;
    if (b > 0)for (var c = 0; c < b; c++) {
      var d = m[c].id, e = m[c].callbackFn, f = {success: !1, id: d};
      if (y.pv[0] > 0) {
        var g = P(d);
        if (g)if (S(m[c].swfVersion) && !(y.wk && y.wk < 312))U(d, !0), e && (f.success = !0, f.ref = G(d), e(f)); else if (m[c].expressInstall && H()) {
          var h = {};
          h.data = m[c].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
          var i = {}, j = g.getElementsByTagName("param"), k = j.length;
          for (var l = 0; l < k; l++)j[l].getAttribute("name").toLowerCase() != "movie" && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
          I(h, i, d, e)
        } else J(g), e && e(f)
      } else {
        U(d, !0);
        if (e) {
          var n = G(d);
          n && typeof n.SetVariable != a && (f.success = !0, f.ref = n), e(f)
        }
      }
    }
  }

  function E() {
    var c = i.getElementsByTagName("body")[0], d = Q(b);
    d.setAttribute("type", e);
    var f = c.appendChild(d);
    if (f) {
      var g = 0;
      (function () {
        if (typeof f.GetVariable != a) {
          var b = f.GetVariable("$version");
          b && (b = b.split(" ")[1].split(","), y.pv = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)])
        } else if (g < 10) {
          g++, setTimeout(arguments.callee, 10);
          return
        }
        c.removeChild(d), f = null, F()
      })()
    } else F()
  }

  function D() {
    k ? E() : F()
  }

  function C(b) {
    if (typeof h.addEventListener != a)h.addEventListener("load", b, !1); else if (typeof i.addEventListener != a)i.addEventListener("load", b, !1); else if (typeof h.attachEvent != a)R(h, "onload", b); else if (typeof h.onload == "function") {
      var c = h.onload;
      h.onload = function () {
        c(), b()
      }
    } else h.onload = b
  }

  function B(a) {
    t ? a() : l[l.length] = a
  }

  function A() {
    if (!t) {
      try {
        var a = i.getElementsByTagName("body")[0].appendChild(Q("span"));
        a.parentNode.removeChild(a)
      } catch (b) {
        return
      }
      t = !0;
      var c = l.length;
      for (var d = 0; d < c; d++)l[d]()
    }
  }

  var a = "undefined", b = "object", c = "Shockwave Flash", d = "ShockwaveFlash.ShockwaveFlash", e = "application/x-shockwave-flash", f = "SWFObjectExprInst", g = "onreadystatechange", h = window, i = document, j = navigator, k = !1, l = [D], m = [], n = [], o = [], p, q, r, s, t = !1, u = !1, v, w, x = !0, y = function () {
    var f = typeof i.getElementById != a && typeof i.getElementsByTagName != a && typeof i.createElement != a, g = j.userAgent.toLowerCase(), l = j.platform.toLowerCase(), m = l ? /win/.test(l) : /win/.test(g), n = l ? /mac/.test(l) : /mac/.test(g), o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1, p = !1, q = [0, 0, 0], r = null;
    if (typeof j.plugins != a && typeof j.plugins[c] == b)r = j.plugins[c].description, r && (typeof j.mimeTypes == a || !j.mimeTypes[e] || !!j.mimeTypes[e].enabledPlugin) && (k = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof h.ActiveXObject != a)try {
      var s = new ActiveXObject(d);
      s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
    } catch (t) {
    }
    return {w3: f, pv: q, wk: o, ie: p, win: m, mac: n}
  }(), z = function () {
    !y.w3 || ((typeof i.readyState != a && i.readyState == "complete" || typeof i.readyState == a && (i.getElementsByTagName("body")[0] || i.body)) && A(), t || (typeof i.addEventListener != a && i.addEventListener("DOMContentLoaded", A, !1), y.ie && y.win && (i.attachEvent(g, function () {
      i.readyState == "complete" && (i.detachEvent(g, arguments.callee), A())
    }), h == top && function () {
      if (!t) {
        try {
          i.documentElement.doScroll("left")
        } catch (a) {
          setTimeout(arguments.callee, 0);
          return
        }
        A()
      }
    }()), y.wk && function () {
      if (!t) {
        if (!/loaded|complete/.test(i.readyState)) {
          setTimeout(arguments.callee, 0);
          return
        }
        A()
      }
    }(), C(A)))
  }(), W = function () {
    y.ie && y.win && window.attachEvent("onunload", function () {
      var a = o.length;
      for (var b = 0; b < a; b++)o[b][0].detachEvent(o[b][1], o[b][2]);
      var c = n.length;
      for (var d = 0; d < c; d++)N(n[d]);
      for (var e in y)y[e] = null;
      y = null;
      for (var f in swfobject)swfobject[f] = null;
      swfobject = null
    })
  }();
  return {
    registerObject: function (a, b, c, d) {
      if (y.w3 && a && b) {
        var e = {};
        e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, m[m.length] = e, U(a, !1)
      } else d && d({success: !1, id: a})
    }, getObjectById: function (a) {
      if (y.w3)return G(a)
    }, embedSWF: function (c, d, e, f, g, h, i, j, k, l) {
      var m = {success: !1, id: d};
      y.w3 && !(y.wk && y.wk < 312) && c && d && e && f && g ? (U(d, !1), B(function () {
        e += "", f += "";
        var n = {};
        if (k && typeof k === b)for (var o in k)n[o] = k[o];
        n.data = c, n.width = e, n.height = f;
        var p = {};
        if (j && typeof j === b)for (var q in j)p[q] = j[q];
        if (i && typeof i === b)for (var r in i)typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
        if (S(g)) {
          var s = L(n, p, d);
          n.id == d && U(d, !0), m.success = !0, m.ref = s
        } else {
          if (h && H()) {
            n.data = h, I(n, p, d, l);
            return
          }
          U(d, !0)
        }
        l && l(m)
      })) : l && l(m)
    }, switchOffAutoHideShow: function () {
      x = !1
    }, ua: y, getFlashPlayerVersion: function () {
      return {major: y.pv[0], minor: y.pv[1], release: y.pv[2]}
    }, hasFlashPlayerVersion: S, createSWF: function (a, b, c) {
      return y.w3 ? L(a, b, c) : undefined
    }, showExpressInstall: function (a, b, c, d) {
      y.w3 && H() && I(a, b, c, d)
    }, removeSWF: function (a) {
      y.w3 && N(a)
    }, createCSS: function (a, b, c, d) {
      y.w3 && T(a, b, c, d)
    }, addDomLoadEvent: B, addLoadEvent: C, getQueryParamValue: function (a) {
      var b = i.location.search || i.location.hash;
      if (b) {
        /\?/.test(b) && (b = b.split("?")[1]);
        if (a == null)return V(b);
        var c = b.split("&");
        for (var d = 0; d < c.length; d++)if (c[d].substring(0, c[d].indexOf("=")) == a)return V(c[d].substring(c[d].indexOf("=") + 1))
      }
      return ""
    }, expressInstallCallback: function () {
      if (u) {
        var a = P(f);
        a && p && (a.parentNode.replaceChild(p, a), q && (U(q, !0), y.ie && y.win && (p.style.display = "block")), r && r(s)), u = !1
      }
    }
  }
}();
(function () {
  if (!window.WebSocket && !window.MozWebSocket) {
    var a = window.console;
    if (!a || !a.log || !a.error)a = {
      log: function () {
      }, error: function () {
      }
    };
    if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
      a.error("Flash Player >= 10.0.0 is required.");
      return
    }
    location.protocol == "file:" && a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function (a, b, c, d, e) {
      var f = this;
      f.__id = WebSocket.__nextId++, WebSocket.__instances[f.__id] = f, f.readyState = WebSocket.CONNECTING, f.bufferedAmount = 0, f.__events = {}, b ? typeof b == "string" && (b = [b]) : b = [], setTimeout(function () {
        WebSocket.__addTask(function () {
          WebSocket.__flash.create(f.__id, a, b, c || null, d || 0, e || null)
        })
      }, 0)
    }, WebSocket.prototype.send = function (a) {
      if (this.readyState == WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";
      var b = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
      if (b < 0)return !0;
      this.bufferedAmount += b;
      return !1
    }, WebSocket.prototype.close = function () {
      this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
    }, WebSocket.prototype.addEventListener = function (a, b, c) {
      a in this.__events || (this.__events[a] = []), this.__events[a].push(b)
    }, WebSocket.prototype.removeEventListener = function (a, b, c) {
      if (a in this.__events) {
        var d = this.__events[a];
        for (var e = d.length - 1; e >= 0; --e)if (d[e] === b) {
          d.splice(e, 1);
          break
        }
      }
    }, WebSocket.prototype.dispatchEvent = function (a) {
      var b = this.__events[a.type] || [];
      for (var c = 0; c < b.length; ++c)b[c](a);
      var d = this["on" + a.type];
      d && d(a)
    }, WebSocket.prototype.__handleEvent = function (a) {
      "readyState"in a && (this.readyState = a.readyState), "protocol"in a && (this.protocol = a.protocol);
      var b;
      if (a.type == "open" || a.type == "error")b = this.__createSimpleEvent(a.type); else if (a.type == "close")b = this.__createSimpleEvent("close"); else {
        if (a.type != "message")throw"unknown event type: " + a.type;
        var c = decodeURIComponent(a.message);
        b = this.__createMessageEvent("message", c)
      }
      this.dispatchEvent(b)
    }, WebSocket.prototype.__createSimpleEvent = function (a) {
      if (document.createEvent && window.Event) {
        var b = document.createEvent("Event");
        b.initEvent(a, !1, !1);
        return b
      }
      return {type: a, bubbles: !1, cancelable: !1}
    }, WebSocket.prototype.__createMessageEvent = function (a, b) {
      if (document.createEvent && window.MessageEvent && !window.opera) {
        var c = document.createEvent("MessageEvent");
        c.initMessageEvent("message", !1, !1, b, null, null, window, null);
        return c
      }
      return {
        type: a, data: b, bubbles: !1, cancelable: !1
      }
    }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function (a) {
      WebSocket.__addTask(function () {
        WebSocket.__flash.loadManualPolicyFile(a)
      })
    }, WebSocket.__initialize = function () {
      if (!WebSocket.__flash) {
        WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation);
        if (!window.WEB_SOCKET_SWF_LOCATION) {
          a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
          return
        }
        var b = document.createElement("div");
        b.id = "webSocketContainer", b.style.position = "absolute", WebSocket.__isFlashLite() ? (b.style.left = "0px", b.style.top = "0px") : (b.style.left = "-100px", b.style.top = "-100px");
        var c = document.createElement("div");
        c.id = "webSocketFlash", b.appendChild(c), document.body.appendChild(b), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
          hasPriority: !0,
          swliveconnect: !0,
          allowScriptAccess: "always"
        }, null, function (b) {
          b.success || a.error("[WebSocket] swfobject.embedSWF failed")
        })
      }
    }, WebSocket.__onFlashInitialized = function () {
      setTimeout(function () {
        WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
        for (var a = 0; a < WebSocket.__tasks.length; ++a)WebSocket.__tasks[a]();
        WebSocket.__tasks = []
      }, 0)
    }, WebSocket.__onFlashEvent = function () {
      setTimeout(function () {
        try {
          var b = WebSocket.__flash.receiveEvents();
          for (var c = 0; c < b.length; ++c)WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])
        } catch (d) {
          a.error(d)
        }
      }, 0);
      return !0
    }, WebSocket.__log = function (b) {
      a.log(decodeURIComponent(b))
    }, WebSocket.__error = function (b) {
      a.error(decodeURIComponent(b))
    }, WebSocket.__addTask = function (a) {
      WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
    }, WebSocket.__isFlashLite = function () {
      if (!window.navigator || !window.navigator.mimeTypes)return !1;
      var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
      if (!a || !a.enabledPlugin || !a.enabledPlugin.filename)return !1;
      return a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
    }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
      WebSocket.__initialize()
    }, !1) : window.attachEvent("onload", function () {
      WebSocket.__initialize()
    }))
  }
})(), SimpleJsonProto.prototype.on_data = function (a, b) {
  b.status == "session_expired" && this.callback_obj.on_s_expired_callback.call(this.callback_obj), this.callback_obj.on_json && this.callback_obj.on_json.apply(this.callback_obj, [b])
}, SimpleJsonProto.prototype.notify_status = function (a, b) {
  this.callback_obj.on_status_changed.apply(this.callback_obj, [a, b])
}, JsonProto.prototype.on_data = function (a, b) {
  var c = "window.location.href = '/hero';";
  connect_string = "Hero.connected();";
  if (b.substring(0, c.length) == c)this.callback_obj.on_s_expired_callback.call(this.callback_obj); else if (this.state == "disconnected" && b.substring(0, connect_string.length) == connect_string) {
    var d = [];
    d.proto = a, this.notify_status("connected", d), this.state = "connected", remained = b.substring(connect_string.length), remained.length > 0 && this.handle_data(remained)
  } else b.substring(0, connect_string.length) != connect_string && this.state == "connected" && this.handle_data(b)
}, JsonProto.prototype.process_packet = function (a) {
  var b;
  this.packet_type == "1" ? gv_error("unsupported packet received") : b = a, json = JSON.parse(b), this.callback_obj.on_json && this.callback_obj.on_json.apply(this.callback_obj, [json])
}, JsonProto.prototype.handle_data = function (a) {
  if (this.packet_started)this.buffer = this.buffer + a, this.buffer.length == this.packet_size ? (this.packet_started = !1, this.process_packet(this.buffer), this.buffer = "") : (gv_error("incorrect package length 2: [" + this.buffer.length + "][" + this.packet_size + "][" + this.buffer + "]"), this.packet_started = !1, this.callback_obj.on_decode_error && this.callback_obj.on_decode_error.call(this.callback_obj)); else {
    var b = a;
    this.packet_type = b.substring(7, 8), this.packet_size = parseInt(b.substring(0, 7).replace(/ /g, "")) - 1, payload = b.substring(8), payload.length == this.packet_size ? this.process_packet(payload) : (gv_log("incorrect package length"), this.packet_started = !0, this.buffer = payload)
  }
}, JsonProto.prototype.notify_status = function (a, b) {
  this.callback_obj.on_status_changed.apply(this.callback_obj, [a, b])
};
var wsClient;
WsClient.prototype.set_callbacks = function (a, b) {
  wsClient.packet_handler.callback_obj = a, wsClient.connection_failed = b
}, WsClient.prototype.check_ws_connection = function () {
  wsClient.on_close()
}, WsClient.prototype.connect = function () {
  wsClient.ws_conn_interval_id = setTimeout(wsClient.check_ws_connection, 14e3);
  var a;
  "WebSocket"in window ? a = new WebSocket(wsClient.ws_url) : "MozWebSocket"in window && (a = new MozWebSocket(wsClient.ws_url)), a.onmessage = wsClient.on_message, a.onclose = wsClient.on_close, a.onerror = wsClient.on_close, a.onopen = wsClient.on_open;
  var b = [];
  b.proto = wsClient.transport_name, wsClient.packet_handler.notify_status.apply(wsClient.packet_handler, ["connecting", b])
}, WsClient.prototype.date_rcv_timeout = function () {
  wsClient.on_close()
}, WsClient.prototype.on_open = function () {
  wsClient.ws_conn_interval_id != 0 && (window.clearTimeout(wsClient.ws_conn_interval_id), wsClient.ws_conn_interval_id = 0), wsClient.data_rcv_timeout = setTimeout(wsClient.date_rcv_timeout, 14e3), wsClient.ws_set_connected_status()
}, WsClient.prototype.ws_set_connected_status = function () {
  if (typeof localStorage != "undefined")try {
    localStorage.setItem("ws_connected", "true")
  } catch (a) {
  }
}, WsClient.prototype.ws_get_connected_status = function () {
  if (typeof localStorage != "undefined")return localStorage.getItem("ws_connected") == "true" ? !0 : !1
}, WsClient.prototype.on_close = function (a) {
  wsClient.ws_conn_interval_id != 0 && (window.clearTimeout(wsClient.ws_conn_interval_id), wsClient.ws_conn_interval_id = 0), wsClient.data_rcv_timeout != 0 && (window.clearTimeout(wsClient.data_rcv_timeout), wsClient.data_rcv_timeout = 0), wsClient.ws_get_connected_status() == !1 ? wsClient.retry_cnt = 0 : wsClient.retry_cnt = 3, wsClient.packet_handler.state = "disconnected";
  if (wsClient.error_cnt < wsClient.retry_cnt) {
    wsClient.error_cnt++;
    var b = wsClient.error_cnt * 10, c = [];
    c.timeout = b, c.proto = wsClient.transport_name, wsClient.packet_handler.notify_status.apply(wsClient.packet_handler, ["error", c]), setTimeout(wsClient.connect, b * 1e3)
  } else {
    var c = [];
    c.proto = wsClient.transport_name, wsClient.packet_handler.notify_status.apply(wsClient.packet_handler, ["failed", c]), wsClient.connection_failed(wsClient.transport_name)
  }
}, WsClient.prototype.on_message = function (a) {
  wsClient.error_cnt = 0, wsClient.data_rcv_timeout != 0 && (window.clearTimeout(wsClient.data_rcv_timeout), wsClient.data_rcv_timeout = 0), wsClient.packet_handler.on_data.apply(wsClient.packet_handler, [wsClient.transport_name, a.data])
}, WsClient.prototype.unload = function () {
};
var pollClient;
PollClient.prototype.set_callbacks = function (a, b) {
  this.packet_handler.callback_obj = a
}, PollClient.prototype.updater = function () {
  var a = $.getJSON(pollClient.url, function (a) {
    if (pollClient.connected == !1) {
      pollClient.connected = !0;
      var b = [];
      b.proto = pollClient.transport_name, pollClient.packet_handler.notify_status.apply(pollClient.packet_handler, ["connected", b])
    }
    pollClient.packet_handler.on_data.apply(pollClient.packet_handler, [pollClient.transport_name, a])
  }).error(function () {
    var a = [];
    a.timeout = this.period, a.proto = pollClient.transport_name, pollClient.packet_handler.notify_status.apply(pollClient.packet_handler, ["error", a]), pollClient.connected = !1
  })
}, PollClient.prototype.single_fetch = function (a, b) {
  var c = $.getJSON(pollClient.url, function (c) {
    pollClient.packet_handler.on_data.apply(pollClient.packet_handler, [pollClient.transport_name, c]), b.call(a)
  })
}, PollClient.prototype.connect = function () {
  pollClient.timer_id != 0 && window.clearInterval(pollClient.timer_id);
  var a = [];
  a.proto = pollClient.transport_name, pollClient.packet_handler.notify_status.apply(pollClient.packet_handler, ["connecting", a]), pollClient.interval_id = setInterval(pollClient.updater, pollClient.period * 1e3)
}, PollClient.prototype.on_message = function (a) {
  this.error_cnt = 0, pollClient.timer_id != 0 && (window.clearInterval(pollClient.timer_id), pollClient.timer_id = 0)
}, PollClient.prototype.unload = function () {
  pollClient.timer_id != 0 && (window.clearInterval(pollClient.timer_id), pollClient.timer_id = 0)
};
var orbClient;
OrbClient.prototype.set_callbacks = function (a, b) {
  this.packet_handler.callback_obj = a, this.connection_failed = b
}, OrbClient.prototype.on_close = function (a) {
  orbClient.data_rcv_timeout != 0 && (window.clearTimeout(orbClient.data_rcv_timeout), orbClient.data_rcv_timeout = 0), orbClient.connected = !1, orbClient.packet_handler.state = "disconnected";
  if (orbClient.error_cnt < 1) {
    orbClient.error_cnt++, timeout = orbClient.error_cnt * 10;
    var b = [];
    b.code = a, b.timeout = timeout, b.proto = orbClient.transport_name, orbClient.packet_handler.notify_status.apply(orbClient.packet_handler, ["error", b]), setTimeout(orbClient.connect, timeout * 1e3)
  } else {
    var b = [];
    b.proto = orbClient.transport_name, orbClient.transport_enabled && (orbClient.packet_handler.notify_status.apply(orbClient.packet_handler, ["failed", b]), orbClient.connection_failed(orbClient.transport_name), orbClient.transport_enabled = !1)
  }
}, orb_data_rcv_timeout_f = function () {
  orbClient.on_close("timeout")
}, OrbClient.prototype.on_open = function () {
  orbClient.data_rcv_timeout != 0 && window.clearTimeout(orbClient.data_rcv_timeout), orbClient.conn_timeout != 0 && (window.clearTimeout(orbClient.conn_timeout), orbClient.conn_timeout = 0), orbClient.connected = !0, orbClient.data_rcv_timeout = setTimeout(orb_data_rcv_timeout_f, 1e4), orbClient.g_client.send("subscribe")
}, OrbClient.prototype.connect = function () {
  var a = orbClient.g_client;
  a.onmessage = orbClient.on_message, a.onclose = orbClient.on_close, a.onopen = orbClient.on_open, orbClient.conn_timeout = setTimeout(orb_data_rcv_timeout_f, 1e4);
  var b = [];
  b.proto = orbClient.transport_name, orbClient.packet_handler.notify_status.apply(orbClient.packet_handler, ["connecting", b]), a.connect("localhost", GvPushPort, !0)
}, OrbClient.prototype.on_message = function (a) {
  orbClient.error_cnt = 0, orbClient.data_rcv_timeout != 0 && (window.clearTimeout(orbClient.data_rcv_timeout), orbClient.data_rcv_timeout = 0), orbClient.packet_handler.on_data.apply(orbClient.packet_handler, [orbClient.transport_name, a])
}, OrbClient.prototype.unload = function () {
  orbClient.g_client && orbClient.g_client.reset()
};
var Hero = {
  transport_failed: function (a) {
    gv_error(a + " transport failed"), Hero.current_transport == Hero.ws_client_ref ? (Hero.c_mode_enabled == !0 ? Hero.current_transport = Hero.orb_client_ref : Hero.current_transport = Hero.poll_client_ref, Hero.current_transport.connect()) : Hero.poll_client_ref && Hero.current_transport == Hero.orb_client_ref && (Hero.current_transport = Hero.poll_client_ref, Hero.current_transport.connect())
  }, set_callbacks: function (a) {
    this.ws_client_ref && this.ws_client_ref.set_callbacks(a, this.transport_failed), this.orb_client_ref && this.orb_client_ref.set_callbacks(a, this.transport_failed), this.poll_client_ref && this.poll_client_ref.set_callbacks(a, this.transport_failed)
  }, connect: function () {
    this.t_mode_enabled == !1 ? Hero.current_transport = Hero.poll_client_ref : "WebSocket"in window || "MozWebSocket"in window ? this.current_transport = this.ws_client_ref : this.current_transport = this.orb_client_ref, this.current_transport.connect(), onunload = function () {
      wsClient.unload(), orbClient.unload()
    }
  }, init: function (a, b, c, d, e, f, g) {
    b && (this.poll_client_ref = pollClient = new PollClient(b, f, g)), this.ws_client_ref = wsClient = new WsClient(e, a), this.orb_client_ref = orbClient = new OrbClient(a), c.is_turbo_mode_enabled && (this.t_mode_enabled = c.is_turbo_mode_enabled.call(c)), c.is_comet_mode_enabled ? this.c_mode_enabled = c.is_comet_mode_enabled.call(c) : this.c_mode_enabled = !0, Hero.set_callbacks(c), b ? this.poll_client_ref.single_fetch(this, Hero.connect) : Hero.connect()
  }
}