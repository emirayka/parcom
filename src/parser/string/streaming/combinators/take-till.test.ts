import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete} from '@/types'
import {takeTill} from './take-till'

describe('streaming', () => {
  describe('takeTill', () => {
    const tillColon: Parser<string, string> = takeTill((char) => char === ':')

    describe('returns parser that', () => {
      test('when matched char at the end of input string returns part of input string until matched char', () => {
        expect(tillColon('sword:')).toEqual(Ok([':', 'sword']))
      })

      test('when matched char in the middle of input string returns part of input string until matched char', () => {
        expect(tillColon('sword:123')).toEqual(Ok([':123', 'sword']))
      })

      test('when matched char at the beginning of input string returns empty string', () => {
        expect(tillColon(':123')).toEqual(Ok([':123', '']))
      })

      test('when matched char is not present in the input string returns Incomplete', () => {
        expect(tillColon('sword123')).toEqual(Err(['sword123', new ParserErrorIncomplete(1)]))
      })

      test('when input string is empty returns Incomplete', () => {
        expect(tillColon('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
      })
    })
  })
})
