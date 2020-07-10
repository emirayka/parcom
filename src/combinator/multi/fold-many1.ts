import {Err, Ok} from '@emirayka/option-result'

import {needToForward, Parser, ParserErrorFoldMany1, ParserResult} from '@/types'

type FoldMany1 = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A) => Parser<I, A>
export const foldMany1: FoldMany1 = <I, O, A>(parser: Parser<I, O>, f: (acc: A, item: O) => A, init: () => A) => (input: I) => {
  let result: A = init()
  let rest: I = input
  let matchedAtLeastOnce = false

  while (true) {
    const parserResult: ParserResult<I, O> = parser(rest)

    if (needToForward(parserResult)) {
      const [, error] = parserResult.unwrapErr()

      return Err([input, error])
    } else if (parserResult.isErr()) {
      break
    }

    matchedAtLeastOnce = true

    const [currentRest, value] = parserResult.unwrap()

    rest = currentRest
    result = f(result, value)
  }

  if (matchedAtLeastOnce) {
    return Ok([rest, result])
  } else {
    return Err([input, new ParserErrorFoldMany1()])
  }
}
