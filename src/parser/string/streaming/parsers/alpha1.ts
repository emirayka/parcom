import {Parser} from '@/types'
import {isAlpha} from '@/parser/string/predicate'
import {takeWhile1} from '@/parser/string/streaming/combinators'

export const alpha1: Parser<string, string> = takeWhile1(isAlpha)
