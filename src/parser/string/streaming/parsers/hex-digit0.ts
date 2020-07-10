import {Parser} from '@/types'
import {isHexDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming'

export const hexDigit0: Parser<string, string> = takeWhile(isHexDigit)
