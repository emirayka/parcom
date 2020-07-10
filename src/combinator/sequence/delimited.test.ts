import {Parser, ParserErrorFailure, ParserErrorIncomplete, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/streaming'

import {delimited} from './delimited'
import {Err, Ok} from '@emirayka/option-result'

describe('pair', () => {
  const tagABC: Parser<string, string> = tag('abc')
  const tagDEF: Parser<string, string> = tag('def')
  const tagGHI: Parser<string, string> = tag('ghi')
  const parser: Parser<string, string> = delimited(tagABC, tagDEF, tagGHI)

  const failedParser: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const parserWithFailedFirstPart: Parser<string, string> = delimited(failedParser, tagDEF, tagGHI)
  const parserWithFailedSecondPart: Parser<string, string> = delimited(tagABC, failedParser, tagGHI)
  const parserWithFailedThirdPart: Parser<string, string> = delimited(tagABC, tagDEF, failedParser)

  test('if first parser returns error then constructed parser returns error ', () => {
    expect(parser('bcdefghi.')).toEqual(Err(['bcdefghi.', new ParserErrorTag()]))
  })

  test('if second parser returns error then constructed parser returns error ', () => {
    expect(parser('abcefghi.')).toEqual(Err(['abcefghi.', new ParserErrorTag()]))
  })

  test('if third parser returns error then constructed parser returns error ', () => {
    expect(parser('abcdefhi.')).toEqual(Err(['abcdefhi.', new ParserErrorTag()]))
  })

  test('if both parsers return ok then constructed parser returns ok ', () => {
    expect(parser('abcdefghi.')).toEqual(Ok(['.', 'def']))
  })

  test('forwards Incomplete', () => {
    expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(3)]))
    expect(parser('ab')).toEqual(Err(['ab', new ParserErrorIncomplete(1)]))
    expect(parser('abc')).toEqual(Err(['abc', new ParserErrorIncomplete(3)]))
    expect(parser('abcd')).toEqual(Err(['abcd', new ParserErrorIncomplete(2)]))
    expect(parser('abcdef')).toEqual(Err(['abcdef', new ParserErrorIncomplete(3)]))
    expect(parser('abcdefg')).toEqual(Err(['abcdefg', new ParserErrorIncomplete(2)]))
  })

  test('forwards Failure', () => {
    expect(parserWithFailedFirstPart('abcdefghi')).toEqual(Err(['abcdefghi', new ParserErrorFailure('abcdefghiabcdefghi')]))
    expect(parserWithFailedSecondPart('abcdefghi')).toEqual(Err(['abcdefghi', new ParserErrorFailure('defghidefghi')]))
    expect(parserWithFailedThirdPart('abcdefghi')).toEqual(Err(['abcdefghi', new ParserErrorFailure('ghighi')]))
  })
})
