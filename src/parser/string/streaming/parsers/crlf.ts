import {Parser, ParserErrorCrlf, ParserErrorIncomplete} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const crlf: Parser<string, string> = (input: string) => {
  if (input.length === 0) {
    return Err([input, new ParserErrorIncomplete(2)])
  }

  if (input.length === 1 && input[0] === '\r') {
    return Err([input, new ParserErrorIncomplete(1)])
  }

  if (input[0] === '\r' && input[1]  === '\n') {
    return Ok([input.slice(2), input.slice(0, 2)])
  } else {
    return Err([input, new ParserErrorCrlf()])
  }
}
