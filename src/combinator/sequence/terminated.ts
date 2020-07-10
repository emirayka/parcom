import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserError, ParserResult} from '@/types'

type Terminated = <I, O1, O2>(first: Parser<I, O1>, second: Parser<I, O2>) => Parser<I, O1>
export const terminated: Terminated = <I, O1, O2>(first: Parser<I, O1>, second: Parser<I, O2>) => {
  return (input: I) => {
    const resultFirst: ParserResult<I, O1> = first(input)

    if (resultFirst.isOk()) {
      const restFirst: I = resultFirst.unwrap()[0]
      const valueFirst: O1 = resultFirst.unwrap()[1]

      const resultSecond: ParserResult<I, O2> = second(restFirst)

      if (resultSecond.isOk()) {
        const restSecond: I = resultSecond.unwrap()[0]

        return Ok([restSecond, valueFirst])
      } else {
        const error: ParserError = resultSecond.unwrapErr()[1]

        return Err([input, error])
      }
    } else {
      const error: ParserError = resultFirst.unwrapErr()[1]

      return Err([input, error])
    }
  }
}
