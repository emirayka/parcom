import {Err, Ok} from '@emirayka/option-result'

import {ParserErrorAnychar} from '@/types'
import {anychar} from './anychar'

describe('complete', () => {
  describe('anychar', () => {
    test('when input is not empty, returns Ok', () => {
      expect(anychar('0')).toEqual(Ok(['', '0']))
    })

    test('when input is empty, returns Err', () => {
      expect(anychar('')).toEqual(Err(['', new ParserErrorAnychar()]))
    })
  })
})
