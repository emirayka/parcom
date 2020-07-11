import {Parser, ParserErrorIncomplete} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const notLineEnding: Parser<string, string> = (input: string) => {
  let i = 0

  while (i < input.length) {
    if (input[i] === '\r' || input[i] === '\n') {
      break
    }

    i += 1
  }

  if (i === input.length) {
    return Err([input, new ParserErrorIncomplete(1)])
  } else {
    return Ok([input.slice(i), input.slice(0, i)])
  }
}
