import {isSpace} from './is-space'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isSpace', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isSpace('')).toThrow()
      expect(() => isSpace('12')).toThrow()
    })

    test('returns true on space symbol', () => {
      const chars = makeCharCodeObject(' ')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isSpace(key)).toEqual(chars[key])
      }
    })
  })
})
