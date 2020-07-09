import {Err} from '@emirayka/option-result'

import {isIncomplete, Parser, ParserErrorComplete, ParserResult} from '@/types'

type Complete = <I,
  O,
  >(
  parser: Parser<I, O>,
) => Parser<I, O>

export const complete: Complete = <I,
  O,
  >(
  parser: Parser<I, O>,
) => {
  return (input: I) => {
    const result: ParserResult<I, O> = parser(input)

    if (result.isOk()) {
      return result
    } else {
      if (isIncomplete(result.unwrapErr()[1])) {
        return Err([input, new ParserErrorComplete()])
      } else {
        return result
      }
    }
  }
}
