import {Result} from '@emirayka/option-result'
import {ParserError} from './error'

export type ParserResult<I, O> = Result<[I, O], [I, ParserError]>
export type Parser<I, O> = (input: I) => ParserResult<I, O>
