import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete} from '@/types'
import {take} from '@/parser/string/streaming'

describe('take', () => {
  describe('when called with zero amount', () => {
    const parser: Parser<string, string> = take(0)

    test('returns Ok for empty string', () => {
      expect(parser('')).toEqual(Ok(['', '']))
    })

    test('returns Ok for string with one character', () => {
      expect(parser('1')).toEqual(Ok(['1', '']))
    })

    test('returns Ok for string with five characters', () => {
      expect(parser('12345')).toEqual(Ok(['12345', '']))
    })
  })

  describe('when called with amount equals to 1', () => {
    const parser: Parser<string, string> = take(1)

    test('returns Incomplete for empty string', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Ok for string with one character', () => {
      expect(parser('1')).toEqual(Ok(['', '1']))
    })

    test('returns Ok for string with five characters', () => {
      expect(parser('12345')).toEqual(Ok(['2345', '1']))
    })
  })

  describe('when called with amount equals to 5', () => {
    const parser: Parser<string, string> = take(5)

    test('returns Incomplete for empty string', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(5)]))
    })

    test('returns Incomplete for string with one character', () => {
      expect(parser('1')).toEqual(Err(['1', new ParserErrorIncomplete(4)]))
    })

    test('returns Ok for string with five characters', () => {
      expect(parser('12345')).toEqual(Ok(['', '12345']))
    })
  })
})
