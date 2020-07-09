import {Err, Ok} from '@emirayka/option-result'

import {isFailure, isIncomplete, Parser, ParserError, ParserResult} from '@/types'

const needToForward = <I, O>(result: ParserResult<I, O>): boolean => {
  if (result.isErr()) {
    const error: ParserError = result.unwrapErr()[1]

    return isIncomplete(error) || isFailure(error)
  }

  return false
}

type Many0 = <I, O>(parser: Parser<I, O>) => Parser<I, Array<O>>
export const many0: Many0 = <I, O>(parser: Parser<I, O>) => (input: I) => {
  const results: Array<O> = []

  let rest: I = input
  let result: ParserResult<I, O> = parser(input)

  while (true) {
    if (needToForward(result)) {
      const [, error] = result.unwrapErr()

      return Err([input, error])
    } else if (result.isErr()) {
      break
    }

    const [currentRest, value] = result.unwrap()

    rest = currentRest
    results.push(value)

    result = parser(rest)
  }

  return Ok([rest, results])
}