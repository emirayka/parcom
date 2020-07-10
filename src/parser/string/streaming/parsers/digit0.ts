import {Parser} from '@/types'
import {isDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming'

export const digit0: Parser<string, string> = takeWhile(isDigit)
