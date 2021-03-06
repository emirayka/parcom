import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorTakeWhileMN} from '@/types'
import {takeWhileMN} from './take-while-m-n'

describe('complete', () => {
  describe('takeWhileMN', () => {
    const notColonPredicate = (char: string) => char !== ':'

    describe('when called with two numbers a and b that a < b && a > 0 && b > 0', () => {
      const whileNotColon36: Parser<string, string> = takeWhileMN(notColonPredicate, 3, 6)

      describe('returns parser that', () => {
        test('when matched part of input string is less than a returns Err', () => {
          expect(whileNotColon36('sw:')).toEqual(Err(['sw:', new ParserErrorTakeWhileMN()]))
        })

        test('when matched part of input string length equals to a returns Ok', () => {
          expect(whileNotColon36('swo:')).toEqual(Ok([':', 'swo']))
        })

        test('when matched part of input string length between a and b returns Ok', () => {
          expect(whileNotColon36('swor:')).toEqual(Ok([':', 'swor']))
        })

        test('when matched part of input string length equals to b returns Ok', () => {
          expect(whileNotColon36('swords:')).toEqual(Ok([':', 'swords']))
        })

        test('when matched part of input string length is greater than b returns Ok', () => {
          expect(whileNotColon36('swordsman:')).toEqual(Ok(['man:', 'swords']))
        })

        test('when called with empty string, returns Err', () => {
          expect(whileNotColon36('')).toEqual(Err(['', new ParserErrorTakeWhileMN()]))
        })

        test('when called with string without colon which length is less than a, returns Err', () => {
          expect(whileNotColon36('sw')).toEqual(Err(['sw', new ParserErrorTakeWhileMN()]))
        })

        test('when called with string without colon which length equals to a, returns Ok', () => {
          expect(whileNotColon36('swo')).toEqual(Ok(['', 'swo']))
        })

        test('when called with string without colon which length between a and b, returns Ok', () => {
          expect(whileNotColon36('swor')).toEqual(Ok(['', 'swor']))
        })

        test('when called with string without colon which length equals to b, returns Ok', () => {
          expect(whileNotColon36('swords')).toEqual(Ok(['', 'swords']))
        })

        test('when called with string without colon which length is greater than b, returns Ok', () => {
          expect(whileNotColon36('swordsman')).toEqual(Ok(['man', 'swords']))
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
