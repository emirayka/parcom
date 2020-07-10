import {Err} from '@emirayka/option-result'

import {needToForward, Parser, ParserError, ParserResult} from '@/types'

type Map = <I, O>(mapFn: (value: ParserError) => ParserError, parser: Parser<I, O>) => Parser<I, O>
export const mapErr: Map = <I, O>(mapFn: (value: ParserError) => ParserError, parser: Parser<I, O>) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      return result
    } else {
      if (needToForward(result)) {
        return result
      }

      const error: ParserError = result.unwrapErr()[1]

      return Err([input, mapFn(error)])
    }
  }
}
