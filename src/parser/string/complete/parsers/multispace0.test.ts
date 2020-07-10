import {Ok} from '@emirayka/option-result'

import {multispace0} from './multispace0'

describe('complete', () => {
  describe('multispace0', () => {
    test('matches space symbols', () => {
      expect(multispace0(' \t\r\n$')).toEqual(Ok(['$', ' \t\r\n']))
    })

    test('matches empty string', () => {
      expect(multispace0('')).toEqual(Ok(['', '']))
    })

    test('does not return Incomplete', () => {
      expect(multispace0(' \t\r\n')).toEqual(Ok(['', ' \t\r\n']))
    })
  })
})
