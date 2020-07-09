import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserErrorIncomplete, ParserErrorMany1} from '@/types'
import {tag} from '@/parser/string/streaming'
import {many1} from './many1'

describe('many1', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, Array<string>> = many1(tagHello)

  const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const failedParser: Parser<string, Array<string>> = many1(parserThatAlwaysFails)

  describe('returns parser that', () => {
    test('returns Err when provided parser matched 0 times', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorMany1()]))
    })

    test('returns Ok when provided parser matched 1 times', () => {
      expect(parser('hellohelld')).toEqual(Ok(['helld', ['hello']]))
    })

    test('returns Ok when provided parser matched 2 times', () => {
      expect(parser('hellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello']]))
    })

    test('returns Ok when provided parser matched 3 times', () => {
      expect(parser('hellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello']]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(5)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('hello')).toEqual(Err(['hello', new ParserErrorFailure('hellohello')]))
    })
  })
})
