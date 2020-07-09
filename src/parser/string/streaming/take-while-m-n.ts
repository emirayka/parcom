import {Parser, ParserErrorIncomplete, ParserErrorTakeWhileMN} from '@/types'
import {Err, Ok} from '@emirayka/option-result'

type TakeWhileMN = (predicate: (char: string) => boolean, m: number, n: number) => Parser<string, string>
export const takeWhileMN: TakeWhileMN = (predicate, m, n) => {
  if (m > n || m < 0 || n < 0) {
    throw new Error(`
Invalid usage of takeWhileMN(a, b).
Numbers a and b must be non negative numbers where a <= b.
Got takeWhileMN(${m}, ${n}).
    `)
  }

  return (input) => {
    let i = 0

    while (i < input.length) {
      if (!predicate(input[i])) {
        break
      }

      if (i > n) {
        return Err([input, new ParserErrorTakeWhileMN()])
      }

      i += 1
    }

    if (i === input.length) {
      return Err([input, new ParserErrorIncomplete(1)])
    } else if (i < m) {
      return Err([input, new ParserErrorTakeWhileMN()])
    } else {
      return Ok([input.substr(i), input.substr(0, i)])
    }
  }
}
