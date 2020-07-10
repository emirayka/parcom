import {Parser, ParserErrorOctDigit1} from '@/types'

import {mapErr} from '@/combinator'
import {isOctDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'

export const octDigit1: Parser<string, string> = mapErr(() => new ParserErrorOctDigit1(), takeWhile1(isOctDigit))
