import {isDigit} from './is-digit'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isDigit', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isDigit('')).toThrow()
      expect(() => isDigit('12')).toThrow()
    })

    test('returns true on digits', () => {
      const chars = makeCharCodeObject('0123456789')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isDigit(key)).toEqual(chars[key])
      }
    })
  })
})
