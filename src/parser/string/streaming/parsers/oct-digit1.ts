import {Parser} from '@/types'
import {isOctDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const octDigit1: Parser<string, string> = takeWhile1(isOctDigit)
