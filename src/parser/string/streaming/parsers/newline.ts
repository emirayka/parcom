import {Parser, ParserErrorIncomplete, ParserErrorNewline} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const newline: Parser<string, string> = (input: string) => {
  if (input.length === 0) {
    return Err([input, new ParserErrorIncomplete(1)])
  }

  if (input[0] === '\n') {
    return Ok([input.slice(1), input[0]])
  } else {
    return Err([input, new ParserErrorNewline()])
  }
}
