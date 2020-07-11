import {Parser, ParserErrorAlpha0} from '@/types'

import {mapErr} from '@/combinator'
import {isAlpha} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/complete/combinators'

export const alpha0: Parser<string, string> = mapErr(() => new ParserErrorAlpha0(), takeWhile(isAlpha))