import {Err, Ok} from '@emirayka/option-result'

import {multispace1} from './multispace1'
import {ParserErrorIncomplete} from '@/types'

describe('streaming', () => {
  describe('multispace1', () => {
    test('matches space symbols', () => {
      expect(multispace1(' \t\r\n$')).toEqual(Ok(['$', ' \t\r\n']))
    })

    test('matches empty string', () => {
      expect(multispace1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(multispace1(' \t\r\n')).toEqual(Err([' \t\r\n', new ParserErrorIncomplete(1)]))
    })
  })
})
