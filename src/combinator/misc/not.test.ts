import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorNot} from '@/types'
import {tag} from '@/parser/string/streaming'
import {not} from './not'

describe('not', () => {
  const tagHello: Parser<string, string> = tag('hello')
  const parser: Parser<string, null> = not(tagHello)

  describe('returns parser that', () => {
    test('returns Ok(Some) when provided parser returned Ok', () => {
      expect(parser('hello')).toEqual(Err(['hello', new ParserErrorNot()]))
    })

    test('returns Ok(None) when provided parser returned Err', () => {
      expect(parser('helld')).toEqual(Ok(['helld', null]))
    })
  })
})
