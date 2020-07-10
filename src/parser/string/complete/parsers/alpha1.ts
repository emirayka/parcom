import {Parser, ParserErrorAlpha1} from '@/types'
import {isAlpha} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/complete'
import {mapErr} from '@/combinator'

export const alpha1: Parser<string, string> = mapErr(() => new ParserErrorAlpha1(), takeWhile1(isAlpha))
