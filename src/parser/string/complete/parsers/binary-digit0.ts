import {Parser, ParserErrorBinaryDigit0} from '@/types'

import {mapErr} from '@/combinator'
import {isBinaryDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete'

export const binaryDigit0: Parser<string, string> = mapErr(() => new ParserErrorBinaryDigit0(), takeWhile(isBinaryDigit))
