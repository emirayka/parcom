import {Parser, ParserErrorAlpha1} from '@/types'

import {mapErr} from '@/combinator'
import {isAlpha} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete/combinators'

export const alpha1: Parser<string, string> = mapErr(() => new ParserErrorAlpha1(), takeWhile1(isAlpha))
