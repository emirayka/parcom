import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserErrorMany1Count, ParserResult} from '@/types'

type Many1Count = <I, O>(parser: Parser<I, O>) => Parser<I, number>
export const many1Count: Many1Count = <I, O>(parser: Parser<I, O>) => (input: I) => {
  let count = 0

  let rest: I = input
  let result: ParserResult<I, O> = parser(input)

  if (needToForward(result)) {
    const [, error] = result.unwrapErr()

    return Err([input, error])
  } else if (result.isErr()) {
    return Err([input, new ParserErrorMany1Count()])
  }

  while (true) {
    if (needToForward(result)) {
      const [, error] = result.unwrapErr()

      return Err([input, error])
    } else if (result.isErr()) {
      break
    }

    const [currentRest] = result.unwrap()
    count += 1

    rest = currentRest

    result = parser(rest)
  }

  return Ok([rest, count])
}
