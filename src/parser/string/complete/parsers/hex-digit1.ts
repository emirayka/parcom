import {Parser, ParserErrorHexDigit1} from '@/types'

import {mapErr} from '@/combinator'
import {isHexDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'

export const hexDigit1: Parser<string, string> = mapErr(() => new ParserErrorHexDigit1(), takeWhile1(isHexDigit))
