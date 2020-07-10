import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserErrorFoldManyMN, ParserResult} from '@/types'

type FoldManyMN = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A, m: number, n: number) => Parser<I, A>
export const foldManyMN: FoldManyMN = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A, m: number, n: number) => {
  if (m < 0 || n < 0 || m > n) {
    throw new Error(`
Invalid usage of foldManyMN(parser, f, init, a, b).
Numbers a and b must be non negative numbers where a <= b.
Got takeTillMN(parser, f, init, ${m}, ${n}).
    `)
  }

  return (input: I) => {
    let result: A = init()
    let rest: I = input
    let matchCount = 0

    while (matchCount < n) {
      const parserResult: ParserResult<I, O> = parser(rest)

      if (needToForward(parserResult)) {
        const [, error] = parserResult.unwrapErr()

        return Err([input, error])
      } else if (parserResult.isErr()) {
        break
      }

      matchCount += 1

      const [currentRest, value] = parserResult.unwrap()

      rest = currentRest
      result = f(result, value)
    }

    if (matchCount < m) {
      return Err([input, new ParserErrorFoldManyMN()])
    } else {
      return Ok([rest, result])
    }
  }
}
