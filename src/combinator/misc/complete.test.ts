import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorComplete, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/streaming'
import {complete} from './complete'

describe('complete', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, string> = complete(tagHello)

  describe('returns parser that', () => {
    test('returns Ok when provided parser returned Ok', () => {
      expect(parser('hello')).toEqual(Ok(['', 'hello']))
    })

    test('returns Err when provided parser returned Err', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorTag()]))
    })

    test('returns Err when provided parser returned Incomplete', () => {
      expect(parser('hell')).toEqual(Err(['hell', new ParserErrorComplete()]))
    })
  })
})