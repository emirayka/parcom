import {isMultiSpace} from './is-multispace'
import {makeCharCodeObject} from './lib'

describe('predicate', () => {
  describe('isMultiSpace', () => {
    test('throws when called with a string of length that does not equal to 1', () => {
      expect(() => isMultiSpace('')).toThrow()
      expect(() => isMultiSpace('12')).toThrow()
    })

    test('returns true on space symbol', () => {
      const chars = makeCharCodeObject(' \n\t\r')

      for (let i = 0; i < 128; i++) {
        const key: string = String.fromCharCode(i)

        expect(isMultiSpace(key)).toEqual(chars[key])
      }
    })
  })
})
