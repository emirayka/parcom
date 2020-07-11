import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorChar, ParserErrorIncomplete} from '@/types'
import {char} from './char'

describe('streaming', () => {
  describe('char', () => {
    const parser: Parser<string, string> = char('c')

    test('when input starts with provided char, returns Ok', () => {
      expect(parser('c')).toEqual(Ok(['', 'c']))
    })

    test('when input does not start with provided char, returns Err', () => {
      expect(parser('t')).toEqual(Err(['t', new ParserErrorChar()]))
    })

    test('when input is empty, returns Incomplete', () => {
      expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })
  })
})