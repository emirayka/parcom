import {Err, Ok} from '@emirayka/option-result'

import {alpha0} from './alpha0'
import {ParserErrorIncomplete} from '@/types'

describe('complete', () => {
  describe('alpha0', () => {
    test('matches alphabetic characters', () => {
      expect(alpha0('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha0('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })

    test('matches empty string', () => {
      expect(alpha0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(alpha0('abcdefghijklmnopqrstuvwxyz')).toEqual(Err(['abcdefghijklmnopqrstuvwxyz', new ParserErrorIncomplete(1)]))
      expect(alpha0('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Err(['ABCDEFGHIJKLMNOPQRSTUVWXYZ', new ParserErrorIncomplete(1)]))
    })
  })
})