import {Parser} from '@/types'
import {isAlpha} from '@/parser/string/predicate'
import {takeWhile} from '@/parser/string/streaming'

export const alpha0: Parser<string, string> = takeWhile(isAlpha)