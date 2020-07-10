import {Ok} from '@emirayka/option-result'

import {octDigit0} from './oct-digit0'

describe('complete', () => {
  describe('octDigit0', () => {
    test('matches octal digits', () => {
      expect(octDigit0('01234567 ')).toEqual(Ok([' ', '01234567']))
    })

    test('matches empty string', () => {
      expect(octDigit0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(octDigit0('01234567')).toEqual(Ok(['', '01234567']))
    })
  })
})
