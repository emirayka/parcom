import {Parser, ParserErrorSeparatedPair} from '@/types'
import {tag} from '@/parser/string/complete'

import {separatedPair} from './separated-pair'
import {Err, Ok} from '@emirayka/option-result'

describe('pair', () => {
  const tagABC: Parser<string, string> = tag('abc')
  const tagComma: Parser<string, string> = tag(',')
  const tagDEF: Parser<string, string> = tag('def')
  const pairABCDEF: Parser<string, [string, string]> = separatedPair(tagABC, tagComma, tagDEF)

  test('if first parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('bcdef')).toEqual(Err(['bcdef', new ParserErrorSeparatedPair()]))
  })

  test('if second parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('abcdef')).toEqual(Err(['abcdef', new ParserErrorSeparatedPair()]))
  })

  test('if third parser returns error then constructed parser returns error ', () => {
    expect(pairABCDEF('abc,ef')).toEqual(Err(['abc,ef', new ParserErrorSeparatedPair()]))
  })

  test('if all parsers return ok then constructed parser returns ok ', () => {
    expect(pairABCDEF('abc,def')).toEqual(Ok(['', ['abc', 'def']]))
  })
})
