// Emperror's huitize script. for including into page
var huitize = function(str)
{
  var vowels = [
    'а' , 'я', 'э' , 'е', 'о' , 'ё', 'ы' , 'и', 'у' , 'ю'
  ];

  var c_vowels = {
    'а' : 'я',
    'э' : 'е',
    'о' : 'ё',
    'ы' : 'и',
    'у' : 'ю'
  };

  if (str.length !== 0)
  {
    str = transliterate(transliterate(str), true);
    var ch = str[0]; var i = 0;
    while (vowels.indexOf(ch) == -1 && i < str.length)
    {
      ch = str[i];
      i++;
    }
    if (i === 0) i++;
    var res = "ху";
    if (c_vowels[ch] !== undefined)
      res += c_vowels[ch];
    else
      res += ch;
    res += str.substring(i, str.length);
    return res;
  }
};

var transliterate = (
  function() {
    var rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
      eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
    return function(text, engToRus) {

      if (!/^[A-Za-z0-9]*$/.test(text[0]))
        return text;
      var x;
      for(x = 0; x < rus.length; x++) {
        text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
        text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
      }
      return text;
    };
  }
)();

window.huitize = huitize;