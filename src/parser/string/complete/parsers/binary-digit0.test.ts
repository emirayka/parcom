import {Ok} from '@emirayka/option-result'

import {binaryDigit0} from './binary-digit0'

describe('complete', () => {
  describe('binaryDigit0', () => {
    test('matches binary digits', () => {
      expect(binaryDigit0('01 ')).toEqual(Ok([' ', '01']))
    })

    test('matches empty string', () => {
      expect(binaryDigit0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(binaryDigit0('01')).toEqual(Ok(['', '01']))
    })
  })
})
