import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {notLineEnding} from './not_line_ending'

describe('streaming', () => {
  describe('notLineEnding', () => {
    test('returns part until first symbol \\r, \\n or line end', () => {
      expect(notLineEnding('\r')).toEqual(Ok(['\r', '']))
      expect(notLineEnding('\n')).toEqual(Ok(['\n', '']))
      expect(notLineEnding('test\r')).toEqual(Ok(['\r', 'test']))
      expect(notLineEnding('test\n')).toEqual(Ok(['\n', 'test']))
    })

    test('returns Incomplete', () => {
      expect(notLineEnding('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
      expect(notLineEnding('test')).toEqual(Err(['test', new ParserErrorIncomplete(1)]))
    })
  })
})
