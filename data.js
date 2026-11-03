// [phrase, Russian meaning, optional text for the voice]
window.D = {
hero: [
  ['Last palace, low','CS2','Последний на паласе, мало ХП','yel'],
  ['Jett dashed','Valorant','Джетт потратила рывок','pink'],
  ['One cracked, 240','Apex','У одного сломан щит, 240 градусов','mint'],
  ['Nano ready','Overwatch','Нано-усиление готово','white'],
  ['Flash for me','CS2','Кинь флешку, чтобы я вышел','pink'],
  ['Res me','Apex','Подними меня','yel'],
  ['Luna ult soon','Marvel Rivals','Скоро ульта Луны','lilac'],
  ['Spike down A','Valorant','Спайк заложен на A','mint'],
  ['My bad','Everywhere','Моя ошибка','white'],
],
say: {
  'Last':'Last one',
  'One cracked, 240':'One cracked, two forty','Res me':'Rez me','Util?':'You-till?','AWP mid':'A W P, mid','Op A long':'Op, A long',
  'Hit 90':'Hit ninety',"He's 20":"He's twenty",'Sova dart':'Sova dart','HG / high ground':'High ground','LG / low ground':'Low ground',
  'gl hf':'Good luck, have fun','gg':'G G','wp':'Well played','ns':'Nice shot','nt':'Nice try','mb':'My bad','np':'No problem','ty / thx':'Thanks','sry':'Sorry','brb':'Be right back','afk':'A F K','idk':"I don't know",'wdym':'What do you mean?','ff':'F F','diff':'Skill diff',
  'Two, B apps, one AWP, fall back':'Two, B apps, one A W P, fall back','one AWP':'One A W P','AWP':'A W P','Two A main, no dash, push':'Two, A main, no dash, push','Two A main':'Two, A main',
  '60':'Sixty','150':'One fifty','240':'Two forty','330':'Three thirty',
},
games: {
cs2: {
  name:'CS2', theme:'yel', tagline:'Every place has a name, and money decides the round.',
  groups:[
    {t:'The enemy', items:[
      ['One palace, low','Один на паласе, мало ХП'],["Last B apps, he's lit",'Последний на квартирах B, он подбит'],["He's 20",'У него 20 ХП'],['AWP mid','Снайпер на миде'],['Rush B','Раш на B'],['Stack A','На A много врагов'],['Lurker','Один враг ходит отдельно']]},
    {t:'Your team', items:[
      ['Flash for me','Кинь флешку, чтобы я вышел'],['Smoke window','Поставь смоук на окно'],['Molly B','Кинь молотов на B'],['Trade me','Иду первым, разменяй меня'],['Wide swing','Выход широко из-за угла'],['Fall back','Откатываемся'],['Rotate','Перекидываемся на другой плент']]},
    {t:'Money', items:[
      ['Eco','Эко-раунд, почти ничего не покупаем'],['Force','Форс: покупаем на все деньги'],['Save','Сейв: не воюем, сохраняем оружие'],['Full buy','Полная закупка'],['Drop me','Купи мне оружие и скинь его'],['Anti-eco','Раунд против их эко']]},
    {t:'The bomb', items:[
      ["Bomb's down A",'Бомба заложена на A'],["He's defusing",'Он обезвреживает бомбу'],['Kit?','Есть набор сапёра?'],['No time, save','Не успеваем, сохраняем оружие']]},
  ],
  fixes:[['Enemy with small health',"He's low",'У него мало ХП'],['Throw me flash','Flash for me','Кинь флешку, чтобы я вышел'],['I am killed him','Got him','Я его убил']],
  sayit:[['Palace','пэ́лэс'],['Ancient','э́йншнт'],['Anubis','эню́бис'],['Cache','кэш'],['Defuse','дифью́з'],['Site','сайт']],
  maps:['mirage','dust2','inferno','nuke','ancient','anubis','overpass','train','cache'], mapExt:'png', mapSource:'totalcsgo.com', mapUrl:'https://totalcsgo.com/callouts',
  radar:true,
  quiz:[
    {q:'The enemy has almost no health. What do you say?',o:["He's low","He's cracked",'Enemy with small health'],a:0,w:'"He\'s low" is the CS2 way. "Cracked" belongs to Apex.'},
    {q:'You want a teammate to blind the enemy so you can go out.',o:['Throw me flash','Flash for me','Give flash'],a:1,w:'"Flash for me" asks for a flash that helps you peek.'},
    {q:'What does "eco" mean?',o:['We buy almost nothing','We buy everything','We go to the eco site'],a:0,w:'An eco round means saving money for the next round.'},
    {q:'You want a teammate to buy you a gun.',o:['Rotate','Drop me','Trade me'],a:1,w:'"Drop me" means buy a gun and drop it for me.'},
    {q:'"Trade me" means…',o:['Swap teams with me','Kill the enemy who kills me','Sell me your skin'],a:1,w:'You go first. Your teammate gets the kill back.'},
  ],
},
valorant: {
  name:'Valorant', theme:'pink', tagline:'Places matter, but what they already used matters more.',
  groups:[
    {t:'The enemy', items:[
      ['Two A main','Двое на A мейне'],['Jett dashed','Джетт потратила рывок'],['No dash','Рывка нет, можно давить'],['Hit 90','Попал по нему на 90'],['Op A long','Снайпер с Оператором на A лонге'],['Sova dart','Разведывательный дротик Совы'],['Trip here','Здесь растяжка']]},
    {t:'Abilities', items:[
      ['Util?','Есть умения?'],['Flashing out','Кидаю ослепление на выход'],['Smoke heaven','Поставь смоук на хевен'],['Save your ult','Побереги ульту'],["I've got ult",'У меня готова ульта'],['Viper ult B','Ульта Вайпер на B']]},
    {t:'Money', items:[
      ['Eco','Эко-раунд, почти ничего не покупаем'],['Half buy','Покупаем только часть снаряжения'],['Bonus','Играем оружием с прошлого раунда'],['Full buy','Полная закупка'],['Buy me','Купи мне оружие']]},
    {t:'The spike', items:[
      ['Spike down A','Спайк заложен на A'],['Tap the spike','Начни и отмени дефуз, чтобы выманить врага'],['Stick the defuse','Не отпускай, дефузь до конца'],["He's defusing",'Он дефузит спайк']]},
  ],
  fixes:[['Bomb on A','Spike down A','Спайк заложен на A'],['He used jump','Jett dashed','Джетт потратила рывок'],['Give me weapon','Can you buy me?','Купишь мне оружие?']],
  sayit:[['Spike','спайк'],['Viper','ва́йпер'],['Heaven','хэ́вн'],['Ultimate','а́лтимэт']],
  maps:['ascent','bind','haven','split','lotus','icebox','pearl','fracture'], mapExt:'jpg', mapSource:'ExitLag Blog', mapUrl:'https://blog.exitlag.com/valorant-callouts',
  quiz:[
    {q:'Jett just used her escape ability. What do you call?',o:['Jett dashed','Jett is cracked','He used jump'],a:0,w:'"Jett dashed" tells your team she can\'t escape now.'},
    {q:'In Valorant the bomb is called…',o:['The bomb','The spike','The kit'],a:1,w:'It is always "the spike" in Valorant.'},
    {q:'"Tap the spike" means…',o:['Plant it fast','Start and cancel the defuse','Hit it with a knife'],a:1,w:'A fake defuse can bring a hiding enemy out.'},
    {q:'What does "Util?" ask?',o:['Do you have abilities left?','Are you alive?','Where is the enemy?'],a:0,w:'"Util" is short for utility, your abilities.'},
  ],
},
apex: {
  name:'Apex', theme:'mint', tagline:'No fixed names here. Give a bearing and a height.',
  compass:true,
  groups:[
    {t:'Height and enemies', items:[
      ['One cracked, 240','У одного сломан щит, 240 градусов'],['HG / high ground','Высота'],['LG / low ground','Низина'],['Cracked','Щит сломан'],['One shot','Остался на один выстрел'],['Knocked','Враг нокнут'],["He's popping batt",'Ставит батарейку, чинит щит'],['Beamed him','Нанёс ему много урона']]},
    {t:'Your squad', items:[
      ['Res me','Подними меня'],['Grab my banner','Забери мой баннер, чтобы возродить'],['Take high ground','Занимаем высоту'],['Rotate','Идём в зону'],['Third party','Подъехал третий отряд'],['Reset','Отходим и лечимся'],['Push now','Давим сейчас'],["Ring's closing",'Зона сужается']]},
  ],
  fixes:[['His armor is broken',"He's cracked",'У него сломан щит'],['Pick me up','Res me','Подними меня'],['He is on the hill','High ground','Он на высоте']],
  sayit:[['Cracked','крэкт'],['Knocked','нокт, первая k не читается'],['Thermite','сёрма́йт'],['Third party','сёрд па́рти']],
  quiz:[
    {q:'An enemy\'s shield is broken. What do you call?',o:["He's cracked","He's low",'His armor is broken'],a:0,w:'"Cracked" is the Apex word for a broken shield.'},
    {q:'How do you give a position in Apex?',o:['Map callout names only','Compass degrees and height','Left and right'],a:1,w:'Everyone sees the same compass, so numbers work best.'},
    {q:'"Third party" means…',o:['A third squad joined the fight','You invited a friend','The third round'],a:0,w:'Another squad heard the fight and came to take the kills.'},
    {q:'You are knocked and need help.',o:['Pick me up','Res me','Heal up'],a:1,w:'"Res me" is short for "resurrect me".'},
  ],
},
overwatch: {
  name:'Overwatch', theme:'orange', tagline:'Track the big abilities and call them out.',
  groups:[
    {t:'Abilities and ults', items:[
      ['Nano ready','Нано-усиление готово'],['Sleep used','Усыпляющий дротик Аны потрачен'],['Immortality down','Поле бессмертия сбито'],['Grav soon','Скоро гравитон Зари']]},
    {t:'Your team', items:[
      ['Focus Ana','Все бьём Ану'],['Peel for me','Отгоните от меня врага'],['Dive Zen','Прыгаем на Дзена'],['Flanker back','Фланкер у нас за спиной'],['Group up','Собираемся вместе'],["Don't stagger",'Не заходите по одному'],['Off-angle','Позиция сбоку от основного боя'],['Touch the point','Встань на точку'],['Overtime','Овертайм, бой за точку не закончен']]},
  ],
  fixes:[['Help me, he attacks','Peel for me','Отгоните от меня врага'],['Go together','Group up','Собираемся вместе']],
  sayit:[['Immortality','имортэ́лити'],['Overtime','о́вертайм']],
  quiz:[
    {q:'An enemy is chasing you and you need help.',o:['Peel for me','Help me, he attacks','Dive Zen'],a:0,w:'"Peel" means pull the enemy off a teammate.'},
    {q:'"Don\'t stagger" means…',o:["Don't walk in one by one","Don't jump",'Don\'t use your ult'],a:0,w:'Going in one by one loses fights, so wait and group up.'},
    {q:'Ana just used her sleep dart. You call…',o:['Sleep used','Ana is tired','Good night'],a:0,w:'Now your tank can go in with less risk.'},
  ],
},
rivals: {
  name:'Marvel Rivals', theme:'lilac', tagline:'Same habit as Overwatch, new heroes. Vanguard is a tank, Duelist does damage, Strategist heals.',
  groups:[
    {t:'Abilities and ults', items:[
      ['Luna ult soon','Скоро ульта Луны'],['Mantis sleep used','Усыпление Мантис потрачено'],['Strange portal','Портал Доктора Стрэнджа'],['Team-up ready','Командная способность готова'],['Kill the runes','Сломайте руны Локи'],['Find the real Loki','Ищите настоящего Локи']]},
    {t:'Your team', items:[
      ['Peel for me','Отгоните от меня врага'],['Dive the Strategist','Прыгаем на саппорта'],['Swap to Vanguard','Кому-то нужно перейти на танка'],['On point','Все на точку'],['Push the cart','Толкаем груз']]},
  ],
  sayit:[['Strategist','стра́тэджист'],['Vanguard','вэ́нгард'],['Duelist','дью́элист']],
  quiz:[
    {q:'In Marvel Rivals a Strategist is…',o:['A tank','A healer','A damage dealer'],a:1,w:'Vanguard tanks, Duelist deals damage, Strategist heals.'},
    {q:'Your team has no tank.',o:['Swap to Vanguard','Kill the runes','On point'],a:0,w:'Vanguard is the tank role.'},
    {q:'"Kill the runes" is about which hero?',o:['Loki','Luna','Mantis'],a:0,w:'Loki\'s runes keep the team alive, so break them.'},
  ],
},
},
chat:[
  ['gl hf','good luck, have fun: удачи и веселья'],['gg','good game: хорошая игра'],['wp','well played: хорошо сыграно'],['ns','nice shot: хороший выстрел'],['nt','nice try: хорошая попытка'],['mb','my bad: моя ошибка, а иногда maybe: может быть'],['np','no problem: без проблем'],['ty / thx','thank you, thanks: спасибо'],['sry','sorry: извини'],['brb','be right back: сейчас вернусь'],['afk','away from keyboard: отошёл от клавиатуры'],['idk',"I don't know: не знаю"],['wdym','what do you mean: что ты имеешь в виду'],['ff','forfeit: предложение сдаться'],['diff','difference: один игрок сильно лучше другого'],
],
survival:[
  ["My English is not great, but I'll call what I can",'Английский так себе, но инфу дам'],['Sorry, say again?','Извини, повтори'],['Slower, please','Помедленнее, пожалуйста'],['Got it','Понял'],['On it','Делаю'],
],
builder:{
  cs2:{name:'CS2',cols:[['How many',['One','Two','Three','Last']],['Where',['Palace','B apps','Mid','Long','Window']],["What's happening",['Low','Lit','One AWP','Smoke up','Rushing']],['What we do',['Fall back','Push','Rotate','Hold']]]},
  valorant:{name:'Valorant',cols:[['How many',['One','Two','Three','Last']],['Where',['A main','B long','Mid','Heaven','Garage']],["What's happening",['Hit 90','No dash','Op up','No util','Ult ready']],['What we do',['Push','Fall back','Rotate','Hold']]]},
  apex:{name:'Apex',cols:[['How many',['One','Two','Three']],['Where',['60','150','240','330']],["What's happening",['Cracked','One shot','Knocked','High ground']],['What we do',['Push now','Reset','Rotate','Take high ground']]]},
},
slug(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'x'},
};
