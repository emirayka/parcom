import {Parser, ParserErrorTakeTill1} from '@/types'
import {Err, Ok} from '@emirayka/option-result'

type TakeTill1 = (predicate: (char: string) => boolean) => Parser<string, string>
export const takeTill1: TakeTill1 = (predicate) => (input) => {
  let i = 0

  while (i < input.length) {
    if (predicate(input[i])) {
      break
    }

    i += 1
  }

  if (i == 0) {
    return Err([input, new ParserErrorTakeTill1()])
  } else {
    return Ok([input.substr(i), input.substr(0, i)])
  }
}
