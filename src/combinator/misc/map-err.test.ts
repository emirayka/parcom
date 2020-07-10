import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserError, ParserErrorFailure, ParserErrorIncomplete, ParserErrorStab} from '@/types'
import {tag} from '@/parser/string/streaming'
import {mapErr} from './map-err'

describe('map', () => {
  describe('constructs parser that', () => {
    const tagABC: Parser<string, string> = tag('abc')
    const mapFn = (): ParserError => new ParserErrorStab()
    const parser: Parser<string, string> = mapErr(mapFn, tagABC)

    const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
    const failedParser: Parser<string, string> = mapErr(mapFn, parserThatAlwaysFails)

    test('returns Ok if provided parser returned Ok', () => {
      expect(parser('abc')).toEqual(Ok(['', 'abc']))
    })

    test('returns mapped error if provided parser returned Err', () => {
      expect(parser('abd')).toEqual(Err(['abd', new ParserErrorStab()]))
    })

    test('forwards Incomplete', () => {
      expect(parser('a')).toEqual(Err(['a', new ParserErrorIncomplete(2)]))
      expect(parser('ab')).toEqual(Err(['ab', new ParserErrorIncomplete(1)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('abc')).toEqual(Err(['abc', new ParserErrorFailure('abcabc')]))
    })
  })
})
