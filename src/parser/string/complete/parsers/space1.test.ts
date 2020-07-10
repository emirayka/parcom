import {Err, Ok} from '@emirayka/option-result'

import {space1} from './space1'
import {ParserErrorSpace1} from '@/types'

describe('complete', () => {
  describe('space1', () => {
    test('matches spaces', () => {
      expect(space1('   $')).toEqual(Ok(['$', '   ']))
    })

    test('matches empty string', () => {
      expect(space1('')).toEqual(Err(['', new ParserErrorSpace1()]))
    })

    test('does not return Incomplete', () => {
      expect(space1('   ')).toEqual(Ok(['', '   ']))
    })
  })
})
