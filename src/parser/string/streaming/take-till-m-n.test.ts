import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete, ParserErrorTakeTillMN} from '@/types'
import {takeTillMN} from './take-till-m-n'

describe('streaming', () => {
  describe('takeTillMN', () => {
    describe('for colon predicate', () => {
      const colonPredicate = (char: string) => char === ':'

      describe('when called with two numbers a and b that a < b && a > 0 && b > 0', () => {
        const tillColon36: Parser<string, string> = takeTillMN(colonPredicate, 3, 6)

        describe('returns parser that', () => {
          test('when matched part of input string is less than a, returns Err', () => {
            expect(tillColon36('sw:')).toEqual(Err(['sw:', new ParserErrorTakeTillMN()]))
          })

          test('when matched part of input string length equals to a, returns Ok', () => {
            expect(tillColon36('swo:')).toEqual(Ok([':', 'swo']))
          })

          test('when matched part of input string length between a and b, returns Ok', () => {
            expect(tillColon36('swor:')).toEqual(Ok([':', 'swor']))
          })

          test('when matched part of input string length equals to b, returns Ok', () => {
            expect(tillColon36('swords:')).toEqual(Ok([':', 'swords']))
          })

          test('when matched part of input string length is greater than b, returns Ok', () => {
            expect(tillColon36('swordsman:')).toEqual(Ok(['man:', 'swords']))
          })

          test('when called with empty string, returns Incomplete', () => {
            expect(tillColon36('')).toEqual(Err(['', new ParserErrorIncomplete(6)]))
          })

          test('when called with string without colon which length is less than a, returns Incomplete', () => {
            expect(tillColon36('sw')).toEqual(Err(['sw', new ParserErrorIncomplete(4)]))
          })

          test('when called with string without colon which length equals to a, returns Incomplete', () => {
            expect(tillColon36('swo')).toEqual(Err(['swo', new ParserErrorIncomplete(3)]))
          })

          test('when called with string without colon which length between a and b, returns Incomplete', () => {
            expect(tillColon36('swor')).toEqual(Err(['swor', new ParserErrorIncomplete(2)]))
          })

          test('when called with string without colon which length equals to b, returns Ok', () => {
            expect(tillColon36('swords')).toEqual(Ok(['', 'swords']))
          })

          test('when called with string without colon which length is greater than b, returns Ok', () => {
            expect(tillColon36('swordsman')).toEqual(Ok(['man', 'swords']))
          })
        })
      })

      test('when called with negative numbers throws', () => {
        expect(() => takeTillMN(colonPredicate, -3, 3)).toThrow()
        expect(() => takeTillMN(colonPredicate, 3, -3)).toThrow()
      })

      test('when called with numbers a and b that a > b', () => {
        expect(() => takeTillMN(colonPredicate, 3, 2)).toThrow()
      })
    })
  })
})
