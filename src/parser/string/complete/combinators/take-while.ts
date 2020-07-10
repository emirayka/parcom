import {Parser} from '@/types'
import {Ok} from '@emirayka/option-result'

type TakeWhile = (predicate: (char: string) => boolean) => Parser<string, string>
export const takeWhile: TakeWhile = (predicate) => (input) => {
  let i = 0

  while (i < input.length) {
    if (!predicate(input[i])) {
      break
    }

    i += 1
  }

  return Ok([input.substr(i), input.substr(0, i)])
}
