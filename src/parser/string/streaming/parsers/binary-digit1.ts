import {Parser} from '@/types'
import {isBinaryDigit} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const binaryDigit1: Parser<string, string> = takeWhile1(isBinaryDigit)
