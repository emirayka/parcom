import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorPair, ParserResult} from '@/types'

type Pair = <I,
  O1,
  O2,
  >(
  p1: Parser<I, O1>,
  p2: Parser<I, O2>,
) => Parser<I, [O1, O2]>

export const pair: Pair = <I,
  O1,
  O2,
  >(
  p1: Parser<I, O1>,
  p2: Parser<I, O2>,
) => {
  return (input: I) => {
    const result1: ParserResult<I, O1>  = p1(input)

    if (result1.isOk()) {
      const [rest1, v1] = result1.unwrap()
      const result2 = p2(rest1)

      if (result2.isOk()) {
        const [rest2, v2] = result2.unwrap()

        return Ok([rest2, [v1, v2]])
      } else {
        // return Err([input, result2.unwrapErr()[1]])
        return Err([input, new ParserErrorPair()])
      }
    } else {
      // return Err([input, result1.unwrapErr()[1]])
      return Err([input, new ParserErrorPair()])
    }
  }
}
