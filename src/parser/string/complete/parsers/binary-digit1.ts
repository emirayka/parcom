import {Parser, ParserErrorBinaryDigit1} from '@/types'

import {mapErr} from '@/combinator'
import {isBinaryDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'

export const binaryDigit1: Parser<string, string> = mapErr(() => new ParserErrorBinaryDigit1(), takeWhile1(isBinaryDigit))
