
exports.encode = function (input) {
  // throw for all non-sequence-like inputs
  if ((input && typeof input.length !== 'number') || (!input && input !== '')) {
    throw new Error('invalid encoder input: ' + input)
  }

  var base64 = new Buffer(input).toString('base64')
  var encoded = ''
  for (var i = 0, length = base64.length; i < length; i++) {
    encoded += ENCODE_TABLE[base64[i]]
  }

  return encoded
}

exports.decode = function (input) {
  // only accept string input
  if (typeof input !== 'string') {
    throw new Error('invalid decoder input: ' + input)
  }

  var base64 = ''
  for (var i = 0, length = input.length; i < length; i++) {
    base64 += DECODE_TABLE[input[i]]
  }

  return new Buffer(base64, 'base64')
}

var DECODE_TABLE = {
  '-': '=',
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E',
  '5': 'F',
  '6': 'G',
  '7': 'H',
  '8': 'I',
  '9': 'J',
  'A': 'K',
  'B': 'L',
  'C': 'M',
  'D': 'N',
  'E': 'O',
  'F': 'P',
  'G': 'Q',
  'H': 'R',
  'I': 'S',
  'J': 'T',
  'K': 'U',
  'L': 'V',
  'M': 'W',
  'N': 'X',
  'O': 'Y',
  'P': 'Z',
  'Q': 'a',
  'R': 'b',
  'S': 'c',
  'T': 'd',
  'U': 'e',
  'V': 'f',
  'W': 'g',
  'X': 'h',
  'Y': 'i',
  'Z': 'j',
  '_': 'k',
  'a': 'l',
  'b': 'm',
  'c': 'n',
  'd': 'o',
  'e': 'p',
  'f': 'q',
  'g': 'r',
  'h': 's',
  'i': 't',
  'j': 'u',
  'k': 'v',
  'l': 'w',
  'm': 'x',
  'n': 'y',
  'o': 'z',
  'p': '0',
  'q': '1',
  'r': '2',
  's': '3',
  't': '4',
  'u': '5',
  'v': '6',
  'w': '7',
  'x': '8',
  'y': '9',
  'z': '+',
  '~': '/',
}

var ENCODE_TABLE = {}
for (var c in DECODE_TABLE) {
  ENCODE_TABLE[DECODE_TABLE[c]] = c
}
