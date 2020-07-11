import {Ok} from '@emirayka/option-result'

import {notLineEnding} from './not_line_ending'

describe('complete', () => {
  describe('notLineEnding', () => {
    test('returns part until first symbol \\r, \\n or line end', () => {
      expect(notLineEnding('\r')).toEqual(Ok(['\r', '']))
      expect(notLineEnding('\n')).toEqual(Ok(['\n', '']))
      expect(notLineEnding('test\r')).toEqual(Ok(['\r', 'test']))
      expect(notLineEnding('test\n')).toEqual(Ok(['\n', 'test']))
    })

    test('does not return Incomplete', () => {
      expect(notLineEnding('')).toEqual(Ok(['', '']))
      expect(notLineEnding('test')).toEqual(Ok(['', 'test']))
    })
  })
})
