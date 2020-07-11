import {Parser, ParserErrorDigit1} from '@/types'

import {mapErr} from '@/combinator'
import {isDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete/combinators'

export const digit1: Parser<string, string> = mapErr(() => new ParserErrorDigit1(), takeWhile1(isDigit))
