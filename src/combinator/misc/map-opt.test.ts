import {Err, None, Ok, Option, Some} from '@emirayka/option-result'

import {Parser, ParserErrorMapOpt, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/complete'
import {opt} from '@/combinator'
import {mapOpt} from './map-opt'

describe('map', () => {
  describe('constructs parser that', () => {
    const tagABC: Parser<string, Option<string>> = opt(tag('abc'))
    const mapLen = (value: string): number => value.length
    const parser: Parser<string, Option<number>> = mapOpt(mapLen, tagABC)

    const parserThatAlwaysReturnsError: Parser<string, Option<string>> = (input: string) => {
      return Err([input, new ParserErrorTag()])
    }
    const parserError: Parser<string, Option<number>> = mapOpt(mapLen, parserThatAlwaysReturnsError)

    test('returns error if provided parser returned Err', () => {
      expect(parserError('abd')).toEqual(Err(['abd', new ParserErrorMapOpt()]))
    })

    test('returns mapped value if provided parser returned Ok', () => {
      expect(parser('abc')).toEqual(Ok(['', Some(3)]))
      expect(parser('ab')).toEqual(Ok(['ab', None]))
    })
  })
})
