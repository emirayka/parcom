import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorBinaryDigit1} from '@/types'
import {binaryDigit1} from './binary-digit1'

describe('complete', () => {
  describe('binaryDigit1', () => {
    test('matches binary digits', () => {
      expect(binaryDigit1('01 ')).toEqual(Ok([' ', '01']))
    })

    test('does not match empty string', () => {
      expect(binaryDigit1('')).toEqual(Err(['', new ParserErrorBinaryDigit1()]))
    })

    test('does not return Incomplete', () => {
      expect(binaryDigit1('01')).toEqual(Ok(['', '01']))
    })
  })
})
