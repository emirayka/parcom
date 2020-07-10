import {Ok} from '@emirayka/option-result'

import {alphanumeric0} from './alphanumeric0'

describe('complete', () => {
  describe('alphanumeric0', () => {
    test('matches alphanumeric characters', () => {
      expect(alphanumeric0('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alphanumeric0('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
      expect(alphanumeric0('0123456789 ')).toEqual(Ok([' ', '0123456789']))
    })

    test('matches empty string', () => {
      expect(alphanumeric0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(alphanumeric0('abcdefghijklmnopqrstuvwxyz')).toEqual(Ok(['', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alphanumeric0('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Ok(['', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })
  })
})
