import {Parser} from '@/types'
import {isBinaryDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming/combinators'

export const binaryDigit0: Parser<string, string> = takeWhile(isBinaryDigit)
