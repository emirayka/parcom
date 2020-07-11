import {Err, Ok} from '@emirayka/option-result'

import {octDigit1} from './oct-digit1'
import {ParserErrorIncomplete} from '@/types'

describe('streaming', () => {
  describe('octDigit1', () => {
    test('matches octal digits', () => {
      expect(octDigit1('01234567 ')).toEqual(Ok([' ', '01234567']))
    })

    test('does not match empty string', () => {
      expect(octDigit1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(octDigit1('01234567')).toEqual(Err(['01234567', new ParserErrorIncomplete(1)]))
    })
  })
})
