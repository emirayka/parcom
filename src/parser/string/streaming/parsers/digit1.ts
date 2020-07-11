import {Parser} from '@/types'
import {isDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const digit1: Parser<string, string> = takeWhile1(isDigit)
