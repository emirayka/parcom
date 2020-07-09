// import {Ok} from '@emirayka/option-result'
//
// import {Parser, ParserResult} from '@/types'
//
// type Recognize = <I, O>(parser: Parser<I, O>) => Parser<I, I>
// export const recognize: Recognize = <I, O>(parser: Parser<I, O>) => {
//   return (input: I) => {
//     const result: ParserResult<I, O> = parser(input)
//
//     if (result.isOk()) {
//       const [input] = result.unwrap()
//
//       return Ok([input, input])
//     } else {
//       return result
//     }
//   }
// }
