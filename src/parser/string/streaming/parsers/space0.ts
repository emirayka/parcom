import {Parser, ParserErrorSpace0} from '@/types'

import {mapErr} from '@/combinator'
import {isSpace} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming/combinators'

export const space0: Parser<string, string> = mapErr(() => new ParserErrorSpace0(), takeWhile(isSpace))
