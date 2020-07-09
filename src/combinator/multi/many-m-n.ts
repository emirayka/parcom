import {Err, Ok} from '@emirayka/option-result'

import {isFailure, isIncomplete, Parser, ParserError, ParserErrorManyMN, ParserResult} from '@/types'

const needToForward = <I, O>(result: ParserResult<I, O>): boolean => {
  if (result.isErr()) {
    const error: ParserError = result.unwrapErr()[1]

    return isIncomplete(error) || isFailure(error)
  }

  return false
}

type ManyMN = <I, O>(parser: Parser<I, O>, m: number, n: number) => Parser<I, Array<O>>
export const manyMN: ManyMN = <I, O>(parser: Parser<I, O>, m: number, n: number) => {
  if (m < 0 || n < 0 || m > n) {
    throw new Error(`
Invalid usage of manyMN(a, b).
Numbers a and b must be non negative numbers where a <= b.
Got takeTillMN(${m}, ${n}).
    `)
  }

  return (input: I) => {
    const results: Array<O> = []

    let rest: I = input
    let result: ParserResult<I, O> = parser(input)
    let i = 0

    while (true) {
      if (needToForward(result)) {
        const [, error] = result.unwrapErr()

        return Err([input, error])
      } else if (result.isErr()) {
        break
      }

      const [currentRest, value] = result.unwrap()

      rest = currentRest
      results.push(value)

      if (++i === n) {
        break
      }

      result = parser(rest)
    }

    if (i < m) {
      return Err([input, new ParserErrorManyMN()])
    } else {
      return Ok([rest, results])
    }
  }
}
