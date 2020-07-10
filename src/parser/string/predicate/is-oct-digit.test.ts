import {isOctDigit} from './is-oct-digit'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isOctDigit', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isOctDigit('')).toThrow()
      expect(() => isOctDigit('12')).toThrow()
    })

    test('returns true on oct digits', () => {
      const chars = makeCharCodeObject('01234567')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isOctDigit(key)).toEqual(chars[key])
      }
    })
  })
})
