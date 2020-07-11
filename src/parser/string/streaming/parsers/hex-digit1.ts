import {Parser} from '@/types'
import {isHexDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const hexDigit1: Parser<string, string> = takeWhile1(isHexDigit)
