import {Err, Ok} from '@emirayka/option-result'

import {multispace1} from './multispace1'
import {ParserErrorMultispace1} from '@/types'

describe('complete', () => {
  describe('multispace1', () => {
    test('matches space symbols', () => {
      expect(multispace1(' \t\r\n$')).toEqual(Ok(['$', ' \t\r\n']))
    })

    test('matches empty string', () => {
      expect(multispace1('')).toEqual(Err(['', new ParserErrorMultispace1()]))
    })

    test('does not return Incomplete', () => {
      expect(multispace1(' \t\r\n')).toEqual(Ok(['', ' \t\r\n']))
    })
  })
})
