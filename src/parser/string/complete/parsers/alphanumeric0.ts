import {Parser, ParserErrorAlphanumeric0} from '@/types'

import {mapErr} from '@/combinator'
import {isAlphanumeric} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete'

export const alphanumeric0: Parser<string, string> = mapErr(() => new ParserErrorAlphanumeric0(), takeWhile(isAlphanumeric))
