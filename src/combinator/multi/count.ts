import {Err, Ok} from '@emirayka/option-result'

import {isFailure, isIncomplete, Parser, ParserError, ParserErrorCount, ParserResult} from '@/types'

const needToForward = <I, O>(result: ParserResult<I, O>): boolean => {
  if (result.isErr()) {
    const error: ParserError = result.unwrapErr()[1]

    return isIncomplete(error) || isFailure(error)
  }

  return false
}

type Count = <I, O>(parser: Parser<I, O>, count: number) => Parser<I, Array<O>>
export const count: Count = <I, O>(parser: Parser<I, O>, count: number) => (input: I) => {
  const results: Array<O> = []

  let rest: I = input
  let result: ParserResult<I, O> = parser(input)
  let i = 0

  while (i < count) {
    if (needToForward(result)) {
      const [, error] = result.unwrapErr()

      return Err([input, error])
    } else if (result.isErr()) {
      break
    }

    i += 1

    const [currentRest, value] = result.unwrap()

    rest = currentRest
    results.push(value)

    result = parser(rest)
  }

  if (i < count) {
    return Err([input, new ParserErrorCount()])
  }

  return Ok([rest, results])
}
