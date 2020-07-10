import {Err, Ok} from '@emirayka/option-result'

import {octDigit1} from './oct-digit1'
import {ParserErrorOctDigit1} from '@/types'

describe('complete', () => {
  describe('octDigit1', () => {
    test('matches octal digits', () => {
      expect(octDigit1('01234567 ')).toEqual(Ok([' ', '01234567']))
    })

    test('does not match empty string', () => {
      expect(octDigit1('')).toEqual(Err(['', new ParserErrorOctDigit1()]))
    })

    test('does not return Incomplete', () => {
      expect(octDigit1('01234567')).toEqual(Ok(['', '01234567']))
    })
  })
})
