import {Parser, ParserErrorDigit0} from '@/types'

import {mapErr} from '@/combinator'
import {isDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete/combinators'

export const digit0: Parser<string, string> = mapErr(() => new ParserErrorDigit0(), takeWhile(isDigit))
