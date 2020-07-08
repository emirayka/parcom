import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserResult} from '@/types'

type SeparatedPair = <I,
  O1,
  O2,
  O3,
  >(
  p1: Parser<I, O1>,
  p2: Parser<I, O2>,
  p3: Parser<I, O3>,
) => Parser<I, [O1, O3]>

export const separatedPair: SeparatedPair = <I,
  O1,
  O2,
  O3,
  >(
  p1: Parser<I, O1>,
  p2: Parser<I, O2>,
  p3: Parser<I, O3>,
) => {
  return (input: I): ParserResult<I, [O1, O3]> => {
    const result1: ParserResult<I, O1> = p1(input)

    if (result1.isOk()) {
      const [rest1, v1] = result1.unwrap()
      const result2 = p2(rest1)

      if (result2.isOk()) {
        const [rest2] = result2.unwrap()
        const result3 = p3(rest2)

        if (result3.isOk()) {
          const [rest3, v3] = result3.unwrap()

          return Ok([rest3, [v1, v3]])
        } else {
          return Err([input, result3.unwrapErr()[1]])
        }
      } else {
        return Err([input, result2.unwrapErr()[1]])
      }
    } else {
      return Err([input, result1.unwrapErr()[1]])
    }
  }
}
