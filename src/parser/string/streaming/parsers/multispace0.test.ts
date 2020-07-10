import {Err, Ok} from '@emirayka/option-result'

import {multispace0} from './multispace0'
import {ParserErrorIncomplete} from '@/types'

describe('complete', () => {
  describe('multispace0', () => {
    test('matches space symbols', () => {
      expect(multispace0(' \t\r\n$')).toEqual(Ok(['$', ' \t\r\n']))
    })

    test('matches empty string', () => {
      expect(multispace0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(multispace0(' \t\r\n')).toEqual(Err([' \t\r\n', new ParserErrorIncomplete(1)]))
    })
  })
})
