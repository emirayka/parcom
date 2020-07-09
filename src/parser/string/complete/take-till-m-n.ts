import {Parser, ParserErrorTakeTillMN} from '@/types'
import {Err, Ok} from '@emirayka/option-result'

type TakeTillMN = (predicate: (char: string) => boolean, m: number, n: number) => Parser<string, string>
export const takeTillMN: TakeTillMN = (predicate, m, n) => {
  if (m > n || m < 0 || n < 0) {
    throw new Error(`
Invalid usage of takeTillMN(a, b).
Numbers a and b must be non negative numbers where a <= b.
Got takeTillMN(${m}, ${n}).
    `)
  }

  return (input) => {
    let i = 0

    while (i < input.length) {
      if (predicate(input[i])) {
        break
      }

      if (i > n) {
        return Err([input, new ParserErrorTakeTillMN()])
      }

      i += 1
    }

    if (i < m) {
      return Err([input, new ParserErrorTakeTillMN()])
    } else {
      return Ok([input.substr(i), input.substr(0, i)])
    }
  }
}
