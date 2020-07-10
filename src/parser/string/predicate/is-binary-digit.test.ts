import {isBinaryDigit} from './is-binary-digit'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isBinaryDigit', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isBinaryDigit('')).toThrow()
      expect(() => isBinaryDigit('12')).toThrow()
    })

    test('returns true on oct digits', () => {
      const chars = makeCharCodeObject('01')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isBinaryDigit(key)).toEqual(chars[key])
      }
    })
  })
})
