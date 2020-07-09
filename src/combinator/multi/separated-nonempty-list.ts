import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserError, ParserErrorSeparatedNonemptyList, ParserResult} from '@/types'

type SeparatedNonemptyList = <I, O1, O2>(separator: Parser<I, O1>, separated: Parser<I, O2>) => Parser<I, Array<O2>>
export const separatedNonemptyList: SeparatedNonemptyList = <I, O1, O2>(separator: Parser<I, O1>, separated: Parser<I, O2>) => {
  return (input: I) => {
    const results: Array<O2> = []

    const result: ParserResult<I, O2> = separated(input)

    if (result.isErr()) {
      if (needToForward(result)) {
        const error: ParserError = result.unwrapErr()[1]

        return Err([input, error])
      }

      return Err([input, new ParserErrorSeparatedNonemptyList()])
    }

    let rest: I = result.unwrap()[0]

    const value: O2 = result.unwrap()[1]
    results.push(value)

    while (true) {
      // separator part
      const resultSeparator: ParserResult<I, O1> = separator(rest)

      if (resultSeparator.isErr()) {
        if (needToForward(resultSeparator)) {
          const error: ParserError = resultSeparator.unwrapErr()[1]

          return Err([input, error])
        }

        break
      }

      const restSeparator: I = resultSeparator.unwrap()[0]

      // separated part
      const resultSeparated: ParserResult<I, O2> = separated(restSeparator)

      if (resultSeparated.isErr()) {
        if (needToForward(resultSeparated)) {
          const error: ParserError = resultSeparated.unwrapErr()[1]

          return Err([input, error])
        }

        break
      }

      const restSeparated: I = resultSeparated.unwrap()[0]
      const value: O2 = resultSeparated.unwrap()[1]

      results.push(value)
      rest = restSeparated
    }

    return Ok([rest, results])
  }
}
