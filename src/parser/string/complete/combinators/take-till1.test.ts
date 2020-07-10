import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorTakeTill1} from '@/types'
import {takeTill1} from './take-till1'

describe('complete', () => {
  describe('takeTill1', () => {
    const tillColon: Parser<string, string> = takeTill1((char) => char === ':')

    describe('returns parser that', () => {
      test('when matched char at the end of input string returns part of input string until matched char', () => {
        expect(tillColon('sword:')).toEqual(Ok([':', 'sword']))
      })

      test('when matched char in the middle of input string returns part of input string until matched char', () => {
        expect(tillColon('sword:123')).toEqual(Ok([':123', 'sword']))
      })

      test('when matched char at the beginning of input string returns Err', () => {
        expect(tillColon(':123')).toEqual(Err([':123', new ParserErrorTakeTill1()]))
      })

      test('when matched char is not present in the input string returns the whole input string', () => {
        expect(tillColon('sword123')).toEqual(Ok(['', 'sword123']))
      })

      test('when input string is empty returns Err', () => {
        expect(tillColon('')).toEqual(Err(['', new ParserErrorTakeTill1()]))
      })
    })
  })
})
