import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {binaryDigit1} from './binary-digit1'

describe('streaming', () => {
  describe('binaryDigit1', () => {
    test('matches binary digits', () => {
      expect(binaryDigit1('01 ')).toEqual(Ok([' ', '01']))
    })

    test('does not match empty string', () => {
      expect(binaryDigit1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(binaryDigit1('01')).toEqual(Err(['01', new ParserErrorIncomplete(1)]))
    })
  })
})
