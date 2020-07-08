import {Err, Ok} from '@emirayka/option-result'

import {Parser, ParserErrorIncomplete, ParserErrorTag, ParserResult} from '@/types'

type Tag = (tag: string) => Parser<string, string>
export const tag: Tag = (tag) => (input): ParserResult<string, string> => {
  let i = 0

  while (i < tag.length && i < input.length) {
    if (tag[i] !== input[i]) {
      return Err([input, new ParserErrorTag()])
    }

    i++
  }

  if (i < tag.length) {
    return Err([input, new ParserErrorIncomplete(tag.length - i)])
  }

  return Ok([input.substr(i), input.substr(0, i)])
}