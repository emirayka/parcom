import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorAlpha1} from '@/types'
import {alpha1} from './alpha1'

describe('complete', () => {
  describe('alpha1', () => {
    test('matches alphabetic characters', () => {
      expect(alpha1('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha1('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })

    test('does not match empty string', () => {
      expect(alpha1('')).toEqual(Err(['', new ParserErrorAlpha1()]))
    })

    test('does not return Incomplete', () => {
      expect(alpha1('abcdefghijklmnopqrstuvwxyz')).toEqual(Ok(['', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha1('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Ok(['', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })
  })
})
