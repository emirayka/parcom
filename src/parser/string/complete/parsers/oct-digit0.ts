import {Parser, ParserErrorOctDigit0} from '@/types'

import {mapErr} from '@/combinator'
import {isOctDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete/combinators'

export const octDigit0: Parser<string, string> = mapErr(() => new ParserErrorOctDigit0(), takeWhile(isOctDigit))
