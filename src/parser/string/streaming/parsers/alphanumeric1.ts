import {Parser} from '@/types'
import {isAlphanumeric} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const alphanumeric1: Parser<string, string> = takeWhile1(isAlphanumeric)
