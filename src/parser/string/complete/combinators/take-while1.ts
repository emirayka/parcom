import {Parser, ParserErrorTakeWhile1} from '@/types'
import {Err, Ok} from '@emirayka/option-result'

type TakeWhile1 = (predicate: (char: string) => boolean) => Parser<string, string>
export const takeWhile1: TakeWhile1 = (predicate) => (input) => {
  let i = 0

  while (i < input.length) {
    if (!predicate(input[i])) {
      break
    }

    i += 1
  }

  if (i == 0) {
    return Err([input, new ParserErrorTakeWhile1()])
  } else {
    return Ok([input.substr(i), input.substr(0, i)])
  }
}
