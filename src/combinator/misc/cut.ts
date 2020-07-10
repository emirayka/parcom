import {Err} from '@emirayka/option-result'

import {Parser, ParserErrorFailure, ParserResult} from '@/types'

type Cut = <I, O>(parser: Parser<I, O>) => Parser<I, O>
export const cut: Cut = <I, O>(parser: Parser<I, O>) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      return result
    } else {
      return Err([input, new ParserErrorFailure('')])
    }
  }
}
