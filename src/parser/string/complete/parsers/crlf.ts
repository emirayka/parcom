import {Parser, ParserErrorCrlf} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const crlf: Parser<string, string> = (input: string) => {
  if (input.length < 2) {
    return Err([input, new ParserErrorCrlf()])
  }

  if (input[0] === '\r' && input[1]  === '\n') {
    return Ok([input.slice(2), input.slice(0, 2)])
  } else {
    return Err([input, new ParserErrorCrlf()])
  }
}
