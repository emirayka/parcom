import {isAlphanumeric} from './is-alphanumeric'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isAlphanumeric', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isAlphanumeric('')).toThrow()
      expect(() => isAlphanumeric('12')).toThrow()
    })

    test('returns true on chars', () => {
      const chars = makeCharCodeObject('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isAlphanumeric(key)).toEqual(chars[key])
      }
    })
  })
})
