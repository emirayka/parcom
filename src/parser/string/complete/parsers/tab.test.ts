import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorTab} from '@/types'
import {tab} from './tab'

describe('complete', () => {
  describe('tab', () => {
    test('when input starts with \\t, returns Ok', () => {
      expect(tab('\t')).toEqual(Ok(['', '\t']))
      expect(tab('\ttest')).toEqual(Ok(['test', '\t']))
    })

    test('when input does not start with \\t, returns Err', () => {
      expect(tab('a')).toEqual(Err(['a', new ParserErrorTab()]))
      expect(tab('ab')).toEqual(Err(['ab', new ParserErrorTab()]))
    })

    test('when input is empty, returns Err', () => {
      expect(tab('')).toEqual(Err(['', new ParserErrorTab()]))
    })
  })
})
