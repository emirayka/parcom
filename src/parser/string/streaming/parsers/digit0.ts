import {Parser} from '@/types'
import {isDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming/combinators'

export const digit0: Parser<string, string> = takeWhile(isDigit)
