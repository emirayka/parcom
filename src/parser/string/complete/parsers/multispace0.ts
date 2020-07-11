import {Parser, ParserErrorMultispace0} from '@/types'

import {mapErr} from '@/combinator'
import {isMultiSpace} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete/combinators'

export const multispace0: Parser<string, string> = mapErr(() => new ParserErrorMultispace0(), takeWhile(isMultiSpace))
