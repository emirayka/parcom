import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {digit1} from './digit1'

describe('complete', () => {
  describe('digit1', () => {
    test('matches digits', () => {
      expect(digit1('0123456789 ')).toEqual(Ok([' ', '0123456789']))
    })

    test('matches empty string', () => {
      expect(digit1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(digit1('0123456789')).toEqual(Err(['0123456789', new ParserErrorIncomplete(1)]))
    })
  })
})
