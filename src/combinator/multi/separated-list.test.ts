import {Parser, ParserErrorFailure, ParserErrorIncomplete} from '@/types'
import {tag} from '@/parser/string/streaming'
import {separatedList} from '@/combinator/multi/separated-list'
import {Err, Ok} from '@emirayka/option-result'

describe('separatedList', () => {
  describe('returns parser that', () => {
    const separator: Parser<string, string> = tag(', ')
    const separated: Parser<string, string> = tag('hello')
    const parser: Parser<string, Array<string>> = separatedList(separator, separated)

    const parserThatAlwaysFails: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
    const parserWithFailedSeparator: Parser<string, Array<string>> = separatedList(parserThatAlwaysFails, separated)
    const parserWithFailedSeparated: Parser<string, Array<string>> = separatedList(separator, parserThatAlwaysFails)

    test('when there was no match, returns Ok', () => {
      expect(parser('helld')).toEqual(Ok(['helld', []]))
    })

    test('when there was one match, returns Ok', () => {
      expect(parser('hellohelld')).toEqual(Ok(['helld', ['hello']]))
    })

    test('when there was one match and the additional match of the separator, returns Ok', () => {
      expect(parser('hello, helld')).toEqual(Ok([', helld', ['hello']]))
    })

    test('when there was two matches, returns Ok', () => {
      expect(parser('hello, hellohelld')).toEqual(Ok(['helld', ['hello', 'hello']]))
    })

    test('when there was two matches and the additional match of the separator, returns Ok', () => {
      expect(parser('hello, hello, helld')).toEqual(Ok([', helld', ['hello', 'hello']]))
    })

    test('when there was three matches, returns Ok', () => {
      expect(parser('hello, hello, hellohelld')).toEqual(Ok(['helld', ['hello', 'hello', 'hello']]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorIncomplete(2)]))
      expect(parser('hello,')).toEqual(Err(['hello,', new ParserErrorIncomplete(1)]))
      expect(parser('hello, ')).toEqual(Err(['hello, ', new ParserErrorIncomplete(5)]))
      expect(parser('hello, hel')).toEqual(Err(['hello, hel', new ParserErrorIncomplete(2)]))
      expect(parser('hello, hello')).toEqual(Err(['hello, hello', new ParserErrorIncomplete(2)]))
    })

    test('forwards Failure', () => {
      expect(parserWithFailedSeparated('hello')).toEqual(Err(['hello', new ParserErrorFailure('hellohello')]))
      expect(parserWithFailedSeparator('hello, hello')).toEqual(Err(['hello, hello', new ParserErrorFailure(', hello, hello')]))
      expect(parserWithFailedSeparated('hello, hello')).toEqual(Err(['hello, hello', new ParserErrorFailure('hello, hellohello, hello')]))
    })
  })
})