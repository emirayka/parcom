import {Err, Ok} from '@emirayka/option-result'

import {
  Parser,
  ParserError,
  ParserErrorAlt,
  ParserErrorFailure,
  ParserErrorIncomplete,
  ParserErrorTag,
  ParserResult,
} from '@/types'
import {tag} from '@/parser/string/streaming'
import {alt} from './alt'

describe('alt', () => {
  const parser1: Parser<string, string> = tag('11')
  const parser2: Parser<string, string> = tag('22')
  const parser3: Parser<string, string> = tag('33')
  const parser4: Parser<string, string> = tag('44')
  const parser5: Parser<string, string> = tag('55')
  const parser6: Parser<string, string> = tag('66')
  const parser7: Parser<string, string> = tag('77')
  const parser8: Parser<string, string> = tag('88')

  const altParser2: Parser<string, string> = alt(
    parser1,
    parser2,
  )
  const altParser8: Parser<string, string> = alt(
    parser1,
    parser2,
    parser3,
    parser4,
    parser5,
    parser6,
    parser7,
    parser8,
  )

  const alternativeTest = (parser: Parser<string, string>, alternativeIndex: number, input: string, rest: string, parsed: string) => {
    test(`passes to alternative #${alternativeIndex}`, () => {
      expect(parser(input)).toEqual(Ok([rest, parsed]))
    })
  }

  const failedAlternativeAssertion = (parser: Parser<string, string>, input: string, rest: string, error: ParserError) => {
    expect(parser(input)).toEqual(Err([rest, error]))
  }

  const failedTest = (parser: Parser<string, string>, message: string, input: string, rest: string, error: ParserError) => {
    test(message, () => {
      expect(parser(input)).toEqual(Err([rest, error]))
    })
  }

  describe('alt combinator with 8 alternatives', () => {
    describe('passes to alternatives', () => {
      const specs: Array<[string, string, string]> = [
        ['11abc', 'abc', '11'],
        ['22abc', 'abc', '22'],
        ['33abc', 'abc', '33'],
        ['44abc', 'abc', '44'],
        ['55abc', 'abc', '55'],
        ['66abc', 'abc', '66'],
        ['77abc', 'abc', '77'],
        ['88abc', 'abc', '88'],
      ]

      let i = 0

      for (const spec of specs) {
        alternativeTest(altParser8, ++i, spec[0], spec[1], spec[2])
      }

      test('returns error when no alternative were passed', () => {
        expect(altParser8('9abc')).toEqual(Err(['9abc', new ParserErrorAlt()]))
      })
    })
  })

  describe('alt with 2 alternatives', () => {
    describe('passes to alternatives', () => {
      const passingSpecs: Array<[string, string, string]> = [
        ['11abc', 'abc', '11'],
        ['22abc', 'abc', '22'],
      ]

      let i = 0

      for (const spec of passingSpecs) {
        alternativeTest(altParser2, ++i, spec[0], spec[1], spec[2])
      }
    })

    test('returns error when no alternative were passed', () => {
      const failingSpecs: Array<[string, string, ParserError]> = [
        ['33abc', '33abc', new ParserErrorAlt()],
        ['44abc', '44abc', new ParserErrorAlt()],
        ['55abc', '55abc', new ParserErrorAlt()],
        ['66abc', '66abc', new ParserErrorAlt()],
        ['77abc', '77abc', new ParserErrorAlt()],
        ['88abc', '88abc', new ParserErrorAlt()],
        ['99abc', '99abc', new ParserErrorAlt()],
      ]

      for (const spec of failingSpecs) {
        failedAlternativeAssertion(altParser2, spec[0], spec[1], spec[2])
      }
    })
  })

  describe('forwards Incomplete', () => {
    const failingSpecs: Array<[string, string, ParserError]> = [
      ['1', '1', new ParserErrorIncomplete(1)],
      ['2', '2', new ParserErrorIncomplete(1)],
      ['3', '3', new ParserErrorIncomplete(1)],
      ['4', '4', new ParserErrorIncomplete(1)],
      ['5', '5', new ParserErrorIncomplete(1)],
      ['6', '6', new ParserErrorIncomplete(1)],
      ['7', '7', new ParserErrorIncomplete(1)],
      ['8', '8', new ParserErrorIncomplete(1)],
    ]
    let i = 0

    for (const spec of failingSpecs) {
      failedTest(altParser8, `forwards Incomplete of alternative #${++i}`, spec[0], spec[1], spec[2])
    }
  })

  describe('forwards Failure', () => {
    const makeFailureParser = (tag: string, message: string) => (input: string): ParserResult<string, string>  => {
      if (input.startsWith(tag)) {
        return Err([input, new ParserErrorFailure(message)])
      }

      return Err([input, new ParserErrorTag()])
    }

    const altFailure8: Parser<string, string> = alt(
      makeFailureParser('1', '1'),
      makeFailureParser('2', '2'),
      makeFailureParser('3', '3'),
      makeFailureParser('4', '4'),
      makeFailureParser('5', '5'),
      makeFailureParser('6', '6'),
      makeFailureParser('7', '7'),
      makeFailureParser('8', '8'),
    )

    const failingSpecs: Array<[string, string, ParserError]> = [
      ['1', '1', new ParserErrorFailure('1')],
      ['2', '2', new ParserErrorFailure('2')],
      ['3', '3', new ParserErrorFailure('3')],
      ['4', '4', new ParserErrorFailure('4')],
      ['5', '5', new ParserErrorFailure('5')],
      ['6', '6', new ParserErrorFailure('6')],
      ['7', '7', new ParserErrorFailure('7')],
      ['8', '8', new ParserErrorFailure('8')],
    ]
    let i = 0

    for (const spec of failingSpecs) {
      failedTest(altFailure8, `forwards Failure of alternative #${++i}`, spec[0], spec[1], spec[2])
    }
  })
})