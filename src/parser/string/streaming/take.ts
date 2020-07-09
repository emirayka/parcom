import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete, ParserResult} from '@/types'

export const take = (amount: number) => (input: string): ParserResult<string, string> => {
  if (input.length >= amount) {
    return Ok([input.substr(amount), input.substr(0, amount)])
  }

  return Err([input, new ParserErrorIncomplete(amount - input.length)])
}
