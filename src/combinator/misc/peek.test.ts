import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/streaming'
import {peek} from './peek'

describe('peek', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, string> = peek(tagHello)

  describe('returns parser that', () => {
    test('returns Ok when provided parser returned Ok', () => {
      expect(parser('hello')).toEqual(Ok(['hello', 'hello']))
    })

    test('returns the same error when provided parser returned Err', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorTag()]))
    })
  })
})
