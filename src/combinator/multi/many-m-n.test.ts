import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserErrorIncomplete, ParserErrorManyMN} from '@/types'
import {tag} from '@/parser/string/streaming'
import {manyMN} from './many-m-n'

describe('many0', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const hello_3_6: Parser<string, Array<string>> = manyMN(tagHello, 3, 6)

  const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const failedParser: Parser<string, Array<string>> = manyMN(parserThatAlwaysFails, 0, 10)

  describe('when called with positive numbers a and b that a < b, returns parser that', () => {
    test('returns Err when provided parser matched x times, where x < a', () => {
      expect(hello_3_6('helld')).toEqual(Err(['helld', new ParserErrorManyMN()]))
    })

    test('returns Ok when provided parser matched x times, where x == a', () => {
      expect(hello_3_6('hellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello']]))
    })

    test('returns Ok when provided parser matched x times, where a < x < b', () => {
      expect(hello_3_6('hellohellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello', 'hello']]))
    })

    test('returns Ok when provided parser matched x times, where x == b', () => {
      expect(hello_3_6('hellohellohellohellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello', 'hello', 'hello', 'hello']]))
    })

    test('returns Ok when provided parser matched x times, where x > b', () => {
      expect(hello_3_6('hellohellohellohellohellohellohellohelld')).toEqual(Ok(['hellohelld', ['hello', 'hello', 'hello', 'hello', 'hello', 'hello']]))
    })
  })

  test('forwards Incomplete', () => {
    expect(hello_3_6('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(5)]))
  })

  test('forwards Failure', () => {
    expect(failedParser('hello')).toEqual(Err(['hello', new ParserErrorFailure('hellohello')]))
  })

  test('when called with negative numbers, throws', () => {
    expect(() => manyMN(tagHello, -3, 3)).toThrow()
    expect(() => manyMN(tagHello, 3, -3)).toThrow()
  })

  test('when called with numbers a and b that a > b, throws', () => {
    expect(() => manyMN(tagHello, 3, 2)).toThrow()
  })
})
