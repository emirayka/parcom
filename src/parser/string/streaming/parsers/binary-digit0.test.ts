import {Err, Ok} from '@emirayka/option-result'

import {binaryDigit0} from './binary-digit0'
import {ParserErrorIncomplete} from '@/types'

describe('streaming', () => {
  describe('binaryDigit0', () => {
    test('matches binary digits', () => {
      expect(binaryDigit0('01 ')).toEqual(Ok([' ', '01']))
    })

    test('matches empty string', () => {
        expect(binaryDigit0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(binaryDigit0('01')).toEqual(Err(['01', new ParserErrorIncomplete(1)]))
    })
  })
})
