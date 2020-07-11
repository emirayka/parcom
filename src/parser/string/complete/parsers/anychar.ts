import {Parser, ParserErrorAnychar} from '@/types'

import {Err, Ok} from '@emirayka/option-result'

export const anychar: Parser<string, string> = (input: string) => {
  if (input.length !== 0) {
    return Ok([input.slice(1), input[0]])
  } else {
    return Err([input, new ParserErrorAnychar()])
  }
}
