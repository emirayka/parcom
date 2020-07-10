import {Parser, ParserErrorAlphanumeric1} from '@/types'

import {mapErr} from '@/combinator'
import {isAlphanumeric} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'

export const alphanumeric1: Parser<string, string> = mapErr(() => new ParserErrorAlphanumeric1(),takeWhile1(isAlphanumeric))
