import {Parser, ParserErrorTakeWhileMN} from '@/types'
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
    const length: number = Math.min(n, input.length)

    while (i < length) {
      if (!predicate(input[i])) {
        break
      }

      i += 1
    }

    if (i < m) {
      return Err([input, new ParserErrorTakeWhileMN()])
    } else {
      return Ok([input.substr(i), input.substr(0, i)])
    }
  }
}
