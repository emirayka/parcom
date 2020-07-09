import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete, ParserErrorTakeWhileMN} from '@/types'
import {takeWhileMN} from './take-while-m-n'

describe('streaming', () => {
  describe('takeWhileMN', () => {
    describe('for colon predicate', () => {
      const notColonPredicate = (char: string) => char !== ':'

      describe('when called with two numbers a and b that a < b && a > 0 && b > 0', () => {
        const whileNotColon36: Parser<string, string> = takeWhileMN(notColonPredicate, 3, 6)

        describe('returns parser that', () => {
          test('when matched part of input string is less than a, returns Err', () => {
            expect(whileNotColon36('sw:')).toEqual(Err(['sw:', new ParserErrorTakeWhileMN()]))
          })

          test('when matched part of input string length equals to a, returns Ok', () => {
            expect(whileNotColon36('swo:')).toEqual(Ok([':', 'swo']))
          })

          test('when matched part of input string length between a and b, returns Ok', () => {
            expect(whileNotColon36('swor:')).toEqual(Ok([':', 'swor']))
          })

          test('when matched part of input string length equals to b, returns Ok', () => {
            expect(whileNotColon36('swords:')).toEqual(Ok([':', 'swords']))
          })

          test('when matched part of input string length is greater than b, returns Ok', () => {
            expect(whileNotColon36('swordsman:')).toEqual(Err(['swordsman:', new ParserErrorTakeWhileMN()]))
          })

          test('when called with empty string, returns Incomplete', () => {
            expect(whileNotColon36('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
          })

          test('when called with string without colon which length is less than a, returns Incomplete', () => {
            expect(whileNotColon36('sw')).toEqual(Err(['sw', new ParserErrorIncomplete(1)]))
          })

          test('when called with string without colon which length equals to a, returns Incomplete', () => {
            expect(whileNotColon36('swo')).toEqual(Err(['swo', new ParserErrorIncomplete(1)]))
          })

          test('when called with string without colon which length between a and b, returns Incomplete', () => {
            expect(whileNotColon36('swor')).toEqual(Err(['swor', new ParserErrorIncomplete(1)]))
          })

          test('when called with string without colon which length equals to b, returns Incomplete', () => {
            expect(whileNotColon36('swords')).toEqual(Err(['swords', new ParserErrorIncomplete(1)]))
          })

          test('when called with string without colon which length is greater than b, returns Err', () => {
            expect(whileNotColon36('swordsman')).toEqual(Err(['swordsman', new ParserErrorTakeWhileMN()]))
          })
        })
      })

      test('when called with negative numbers throws', () => {
        expect(() => takeWhileMN(notColonPredicate, -3, 3)).toThrow()
        expect(() => takeWhileMN(notColonPredicate, 3, -3)).toThrow()
      })

      test('when called with numbers a and b that a > b', () => {
        expect(() => takeWhileMN(notColonPredicate, 3, 2)).toThrow()
      })
    })
  })
})
