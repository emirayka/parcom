import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserErrorFoldManyMN, ParserErrorIncomplete} from '@/types'
import {tag} from '@/parser/string/streaming'
import {foldManyMN} from './fold-many-m-n'

describe('foldManyMN', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const f = (acc: Array<string>, item: string) => {
    acc.push(item)

    return acc
  }
  const init = () => []

  describe('for two positive numbers a and b such as a < b, returns parser that', () => {
    const parser = foldManyMN(tagHello, f, init, 2, 4)

    const tagThatAlwaysFails: Parser<string, string> = (input) => Err([input, new ParserErrorFailure(`${input}${input}`)])
    const failedParser = foldManyMN(tagThatAlwaysFails, f, init, 2, 4)

    test('when match count is less than a, returns Err', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorFoldManyMN()]))
    })

    test('when match count equals to a, returns Ok', () => {
      expect(parser('hellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello']]))
    })

    test('when match count is between a and b, returns Ok', () => {
      expect(parser('hellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello']]))
    })

    test('when match count equals to b, returns Ok', () => {
      expect(parser('hellohellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello', 'hello']]))
    })

    test('when match count is greater than b, returns Ok', () => {
      expect(parser('hellohellohellohellohellohelld')).toEqual(Ok(['hellohelld', ['hello', 'hello', 'hello', 'hello']]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hellohello')).toEqual(Err(['hellohello', new ParserErrorIncomplete(5)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('hellohellohelld')).toEqual(Err(['hellohellohelld', new ParserErrorFailure('hellohellohelldhellohellohelld')]))
    })
  })

  test('when called with negative numbers, throws', () => {
    expect(() => foldManyMN(tagHello, f, init, -3, 3)).toThrow()
    expect(() => foldManyMN(tagHello, f, init, 3, -3)).toThrow()
  })

  test('when called with numbers a and b that a > b, throws', () => {
    expect(() => foldManyMN(tagHello, f, init, 3, 2)).toThrow()
  })
})
