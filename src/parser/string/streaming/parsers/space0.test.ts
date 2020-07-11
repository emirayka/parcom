import {Err, Ok} from '@emirayka/option-result'

import {space0} from './space0'
import {ParserErrorIncomplete} from '@/types'

describe('streaming', () => {
  describe('space0', () => {
    test('matches spaces', () => {
      expect(space0('   $')).toEqual(Ok(['$', '   ']))
    })

    test('matches empty string', () => {
      expect(space0('')).toEqual(Err(['', new ParserErrorIncomplete(1)]))
    })

    test('returns Incomplete', () => {
      expect(space0('   ')).toEqual(Err(['   ', new ParserErrorIncomplete(1)]))
    })
  })
})
