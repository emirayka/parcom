import {Parser} from '@/types'

import {Ok} from '@emirayka/option-result'

export const notLineEnding: Parser<string, string> = (input: string) => {
  let i = 0

  while (i < input.length) {
    if (input[i] === '\r' || input[i] === '\n') {
      break
    }

    i += 1
  }

  return Ok([input.slice(i), input.slice(0, i)])
}
