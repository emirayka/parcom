import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete, ParserErrorLineEnding} from '@/types'
import {lineEnding} from './line-ending'

describe('streaming', () => {
  describe('lineEnding', () => {
    test('when input starts with \\r\\n or with \\n, returns Ok', () => {
      expect(lineEnding('\r\n')).toEqual(Ok(['', '\r\n']))
      expect(lineEnding('\r\ntest')).toEqual(Ok(['test', '\r\n']))
      expect(lineEnding('\n')).toEqual(Ok(['', '\n']))
      expect(lineEnding('\ntest')).toEqual(Ok(['test', '\n']))
    })

    test('when input does not start with \\r\\n, returns Err', () => {
      expect(lineEnding('a')).toEqual(Err(['a', new ParserErrorLineEnding()]))
      expect(lineEnding('ab')).toEqual(Err(['ab', new ParserErrorLineEnding()]))
      expect(lineEnding('\ra')).toEqual(Err(['\ra', new ParserErrorLineEnding()]))
    })

    test('when input is empty or equals to \\r, returns Incomplete', () => {
      expect(lineEnding('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
      expect(lineEnding('\r')).toEqual(Err(['\r', new ParserErrorIncomplete(1)]))
    })
  })
})
