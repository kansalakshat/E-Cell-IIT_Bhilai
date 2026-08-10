/* Run: node src/lib/statParts.test.mjs
   Covers every stat shape actually used on the site, plus the two that must
   NOT animate. */
import assert from 'node:assert/strict'
import { statParts, decimalsOf } from './statParts.js'

const eq = (value, expected) =>
  assert.deepEqual(statParts(value), expected, `statParts(${JSON.stringify(value)})`)

/* Shapes in use */
eq('500+', { prefix: '', digits: '500', suffix: '+' })
eq('80%', { prefix: '', digits: '80', suffix: '%' })
eq('24h', { prefix: '', digits: '24', suffix: 'h' })
eq('6mo', { prefix: '', digits: '6', suffix: 'mo' })
eq('5×', { prefix: '', digits: '5', suffix: '×' })
eq('₹40Cr+', { prefix: '₹', digits: '40', suffix: 'Cr+' })
eq('1000+', { prefix: '', digits: '1000', suffix: '+' })

/* No digits: left alone, never counted from zero */
eq('Global', null)
eq('', null)

/* The prefix is lazy, so the FIRST digit run is the number and the rest of
   the string stays put. This is what keeps `₹40Cr+` from becoming 4040. */
eq('₹40Cr+', { prefix: '₹', digits: '40', suffix: 'Cr+' })
eq('4–6 weeks', { prefix: '', digits: '4', suffix: '–6 weeks' })

/* Decimals are held, not rounded away mid-count */
assert.equal(decimalsOf('40'), 0)
assert.equal(decimalsOf('4.5'), 1)
eq('4.5×', { prefix: '', digits: '4.5', suffix: '×' })

console.log('statParts: all assertions passed')
