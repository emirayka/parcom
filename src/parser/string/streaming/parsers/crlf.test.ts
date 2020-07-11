import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorCrlf, ParserErrorIncomplete} from '@/types'
import {crlf} from './crlf'

describe('streaming', () => {
  describe('crlf', () => {
    test('when input starts with \\r\\n, returns Ok', () => {
      expect(crlf('\r\n')).toEqual(Ok(['', '\r\n']))
      expect(crlf('\r\ntest')).toEqual(Ok(['test', '\r\n']))
    })

    test('when input does not start with \\r\\n, returns Err', () => {
      expect(crlf('a')).toEqual(Err(['a', new ParserErrorCrlf()]))
      expect(crlf('ab')).toEqual(Err(['ab', new ParserErrorCrlf()]))
      expect(crlf('\ra')).toEqual(Err(['\ra', new ParserErrorCrlf()]))
    })

    test('when input is empty or equals \\r, returns Incomplete', () => {
      expect(crlf('')).toEqual(Err(['', new ParserErrorIncomplete(2)]))
      expect(crlf('\r')).toEqual(Err(['\r', new ParserErrorIncomplete(1)]))
    })
  })
})
