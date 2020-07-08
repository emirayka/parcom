import {Err} from '@emirayka/option-result'

import {isFailure, isIncomplete, Parser, ParserErrorAlt, ParserResult} from '@/types'

type Alt = <I,
  O1,
  O2 = O1,
  O3 = O2,
  O4 = O3,
  O5 = O4,
  O6 = O5,
  O7 = O6,
  O8 = O7,
  >(
  p1: Parser<I, O1>,
  p2?: Parser<I, O2>,
  p3?: Parser<I, O3>,
  p4?: Parser<I, O4>,
  p5?: Parser<I, O5>,
  p6?: Parser<I, O6>,
  p7?: Parser<I, O7>,
  p8?: Parser<I, O8>,
) => Parser<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8>

const needForward = <I, O>(result: ParserResult<I, O>): boolean => {
  return result.isErr() && (
    isIncomplete(result.unwrapErr()[1]) ||
    isFailure(result.unwrapErr()[1])
  )
}

export const alt: Alt = <I,
  O1,
  O2 = O1,
  O3 = O2,
  O4 = O3,
  O5 = O4,
  O6 = O5,
  O7 = O6,
  O8 = O7,
  >(
  p1: Parser<I, O1>,
  p2?: Parser<I, O2>,
  p3?: Parser<I, O3>,
  p4?: Parser<I, O4>,
  p5?: Parser<I, O5>,
  p6?: Parser<I, O6>,
  p7?: Parser<I, O7>,
  p8?: Parser<I, O8>,
) => {
  return (input: I): ParserResult<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8> => {
    let result: ParserResult<I, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8>  = p1(input)

    if (needForward(result)) {
      return result
    }

    if (p2) {
      result = result.orElse(() => p2(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p3) {
      result = result.orElse(() => p3(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p4) {
      result = result.orElse(() => p4(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p5) {
      result = result.orElse(() => p5(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p6) {
      result = result.orElse(() => p6(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p7) {
      result = result.orElse(() => p7(input))

      if (needForward(result)) {
        return result
      }
    }

    if (p8) {
      result = result.orElse(() => p8(input))

      if (needForward(result)) {
        return result
      }
    }

    result = result.orElse(() => Err([input, new ParserErrorAlt()]))

    return result
  }
}
