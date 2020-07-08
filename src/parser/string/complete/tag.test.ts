import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorTag} from '@/index'
import {tag} from './tag'

describe('tag', () => {
  describe('when tag string is empty', () => {
    describe('when called with empty string, returns parser that', () => {
      const parser: Parser<string, string> = tag('')

      test('returns Ok for empty string', () => {
        expect(parser('')).toEqual(Ok(['', '']))
      })

      test('returns Ok for string that contains one character', () => {
        expect(parser('1')).toEqual(Ok(['1', '']))
      })

      test('returns Ok for string that contains many characters', () => {
        expect(parser('12345')).toEqual(Ok(['12345', '']))
      })
    })
  })

  describe('when input start equals to tag string', () => {
    describe('when called with string that contains one character, returns parser that', () => {
      const parser: Parser<string, string> = tag('1')

      test('returns Incomplete for empty string', () => {
        expect(parser('')).toEqual(Err(['', new ParserErrorTag()]))
      })

      test('returns Ok for string that contains one character', () => {
        expect(parser('1')).toEqual(Ok(['', '1']))
      })

      test('returns Ok for string that contains many characters', () => {
        expect(parser('12345')).toEqual(Ok(['2345', '1']))
      })
    })

    describe('when called with string that contains several characters, returns parser that', () => {
      const parser: Parser<string, string> = tag('123')

      test('returns Incomplete for empty string', () => {
        expect(parser('')).toEqual(Err(['', new ParserErrorTag()]))
      })

      test('returns Incomplete for string that contains one character', () => {
        expect(parser('1')).toEqual(Err(['1', new ParserErrorTag()]))
      })

      test('returns Ok for string that contains characters less than tag string', () => {
        expect(parser('12')).toEqual(Err(['12', new ParserErrorTag()]))
      })

      test('returns Ok for string that contains characters less than tag string', () => {
        expect(parser('123')).toEqual(Ok(['', '123']))
      })

      test('returns Ok for string that contains characters less than tag string', () => {
        expect(parser('12345')).toEqual(Ok(['45', '123']))
      })
    })
  })

  describe('when input start does not equal to tag string', () => {
    const parser: Parser<string, string> = tag('123')

    test('returns Incomplete for empty string', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorTag()]))
    })

    test('returns Tag Error for string that contains one character', () => {
      expect(parser('a')).toEqual(Err(['a', new ParserErrorTag()]))
    })

    test('returns Tag Error for string that contains characters less than tag string', () => {
      expect(parser('ab')).toEqual(Err(['ab', new ParserErrorTag()]))
    })

    test('returns Tag Error for string that contains characters less than tag string', () => {
      expect(parser('abc')).toEqual(Err(['abc', new ParserErrorTag()]))
    })

    test('returns Tag Error for string that contains characters less than tag string', () => {
      expect(parser('abcde')).toEqual(Err(['abcde', new ParserErrorTag()]))
    })
  })
})