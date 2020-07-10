import {Err, Ok} from '@emirayka/option-result'

import {digit0} from './digit0'
import {ParserErrorIncomplete} from '@/types'

describe('complete', () => {
  describe('digit0', () => {
    test('matches digits', () => {
      expect(digit0('0123456789 ')).toEqual(Ok([' ', '0123456789']))
    })

    test('matches empty string', () => {
      expect(digit0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(digit0('0123456789')).toEqual(Err(['0123456789', new ParserErrorIncomplete(1)]))
    })
  })
})
