const _letters = {
  a: '•-',
  b: '-•••',
  c: '-•-•',
  d: '-••',
  e: '•',
  f: '••-•',
  g: '--•',
  h: '••••',
  i: '••',
  j: '•---',
  k: '-•-',
  l: '•-••',
  m: '--',
  n: '-•',
  o: '---',
  p: '•--•',
  q: '--•-',
  r: '•-•',
  s: '•••',
  t: '-',
  u: '••-',
  v: '•••-',
  w: '•--',
  x: '-••-',
  y: '-•--',
  z: '--••',
}

const _numbers = {
  0: '-----',
  1: '•----',
  2: '••---',
  3: '•••--',
  4: '••••-',
  5: '•••••',
  6: '-••••',
  7: '--•••',
  8: '---••',
  9: '----•',
}

const _nonEnglish = {
  á: '•--•-',
  à: '·−−·−', // shared by à, å
  ä: '·−·−', // shared by ä, æ, ą
  å: '·−−·−', // shared by à, å
  ą: '·−·−', // shared by ä, æ, ą
  æ: '·−·−', // shared by ä, æ, ą
  ć: '−·−··', // shared by ć, ĉ, ç
  ĉ: '−·−··', // shared by ć, ĉ, ç
  ç: '−·−··', // shared by ć, ĉ, ç
  đ: '··−··', // shared by đ, é, ę
  ð: '··−−·',
  é: '··−··', // shared by đ, é, ę
  è: '·−··−', // shared by è, ł
  ę: '··−··', // shared by đ, é, ę
  ĝ: '−−·−·',
  ĥ: '−−−−', // shared by ĥ, š
  ĵ: '·−−−·',
  ł: '·−··−', // shared by è, ł
  ń: '−−·−−', // shared by ń, ñ
  ñ: '−−·−−', // shared by ń, ñ
  ó: '−−−·', // shared by ó, ö, ø
  ö: '−−−·', // shared by ó, ö, ø
  ø: '−−−·', // shared by ó, ö, ø
  ś: '···−···',
  ŝ: '···−·',
  š: '−−−−', // shared by ĥ, š
  þ: '·−−··',
  ü: '··−−', // shared by ü, ŭ
  ŭ: '··−−', // shared by ü, ŭ
  ź: '−−··−·',
  ż: '−−··−',
}

const _punctuation = {
  '&': '•-•••',
  "'": '•----•',
  '@': '•--•-•',
  '$': '···−··−',
  ')': '-•--•-',
  '(': '-•--•',
  ':': '---•••',
  ',': '--••--',
  ';': '−·−·−·',
  '=': '-•••-',
  '!': '-•-•--',
  '•': '•-•-•-',
  '-': '-••••-',
  '_': '··−−·−',
  '+': '•-•-•',
  '"': '•-••-•',
  '?': '••--••',
  '/': '-••-•',
}

const _extra = {
  ' ': '/',
  '\n': '•-•-',
	'<CT>': '-•-•-',
	'<CQ>': '-•-•--•-',
	'<BT>': '-•••-'
}

const _toMorse = {
  ..._letters,
  ..._numbers,
  ..._nonEnglish,
  ..._punctuation,
  ..._extra,
}

const _fromMorse = Object.keys(_toMorse).reduce(
  (obj, char) => ({ ...obj, [_toMorse[char]]: char }),
  {}
)

const encode = (str) =>
  [...str.toLowerCase()].map((letter) => _toMorse[letter]).join(' ')

const decode = (str) =>
  str
    .split(' ')
    .map((morse) => _fromMorse[morse])
    .join('')