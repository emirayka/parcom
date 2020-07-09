import {Err, None, Ok, Option, Some} from '@emirayka/option-result'

import {Parser, ParserErrorMapOpt, ParserResult} from '@/types'

type MapOpt = <I, O1, O2>(mapFn: (value: O1) => O2, parser: Parser<I, Option<O1>>) => Parser<I, Option<O2>>
export const mapOpt: MapOpt = <I, O1, O2>(mapFn: (value: O1) => O2, parser: Parser<I, Option<O1>>) => {
  return (input: I) => {
    const result: ParserResult<I, Option<O1>> = parser(input)

    if (result.isOk()) {
      const [rest, value] = result.unwrap()

      if (value.isSome()) {
        return Ok([rest, Some(mapFn(value.unwrap()))])
      } else {
        return Ok([rest, None])
      }
    } else {
      // return Err([input, result.unwrapErr()[1]])
      return Err([input, new ParserErrorMapOpt()])
    }
  }
}
