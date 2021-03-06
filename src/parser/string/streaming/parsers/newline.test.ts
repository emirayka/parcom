import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete, ParserErrorNewline} from '@/types'
import {newline} from './newline'

describe('streaming', () => {
  describe('newline', () => {
    test('when input starts with \\r\\n or with \\n, returns Ok', () => {
      expect(newline('\n')).toEqual(Ok(['', '\n']))
      expect(newline('\ntest')).toEqual(Ok(['test', '\n']))
    })

    test('when input does not start with \\r\\n, returns Err', () => {
      expect(newline('a')).toEqual(Err(['a', new ParserErrorNewline()]))
      expect(newline('ab')).toEqual(Err(['ab', new ParserErrorNewline()]))
    })

    test('when input is empty, returns Incomplete', () => {
      expect(newline('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })
  })
})
