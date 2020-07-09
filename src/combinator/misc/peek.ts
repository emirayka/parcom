import {Ok} from '@emirayka/option-result'

import {Parser, ParserResult} from '@/types'

type Peek = <I, O>(parser: Parser<I, O>) => Parser<I, O>

export const peek: Peek = <I, O>(parser: Parser<I, O>) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      const [, value] = result.unwrap()

      return Ok([input, value])
    } else {
      return result
    }
  }
}
