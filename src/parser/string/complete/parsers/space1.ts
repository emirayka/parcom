import {Parser, ParserErrorSpace1} from '@/types'

import {mapErr} from '@/combinator'
import {isSpace} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'

export const space1: Parser<string, string> = mapErr(() => new ParserErrorSpace1(), takeWhile1(isSpace))
