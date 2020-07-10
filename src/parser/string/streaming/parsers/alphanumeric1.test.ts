import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {alphanumeric1} from './alphanumeric1'

describe('complete', () => {
  describe('alphanumeric1', () => {
    test('matches alphanumeric characters', () => {
      expect(alphanumeric1('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alphanumeric1('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
      expect(alphanumeric1('0123456789 ')).toEqual(Ok([' ', '0123456789']))
    })

    test('does not match empty string', () => {
      expect(alphanumeric1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(alphanumeric1('abcdefghijklmnopqrstuvwxyz')).toEqual(Err(['abcdefghijklmnopqrstuvwxyz', new ParserErrorIncomplete(1)]))
      expect(alphanumeric1('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Err(['ABCDEFGHIJKLMNOPQRSTUVWXYZ', new ParserErrorIncomplete(1)]))
    })
  })
})
