import {Parser, ParserErrorMultispace1} from '@/types'

import {mapErr} from '@/combinator'
import {isMultiSpace} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const multispace1: Parser<string, string> = mapErr(() => new ParserErrorMultispace1(), takeWhile1(isMultiSpace))
