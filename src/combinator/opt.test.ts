import {Err, None, Ok, Option, Some} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete} from '@/types'
import {tag} from '@/parser/string/streaming'
import {opt} from './opt'

describe('opt', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, Option<string>> = opt(tagHello)

  describe('returns parser that', () => {
    test('returns Ok(Some) when provided parser returned Ok', () => {
      expect(parser('hello')).toEqual(Ok(['', Some('hello')]))
    })

    test('returns Ok(None) when provided parser returned Err', () => {
      expect(parser('helld')).toEqual(Ok(['helld', None]))
    })

    test('forwards Incomplete', () => {
      expect(parser('hell')).toEqual(Err(['hell', new ParserErrorIncomplete(1)]))
    })
  })
})