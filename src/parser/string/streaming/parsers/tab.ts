import {Parser, ParserErrorIncomplete, ParserErrorTab} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const tab: Parser<string, string> = (input: string) => {
  if (input.length === 0) {
    return Err([input, new ParserErrorIncomplete(1)])
  }

  if (input[0] === '\t') {
    return Ok([input.slice(1), input[0]])
  } else {
    return Err([input, new ParserErrorTab()])
  }
}
