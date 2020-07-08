import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorMap, ParserResult} from '@/types'

type Map = <I,
  O1,
  O2,
  >(
  mapFn: (value: O1) => O2,
  parser: Parser<I, O1>,
) => Parser<I, O2>

export const map: Map = <I,
  O1,
  O2,
  >(
  mapFn: (value: O1) => O2,
  parser: Parser<I, O1>,
) => {
  return (input: I): ParserResult<I, O2> => {
    const result: ParserResult<I, O1> = parser(input)

    if (result.isOk()) {
      const [rest, value] = result.unwrap()

      return Ok([rest, mapFn(value)])
    } else {
      // return Err([input, result.unwrapErr()[1]])
      return Err([input, new ParserErrorMap()])
    }
  }
}
