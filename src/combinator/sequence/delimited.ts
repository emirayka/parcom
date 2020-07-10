import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserError, ParserResult} from '@/types'

type Delimited = <I, O1, O2, O3>(first: Parser<I, O1>, second: Parser<I, O2>, third: Parser<I, O3>) => Parser<I, O2>
export const delimited: Delimited = <I, O1, O2, O3>(first: Parser<I, O1>, second: Parser<I, O2>, third: Parser<I, O3>) => {
  return (input: I) => {
    const resultFirst: ParserResult<I, O1> = first(input)

    if (resultFirst.isOk()) {
      const restFirst: I = resultFirst.unwrap()[0]
      const resultSecond: ParserResult<I, O2> = second(restFirst)

      if (resultSecond.isOk()) {
        const restSecond: I = resultSecond.unwrap()[0]
        const valueSecond: O2 = resultSecond.unwrap()[1]

        const resultThird: ParserResult<I, O3> = third(restSecond)

        if (resultThird.isOk()) {
          const restThird: I = resultThird.unwrap()[0]

          return Ok([restThird, valueSecond])
        } else {
          const error: ParserError = resultThird.unwrapErr()[1]

          return Err([input, error])
        }
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
