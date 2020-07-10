import {isHexDigit} from './is-hex-digit'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isHexDigit', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isHexDigit('')).toThrow()
      expect(() => isHexDigit('12')).toThrow()
    })

    test('returns true on digits', () => {
      const chars = makeCharCodeObject('0123456789abcdefABCDEF')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isHexDigit(key)).toEqual(chars[key])
      }
    })
  })
})
