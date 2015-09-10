var test = require('tape')
var b64lex = require('../')

function hex(string) {
  return Buffer(string, 'hex')
}

var STRINGS = {
  '': '',
  '\0': '00--',
  '\0\0': '000-',
  '\0\0\0': '0000',
  '\0\0\xff': '0033kl--',
  '\0\xff': '0CE~',
  '\0\xff\0': '0CE~00--',
  '\0\xff\xff': '0CE~lwx-',
  '\xff': 'lwx-',
  '\xff\xff': 'lw~3kl--',
  '\xff\xff\xff': 'lw~3kxE~',
  
  'f': 'PW--',
  'fo': 'Pbx-',
  'foo': 'Pbyk',
  'foo ': 'Pbyk80--',
  'foo b': 'Pbyk868-',
  'foo ba': 'Pbyk869X',
  'foo bar': 'Pbyk869XSW--',

  'a': 'OG--',
  'aa': 'OM4-',
  'aaa': 'OM5X',
  'aab': 'OM5Y',
  'ab': 'OM8-',
  'aba': 'OM9X',
  'abb': 'OM9Y',
  'b': 'OW--',
  'ba': 'Ob4-',
  'baa': 'Ob5X',
  'bab': 'Ob5Y',
  'bb': 'Ob8-',
  'bba': 'Ob9X',
  'bbb': 'Ob9Y',
  // ...
}

test('encoding', function (t) {
  // string encoding
  var sources = Object.keys(STRINGS)
  var targets = sources.map(function (key) {
    return STRINGS[key]
  })

  var encoded = sources.map(b64lex.encode)
  t.deepEqual(encoded, targets)

  var decoded = encoded.map(b64lex.decode).map(String)
  t.deepEqual(decoded, sources)

  // buffer encoding
  t.equal(b64lex.encode(Buffer(0)), '')
  t.equal(b64lex.encode(Buffer([])), '')
  t.equal(b64lex.encode(Buffer([ 0 ])), '00--')
  t.equal(b64lex.encode(Buffer([ 0xde, 0xad, 0xbe, 0xef ])), 'sfrzwl--')
  t.equal(b64lex.encode(Buffer('deadbeef', 'hex')), 'sfrzwl--')
  t.equal(b64lex.encode([ 0xde, 0xad, 0xbe, 0xef ]), 'sfrzwl--')
  t.equal(b64lex.encode(new Uint8Array([ 0xde, 0xad, 0xbe, 0xef ])), 'sfrzwl--')

  // ensure lexicographical ordering preserved in encoding
  t.deepEqual(sources.sort().map(b64lex.encode), encoded.sort())
  t.deepEqual(targets.sort().map(b64lex.decode).map(String), decoded.sort())

  t.end()
})

test('invalid', function (t) {
  t.throws(b64lex.encode)
  t.throws(b64lex.encode.bind(b64lex, undefined))
  t.throws(b64lex.encode.bind(b64lex, null))
  t.throws(b64lex.encode.bind(b64lex, false))
  t.throws(b64lex.encode.bind(b64lex, true))
  t.throws(b64lex.encode.bind(b64lex, 0))
  t.throws(b64lex.encode.bind(b64lex, 1))
  t.throws(b64lex.encode.bind(b64lex, -1))
  t.throws(b64lex.encode.bind(b64lex, NaN))
  t.throws(b64lex.encode.bind(b64lex, {}))

  t.throws(b64lex.decode)
  t.throws(b64lex.decode.bind(b64lex, undefined))
  t.throws(b64lex.decode.bind(b64lex, null))
  t.throws(b64lex.decode.bind(b64lex, false))
  t.throws(b64lex.decode.bind(b64lex, true))
  t.throws(b64lex.decode.bind(b64lex, 0))
  t.throws(b64lex.decode.bind(b64lex, 1))
  t.throws(b64lex.decode.bind(b64lex, -1))
  t.throws(b64lex.decode.bind(b64lex, NaN))
  t.throws(b64lex.decode.bind(b64lex, {}))
  t.throws(b64lex.decode.bind(b64lex, Buffer(0)))
  t.throws(b64lex.decode.bind(b64lex, Buffer([ 0x00 ])))
  t.throws(b64lex.decode.bind(b64lex, new Uint8Array([])))
  t.throws(b64lex.decode.bind(b64lex, new Uint8Array([ 0x00 ])))

  t.end()
})
