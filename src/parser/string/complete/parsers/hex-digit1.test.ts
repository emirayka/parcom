import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorHexDigit1} from '@/types'
import {hexDigit1} from './hex-digit1'

describe('complete', () => {
  describe('hexDigit1', () => {
    test('matches hex digits', () => {
      expect(hexDigit1('0123456789abcdefABCDEF ')).toEqual(Ok([' ', '0123456789abcdefABCDEF']))
    })

    test('matches empty string', () => {
      expect(hexDigit1('')).toEqual(Err(['', new ParserErrorHexDigit1()]))
    })

    test('does not return Incomplete', () => {
      expect(hexDigit1('0123456789abcdefABCDEF')).toEqual(Ok(['', '0123456789abcdefABCDEF']))
    })
  })
})
