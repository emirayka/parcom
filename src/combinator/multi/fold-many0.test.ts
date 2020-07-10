import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserErrorIncomplete} from '@/types'
import {tag} from '@/parser/string/streaming'
import {foldMany0} from './fold-many0'

describe('foldMany0', () => {
  describe('returns parser that', () => {
    const tagHello: Parser<string, string> = tag('hello')
    const f = (acc: Array<string>, item: string) => {
      acc.push(item)

      return acc
    }
    const init = () => []
    const parser = foldMany0(tagHello, f, init)

    const tagThatAlwaysFails: Parser<string, string> = (input) => Err([input, new ParserErrorFailure(`${input}${input}`)])
    const failedParser = foldMany0(tagThatAlwaysFails, f, init)

    test('when there was no match, returns Ok with init value', () => {
      expect(parser('helld')).toEqual(Ok(['helld', []]))
    })

    test('when there was one match, returns Ok', () => {
      expect(parser('hellohelld')).toEqual(Ok(['helld', ['hello']]))
    })

    test('when there was two matches, returns Ok', () => {
      expect(parser('hellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello']]))
    })

    test('when there was three matches, returns Ok', () => {
      expect(parser('hellohellohellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello']]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(5)]))
    })

    test('forwards Failure', () => {
      expect(failedParser('hellohelld')).toEqual(Err(['hellohelld', new ParserErrorFailure('hellohelldhellohelld')]))
    })
  })
})