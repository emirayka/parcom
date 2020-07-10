import {Err, Ok} from '@emirayka/option-result'

import {space1} from './space1'
import {ParserErrorIncomplete} from '@/types'

describe('complete', () => {
  describe('space1', () => {
    test('matches spaces', () => {
      expect(space1('   $')).toEqual(Ok(['$', '   ']))
    })

    test('matches empty string', () => {
      expect(space1('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(space1('   ')).toEqual(Err(['   ', new ParserErrorIncomplete(1)]))
    })
  })
})
