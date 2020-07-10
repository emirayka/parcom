import {Parser, ParserErrorMap} from '@/types'
import {tag} from '@/parser/string/complete'
import {map} from './map'
import {Err, Ok} from '@emirayka/option-result'

describe('map', () => {
  describe('constructs parser that', () => {
    const tagABC: Parser<string, string> = tag('abc')
    const len = (value: string): number => value.length
    const parser: Parser<string, number> = map(len, tagABC)

    test('returns mapped value if provided parser returned Ok', () => {
      expect(parser('abc')).toEqual(Ok(['', 3]))
    })

    test('returns error if provided parser returned Err', () => {
      expect(parser('abd')).toEqual(Err(['abd', new ParserErrorMap()]))
    })
  })
})