import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorChar} from '@/types'

type Char = (char: string) => Parser<string, string>
export const char: Char = (c) => {
  if (c.length !== 1) {
    throw new Error(`
    Invalid usage of char.
    Char combinator excepts a string that consists of one symbol.
    Got: char('${c}')
    `)
  }

  return (input) => {
    if (input.length !== 0) {
      if (input[0] === c) {
        return Ok([input.slice(1), input[0]])
      } else {
        return Err([input, new ParserErrorChar()])
      }
    } else {
      return Err([input, new ParserErrorChar()])
    }
  }
}
