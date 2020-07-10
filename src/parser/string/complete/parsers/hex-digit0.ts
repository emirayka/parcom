import {Parser, ParserErrorHexDigit0} from '@/types'

import {mapErr} from '@/combinator'
import {isHexDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete'

export const hexDigit0: Parser<string, string> = mapErr(() => new ParserErrorHexDigit0(), takeWhile(isHexDigit))
