import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorNoneOf} from '@/types'
import {uniqueCharacters} from '@/lib'

type NoneOf = (chars: string) => Parser<string, string>
export const noneOf: NoneOf = (chars) => {
  if (!uniqueCharacters(chars)) {
    throw new Error(`
    Invalid usage of combinator oneOf.
    Combinator oneOf takes string that contains only unique symbols.
    Got: oneOf('${chars}')
    `)
  }

  return (input) => {
    if (input.length !== 0) {
      if (!chars.includes(input[0])) {
        return Ok([input.slice(1), input[0]])
      } else {
        return Err([input, new ParserErrorNoneOf()])
      }
    } else {
      return Err([input, new ParserErrorNoneOf()])
    }
  }
}

