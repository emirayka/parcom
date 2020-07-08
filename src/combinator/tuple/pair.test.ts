import {Parser, ParserErrorPair} from '@/types'
import {tag} from '@/parser/string/complete'

import {pair} from './pair'
import {Err, Ok} from '@emirayka/option-result'

describe('pair', () => {
  const tagABC: Parser<string, string> = tag('abc')
  const tagDEF: Parser<string, string> = tag('def')
  const pairABCDEF: Parser<string, [string, string]> = pair(tagABC, tagDEF)

  test('if first parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('bcdef')).toEqual(Err(['bcdef', new ParserErrorPair()]))
  })

  test('if second parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('abcef')).toEqual(Err(['abcef', new ParserErrorPair()]))
  })

  test('if both parsers return ok then constructed parser returns ok ', () => {
    expect(pairABCDEF('abcdef')).toEqual(Ok(['', ['abc', 'def']]))
  })
})