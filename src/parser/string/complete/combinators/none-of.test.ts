import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorNoneOf} from '@/types'
import {noneOf} from './none-of'

describe('complete', () => {
  describe('char', () => {
    const parser: Parser<string, string> = noneOf('abc')

    test('when input starts with one of provided char, returns Ok', () => {
      expect(parser('t')).toEqual(Ok(['', 't']))
      expect(parser('d')).toEqual(Ok(['', 'd']))
      expect(parser('f')).toEqual(Ok(['', 'f']))
    })

    test('when input does not start with provided char, returns Err', () => {
      expect(parser('a')).toEqual(Err(['a', new ParserErrorNoneOf()]))
      expect(parser('b')).toEqual(Err(['b', new ParserErrorNoneOf()]))
      expect(parser('c')).toEqual(Err(['c', new ParserErrorNoneOf()]))
    })

    test('when input is empty, returns Err', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorNoneOf()]))
    })
  })
})
