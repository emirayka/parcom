import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorCount, ParserErrorFailure, ParserErrorIncomplete} from '@/types'
import {tag} from '@/parser/string/streaming'
import {count} from './count'

describe('many0', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, Array<string>> = count(tagHello, 2)

  const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const failedParser: Parser<string, Array<string>> = count(parserThatAlwaysFails, 2)

  describe('for count that equals to 2, returns parser that', () => {
    test('returns Err when provided parser matched 0 times', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorCount()]))
    })

    test('returns Err when provided parser matched 1 times', () => {
      expect(parser('hellohelld')).toEqual(Err(['hellohelld', new ParserErrorCount()]))
    })

    test('returns Ok when provided parser matched 2 times', () => {
      expect(parser('hellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello']]))
    })

    test('returns Ok when provided parser matched 3 times', () => {
      expect(parser('hellohellohellohelld')).toEqual(Ok(['hellohelld', ['hello', 'hello']]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(5)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('hello')).toEqual(Err(['hello', new ParserErrorFailure('hellohello')]))
    })
  })
})
