import {Parser, ParserErrorIncomplete} from '@/types'
import {Err, Ok} from '@emirayka/option-result'

type TakeWhile = (predicate: (char: string) => boolean) => Parser<string, string>
export const takeWhile: TakeWhile = (predicate) => (input) => {
  let i = 0

  while (i < input.length) {
    if (!predicate(input[i])) {
      break
    }

    i += 1
  }

  if (i == input.length) {
    return Err([input, new ParserErrorIncomplete(1)])
  } else {
    return Ok([input.substr(i), input.substr(0, i)])
  }
}
