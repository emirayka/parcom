import {Ok} from '@emirayka/option-result'

import {alpha0} from './alpha0'

describe('complete', () => {
  describe('alpha0', () => {
    test('matches alphabetic characters', () => {
      expect(alpha0('abcdefghijklmnopqrstuvwxyz ')).toEqual(Ok([' ', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha0('ABCDEFGHIJKLMNOPQRSTUVWXYZ ')).toEqual(Ok([' ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })

    test('matches empty string', () => {
      expect(alpha0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(alpha0('abcdefghijklmnopqrstuvwxyz')).toEqual(Ok(['', 'abcdefghijklmnopqrstuvwxyz']))
      expect(alpha0('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual(Ok(['', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']))
    })
  })
})