import {Parser, ParserErrorLineEnding} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const lineEnding: Parser<string, string> = (input: string) => {
  if (input.length === 0) {
    return Err([input, new ParserErrorLineEnding()])
  }

  if (input[0] === '\n') {
    return Ok([input.slice(1), input[0]])
  } else if (input.length > 1 && input[0] === '\r' && input[1] === '\n') {
    return Ok([input.slice(2), input.slice(0, 2)])
  } else {
    return Err([input, new ParserErrorLineEnding()])
  }
}
