import {Parser, ParserErrorFailure, ParserErrorIncomplete, ParserErrorTag} from '@/types'
import {tag} from '@/parser/string/streaming'

import {preceded} from './preceded'
import {Err, Ok} from '@emirayka/option-result'

describe('pair', () => {
  const tagABC: Parser<string, string> = tag('abc')
  const tagDEF: Parser<string, string> = tag('def')
  const parser: Parser<string, string> = preceded(tagABC, tagDEF)

  const failedParser: Parser<string, string> = (input: string) => Err([input, new ParserErrorFailure(`${input}${input}`)])
  const parserWithFailedFirstPart: Parser<string, string> = preceded(failedParser, tagDEF)
  const parserWithFailedSecondPart: Parser<string, string> = preceded(tagABC, failedParser)

  test('if first parser returns error then constructed parser returns error ', () => {
    expect(parser('bcdef.')).toEqual(Err(['bcdef.', new ParserErrorTag()]))
  })

  test('if second parser returns error then constructed parser returns error ', () => {
    expect(parser('abcef.')).toEqual(Err(['abcef.', new ParserErrorTag()]))
  })

  test('if both parsers return ok then constructed parser returns ok ', () => {
    expect(parser('abcdef.')).toEqual(Ok(['.', 'def']))
  })

  test('forwards Incomplete', () => {
    expect(parser('')).toEqual(Err(['', new ParserErrorIncomplete(3)]))
    expect(parser('ab')).toEqual(Err(['ab', new ParserErrorIncomplete(1)]))
    expect(parser('abc')).toEqual(Err(['abc', new ParserErrorIncomplete(3)]))
    expect(parser('abcd')).toEqual(Err(['abcd', new ParserErrorIncomplete(2)]))
  })

  test('forwards Failure', () => {
    expect(parserWithFailedFirstPart('abcdef')).toEqual(Err(['abcdef', new ParserErrorFailure('abcdefabcdef')]))
    expect(parserWithFailedSecondPart('abcdef')).toEqual(Err(['abcdef', new ParserErrorFailure('defdef')]))
  })
})
