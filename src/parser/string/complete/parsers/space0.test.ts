import {Ok} from '@emirayka/option-result'

import {space0} from './space0'

describe('complete', () => {
  describe('space0', () => {
    test('matches spaces', () => {
      expect(space0('   $')).toEqual(Ok(['$', '   ']))
    })

    test('matches empty string', () => {
      expect(space0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(space0('   ')).toEqual(Ok(['', '   ']))
    })
  })
})
