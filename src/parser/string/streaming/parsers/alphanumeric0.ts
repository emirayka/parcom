import {Parser} from '@/types'
import {isAlphanumeric} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming'

export const alphanumeric0: Parser<string, string> = takeWhile(isAlphanumeric)
