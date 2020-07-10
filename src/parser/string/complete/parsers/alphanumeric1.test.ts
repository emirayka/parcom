import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorAlphanumeric1} from '@/types'
import {alphanumeric1} from './alphanumeric1'

describe('complete', () => {
  describe('alphanumeric1', () => {
    test('matches alphanumeric characters', () => {
      expect(alphanumeric1('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alphanumeric1('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
      expect(alphanumeric1('0123456789 ')).toEqual(Ok([' ', '0123456789']))
    })

    test('does not match empty string', () => {
      expect(alphanumeric1('')).toEqual(Err(['', new ParserErrorAlphanumeric1()]))
    })

    test('does not return Incomplete', () => {
      expect(alphanumeric1('abcdefghijklmnopqrstuvwxyz')).toEqual(Ok(['', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alphanumeric1('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Ok(['', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })
  })
})
