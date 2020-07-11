import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete, ParserErrorOneOf} from '@/types'
import {oneOf} from './one-of'

describe('complete', () => {
  describe('char', () => {
    const parser: Parser<string, string> = oneOf('abc')

    test('when input starts with one of provided char, returns Ok', () => {
      expect(parser('a')).toEqual(Ok(['', 'a']))
      expect(parser('b')).toEqual(Ok(['', 'b']))
      expect(parser('c')).toEqual(Ok(['', 'c']))
    })

    test('when input does not start with provided char, returns Err', () => {
      expect(parser('t')).toEqual(Err(['t', new ParserErrorOneOf()]))
    })

    test('when input is empty, returns Err', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })
  })
})
