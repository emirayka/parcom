import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserResult} from '@/types'

type FoldMany0 = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A) => Parser<I, A>
export const foldMany0: FoldMany0 = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A) => (input: I) => {
  let result: A = init()

  let rest: I = input

  while (true) {
    const parserResult: ParserResult<I, O> = parser(rest)

    if (needToForward(parserResult)) {
      const [, error] = parserResult.unwrapErr()

      return Err([input, error])
    } else if (parserResult.isErr()) {
      break
    }

    const [currentRest, value] = parserResult.unwrap()

    rest = currentRest
    result = f(result, value)
  }

  return Ok([rest, result])
}
