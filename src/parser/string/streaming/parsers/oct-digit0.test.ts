import {Err, Ok} from '@emirayka/option-result'

import {octDigit0} from './oct-digit0'
import {ParserErrorIncomplete} from '@/types'

describe('streaming', () => {
  describe('octDigit0', () => {
    test('matches octal digits', () => {
      expect(octDigit0('01234567 ')).toEqual(Ok([' ', '01234567']))
    })

    test('matches empty string', () => {
      expect(octDigit0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(octDigit0('01234567')).toEqual(Err(['01234567', new ParserErrorIncomplete(1)]))
    })
  })
})
