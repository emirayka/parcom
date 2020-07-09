import {Err, None, Ok, Option, Some} from '@emirayka/option-result'

import {isIncomplete, Parser, ParserError, ParserResult} from '@/types'

type Opt = <I, O>(parser: Parser<I, O>) => Parser<I, Option<O>>

export const opt: Opt = <I, O>(parser: Parser<I, O>) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      const [rest, value] = result.unwrap()

      return Ok([rest, Some(value)])
    } else {
      const error: ParserError = result.unwrapErr()[1]

      if (isIncomplete(error)) {
        return Err([input, error])
      } else {
        return Ok([input, None])
      }
    }
  }
}
