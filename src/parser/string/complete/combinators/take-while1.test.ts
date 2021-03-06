import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorTakeWhile1} from '@/types'
import {takeWhile1} from './take-while1'

describe('complete', () => {
  describe('takeWhile1', () => {
    const whileNotColon: Parser<string, string> = takeWhile1((char) => char !== ':')

    describe('returns parser that', () => {
      test('when matched char at the end of input string returns part of input string until matched char', () => {
        expect(whileNotColon('sword:')).toEqual(Ok([':', 'sword']))
      })

      test('when matched char in the middle of input string returns part of input string until matched char', () => {
        expect(whileNotColon('sword:123')).toEqual(Ok([':123', 'sword']))
      })

      test('when matched char at the beginning of input string returns Err', () => {
        expect(whileNotColon(':123')).toEqual(Err([':123', new ParserErrorTakeWhile1()]))
      })

      test('when matched char is not present in the input string returns the whole input string', () => {
        expect(whileNotColon('sword123')).toEqual(Ok(['', 'sword123']))
      })

      test('when input string is empty returns Err', () => {
        expect(whileNotColon('')).toEqual(Err(['', new ParserErrorTakeWhile1()]))
      })
    })
  })
})
