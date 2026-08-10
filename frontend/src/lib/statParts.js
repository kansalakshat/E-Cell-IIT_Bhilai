/* Splits a stat label into the part that can count and the parts that cannot:
   `₹40Cr+` becomes `₹` / `40` / `Cr+`.

   The number is the first run of digits, so the prefix is lazy and the suffix
   takes everything left over. A label with no digits at all (`Global`) has
   nothing to count and returns null rather than being coerced into a zero.

   Plain JS, no JSX, so statParts.test.mjs can run it under bare node. */
const PARTS = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/

export function statParts(value) {
  const m = String(value).match(PARTS)
  if (!m) return null
  return { prefix: m[1], digits: m[2], suffix: m[3] }
}

/* Decimal places to hold while counting, so `4.5x` does not tick through
   integers and land on a different shape than it started. */
export function decimalsOf(digits) {
  return (digits.split('.')[1] || '').length
}
