import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {alpha1} from './alpha1'

describe('streaming', () => {
  describe('alpha1', () => {
    test('matches alphabetic characters', () => {
      expect(alpha1('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha1('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })

    test('does not match empty string', () => {
      expect(alpha1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(alpha1('abcdefghijklmnopqrstuvwxyz')).toEqual(Err(['abcdefghijklmnopqrstuvwxyz', new ParserErrorIncomplete(1)]))
      expect(alpha1('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Err(['ABCDEFGHIJKLMNOPQRSTUVWXYZ', new ParserErrorIncomplete(1)]))
    })
  })
})
