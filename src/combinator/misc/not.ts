import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorNot, ParserResult} from '@/types'

type Not = <I, O>(parser: Parser<I, O>) => Parser<I, null>
export const not: Not = <I, O>(parser: Parser<I, O>) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      return Err([input, new ParserErrorNot()])
    } else {
      return Ok([input, null])
    }
  }
}
