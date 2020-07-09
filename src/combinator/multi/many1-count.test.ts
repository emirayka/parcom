import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserErrorIncomplete, ParserErrorMany1Count} from '@/types'
import {tag} from '@/parser/string/streaming'
import {many1Count} from './many1-count'

describe('many1', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, number> = many1Count(tagHello)

  const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const failedParser: Parser<string, number> = many1Count(parserThatAlwaysFails)

  describe('returns parser that', () => {
    test('returns Err when provided parser matched 0 times', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorMany1Count()]))
    })

    test('returns Ok when provided parser matched 1 times', () => {
      expect(parser('hellohelld')).toEqual(Ok(['helld', 1]))
    })

    test('returns Ok when provided parser matched 2 times', () => {
      expect(parser('hellohellohelld')).toEqual(Ok(['helld', 2]))
    })

    test('returns Ok when provided parser matched 3 times', () => {
      expect(parser('hellohellohellohelld')).toEqual(Ok(['helld', 3]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(5)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('hello')).toEqual(Err(['hello', new ParserErrorFailure('hellohello')]))
    })
  })
})
