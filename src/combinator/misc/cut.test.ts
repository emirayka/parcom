import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorFailure} from '@/types'
import {tag} from '@/parser/string/streaming'
import {cut} from './cut'

describe('cut', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, string> = cut(tagHello)

  describe('returns parser that', () => {
    test('returns Ok when provided parser returned Ok', () => {
      expect(parser('hellohelld')).toEqual(Ok(['helld', 'hello']))
    })

    test('returns Failure when provided parser returned Err', () => {
      expect(parser('helld')).toEqual(Err(['helld', new ParserErrorFailure('')]))
    })
  })
})
