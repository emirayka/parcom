import {Err, Ok} from '@emirayka/option-result'

import {hexDigit0} from './hex-digit0'
import {ParserErrorIncomplete} from '@/types'

describe('complete', () => {
  describe('hexDigit0', () => {
    test('matches hex digits', () => {
      expect(hexDigit0('0123456789abcdefABCDEF ')).toEqual(Ok([' ', '0123456789abcdefABCDEF']))
    })

    test('matches empty string', () => {
      expect(hexDigit0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(hexDigit0('0123456789abcdefABCDEF')).toEqual(Err(['0123456789abcdefABCDEF', new ParserErrorIncomplete(1)]))
    })
  })
})
