import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserResult} from '@/types'

type Many0Count = <I, O>(parser: Parser<I, O>) => Parser<I, number>
export const many0Count: Many0Count = <I, O>(parser: Parser<I, O>) => (input: I) => {
  let count = 0

  let rest: I = input
  let result: ParserResult<I, O> = parser(input)

  while (true) {
    if (needToForward(result)) {
      const [, error] = result.unwrapErr()

      return Err([input, error])
    } else if (result.isErr()) {
      break
    }

    const [currentRest] = result.unwrap()

    rest = currentRest
    count += 1

    result = parser(rest)
  }

  return Ok([rest, count])
}
