# base64-lex

Variant of base64 encoding which preserves lexicographic order and is url-safe

[![build status](https://travis-ci.org/deanlandolt/base64-lex.svg?branch=master)](https://travis-ci.org/deanlandolt/base64-lex)

```js
var b64lex = require('base64-lex')

// encode a buffer or typed array
b64lex.encode(new Uint8Array([ 0xde, 0xad, 0xbe, 0xef ])) // 'sfrzwl-'
b64lex.encode(Buffer('deadbeef', 'hex')) // 'sfrzwl-'

// strings encode in utf8, also preserving lex order
b64lex.encode('foo bar') // 'Pbyk869XSW--'

// decode returns a buffer
b64lex.decode('Pbyk869XSW--') // Buffer('foo bar', 'utf8')

// decode only works with base64-lex-encoded strings
b64lex.decode(Buffer(0)) // throws
```
