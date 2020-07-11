import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorIncomplete} from '@/types'
import {anychar} from './anychar'

describe('streaming', () => {
  describe('anychar', () => {
    test('when input is not empty, returns Ok', () => {
      expect(anychar('0')).toEqual(Ok(['', '0']))
    })

    test('when input is empty, returns Incomplete', () => {
      expect(anychar('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })
  })
})
