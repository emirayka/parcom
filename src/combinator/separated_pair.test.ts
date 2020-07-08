import {Parser, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/complete'

import {separatedPair} from './separated_pair'
import {Err, Ok} from '@emirayka/option-result'

describe('pair', () => {
  const tagABC: Parser<string, string> = tag('abc')
  const tagComma: Parser<string, string> = tag(',')
  const tagDEF: Parser<string, string> = tag('def')
  const pairABCDEF: Parser<string, [string, string]> = separatedPair(tagABC, tagComma, tagDEF)

  test('if first parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('bcdef')).toEqual(Err(['bcdef', new ParserErrorTag()]))
  })

  test('if second parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('abcdef')).toEqual(Err(['abcdef', new ParserErrorTag()]))
  })

  test('if third parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('abc,ef')).toEqual(Err(['abc,ef', new ParserErrorTag()]))
  })

  test('if all parsers return ok then constructed parser returns ok ', () => {
    expect(pairABCDEF('abc,def')).toEqual(Ok(['', ['abc', 'def']]))
  })
})
