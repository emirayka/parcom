import {isAlpha} from './is-alpha'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isAlpha', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isAlpha('')).toThrow()
      expect(() => isAlpha('12')).toThrow()
    })

    test('returns true on chars', () => {
      const chars = makeCharCodeObject('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isAlpha(key)).toEqual(chars[key])
      }
    })
  })
})