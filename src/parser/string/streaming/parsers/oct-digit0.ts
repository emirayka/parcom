import {Parser} from '@/types'
import {isOctDigit} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming'

export const octDigit0: Parser<string, string> = takeWhile(isOctDigit)
