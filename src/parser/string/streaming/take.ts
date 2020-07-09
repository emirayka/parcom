import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete} from '@/types'

type Take = (amount: number) => Parser<string, string>
export const take: Take = (amount) => (input) => {
  if (input.length >= amount) {
    return Ok([input.substr(amount), input.substr(0, amount)])
  }

  return Err([input, new ParserErrorIncomplete(amount - input.length)])
}
