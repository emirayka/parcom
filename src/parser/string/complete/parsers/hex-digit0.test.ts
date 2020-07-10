import {Ok} from '@emirayka/option-result'

import {hexDigit0} from './hex-digit0'

describe('complete', () => {
  describe('hexDigit0', () => {
    test('matches hex digits', () => {
      expect(hexDigit0('0123456789abcdefABCDEF ')).toEqual(Ok([' ', '0123456789abcdefABCDEF']))
    })

    test('matches empty string', () => {
      expect(hexDigit0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(hexDigit0('0123456789abcdefABCDEF')).toEqual(Ok(['', '0123456789abcdefABCDEF']))
    })
  })
})
