import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserErrorMany1, ParserResult} from '@/types'

type Many1 = <I, O>(parser: Parser<I, O>) => Parser<I, Array<O>>
export const many1: Many1 = <I, O>(parser: Parser<I, O>) => (input: I) => {
  const results: Array<O> = []

  let rest: I = input
  let result: ParserResult<I, O> = parser(input)

  if (needToForward(result)) {
    const [, error] = result.unwrapErr()

    return Err([input, error])
  } else if (result.isErr()) {
    return Err([input, new ParserErrorMany1()])
  }

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
