import {ParserResult} from '@/types/parser'

export class ParserErrorIncomplete {
  private readonly amount: number
  public readonly kind: 'incomplete' = 'incomplete'

  constructor(amount: number) {
    this.amount = amount
  }

  getAmount(): number {
    return this.amount
  }
}

export class ParserErrorFailure {
  private readonly message: string
  public readonly kind: 'failure' = 'failure'

  constructor(message: string) {
    this.message = message
  }

  getMessage(): string {
    return this.message
  }
}

export class ParserErrorAlt {
  public readonly kind: 'alt' = 'alt'
}

export class ParserErrorTag {
  public readonly kind: 'tag' = 'tag'
}

export class ParserErrorPair {
  public readonly kind: 'pair' = 'pair'
}

export class ParserErrorSeparatedPair {
  public readonly kind: 'separated-pair' = 'separated-pair'
}

export class ParserErrorMap {
  public readonly kind: 'map' = 'map'
}

export class ParserErrorMapOpt {
  public readonly kind: 'map-opt' = 'map-opt'
}

export class ParserErrorNot {
  public readonly kind: 'not' = 'not'
}

export class ParserErrorTake {
  public readonly kind: 'take' = 'take'
}

export class ParserErrorTakeTill {
  public readonly kind: 'take-till' = 'take-till'
}

export class ParserErrorTakeTill1 {
  public readonly kind: 'take-till1' = 'take-till1'
}

export class ParserErrorTakeTillMN {
  public readonly kind: 'take-till-m-n' = 'take-till-m-n'
}

export class ParserErrorTakeWhile {
  public readonly kind: 'take-while' = 'take-while'
}

export class ParserErrorTakeWhile1 {
  public readonly kind: 'take-while1' = 'take-while1'
}

export class ParserErrorTakeWhileMN {
  public readonly kind: 'take-while-m-n' = 'take-while-m-n'
}

export class ParserErrorComplete {
  public readonly kind: 'complete' = 'complete'
}

export class ParserErrorOpt {
  public readonly kind: 'opt' = 'opt'
}

export class ParserErrorPeek {
  public readonly kind: 'peek' = 'peek'
}

export class ParserErrorMany0 {
  public readonly kind: 'many0' = 'many0'
}

export class ParserErrorMany1 {
  public readonly kind: 'many1' = 'many1'
}

export class ParserErrorManyMN {
  public readonly kind: 'many-m-n' = 'many-m-n'
}

export class ParserErrorMany0Count {
  public readonly kind: 'many0-count' = 'many0-count'
}

export class ParserErrorMany1Count {
  public readonly kind: 'many1-count' = 'many1-count'
}

export class ParserErrorFoldMany0 {
  public readonly kind: 'fold-many0' = 'fold-many0'
}

export class ParserErrorFoldMany1 {
  public readonly kind: 'fold-many1' = 'fold-many1'
}

export class ParserErrorFoldManyMN {
  public readonly kind: 'fold-many-m-n' = 'fold-many-m-n'
}

export class ParserErrorCount {
  public readonly kind: 'count' = 'count'
}

export class ParserErrorSeparatedList {
  public readonly kind: 'separated-list' = 'separated-list'
}

export class ParserErrorSeparatedNonemptyList {
  public readonly kind: 'separated-nonempty-list' = 'separated-nonempty-list'
}

export class ParserErrorTerminated {
  public readonly kind: 'terminated' = 'terminated'
}

export class ParserErrorStab {
  public readonly kind: 'stab' = 'stab'
}

export class ParserErrorAlpha0 {
  public readonly kind: 'alpha0' = 'alpha0'
}

export class ParserErrorAlpha1 {
  public readonly kind: 'alpha1' = 'alpha1'
}

export class ParserErrorAlphanumeric0 {
  public readonly kind: 'alphanumeric0' = 'alphanumeric0'
}

export class ParserErrorAlphanumeric1 {
  public readonly kind: 'alphanumeric1' = 'alphanumeric1'
}

export class ParserErrorBinaryDigit0 {
  public readonly kind: 'binary-digit0' = 'binary-digit0'
}

export class ParserErrorBinaryDigit1 {
  public readonly kind: 'binary-digit1' = 'binary-digit1'
}

export class ParserErrorDigit0 {
  public readonly kind: 'digit0' = 'digit0'
}

export class ParserErrorDigit1 {
  public readonly kind: 'digit1' = 'digit1'
}

export class ParserErrorHexDigit0 {
  public readonly kind: 'hex-digit0' = 'hex-digit0'
}

export class ParserErrorHexDigit1 {
  public readonly kind: 'hex-digit1' = 'hex-digit1'
}

export class ParserErrorMultispace0 {
  public readonly kind: 'multispace0' = 'multispace0'
}

export class ParserErrorMultispace1 {
  public readonly kind: 'multispace1' = 'multispace1'
}

export class ParserErrorOctDigit0 {
  public readonly kind: 'oct-digit0' = 'oct-digit0'
}

export class ParserErrorOctDigit1 {
  public readonly kind: 'oct-digit1' = 'oct-digit1'
}

export class ParserErrorSpace0 {
  public readonly kind: 'space0' = 'space0'
}

export class ParserErrorSpace1 {
  public readonly kind: 'space1' = 'space1'
}

export type ParserError = ParserErrorIncomplete |
  ParserErrorFailure |
  ParserErrorTag |
  ParserErrorAlt |
  ParserErrorPair |
  ParserErrorSeparatedPair |
  ParserErrorMap |
  ParserErrorMapOpt |
  ParserErrorNot |
  ParserErrorTake |
  ParserErrorTakeTill |
  ParserErrorTakeTill1 |
  ParserErrorTakeTillMN |
  ParserErrorTakeWhile |
  ParserErrorTakeWhile1 |
  ParserErrorTakeWhileMN |
  ParserErrorComplete |
  ParserErrorOpt |
  ParserErrorPeek |
  ParserErrorMany0 |
  ParserErrorMany1 |
  ParserErrorManyMN |
  ParserErrorMany0Count |
  ParserErrorMany1Count |
  ParserErrorFoldMany0 |
  ParserErrorFoldMany1 |
  ParserErrorFoldManyMN |
  ParserErrorCount |
  ParserErrorSeparatedList |
  ParserErrorSeparatedNonemptyList |
  ParserErrorTerminated |
  ParserErrorAlpha0 |
  ParserErrorAlpha1 |
  ParserErrorAlphanumeric0 |
  ParserErrorAlphanumeric1 |
  ParserErrorBinaryDigit0 |
  ParserErrorBinaryDigit1 |
  ParserErrorDigit0 |
  ParserErrorDigit1 |
  ParserErrorHexDigit0 |
  ParserErrorHexDigit1 |
  ParserErrorMultispace0 |
  ParserErrorMultispace1 |
  ParserErrorOctDigit0 |
  ParserErrorOctDigit1 |
  ParserErrorSpace0 |
  ParserErrorSpace1 |
  ParserErrorStab

export const isIncomplete = (error: ParserError): error is ParserErrorIncomplete => {
  return error.kind === 'incomplete'
}

export const isFailure = (error: ParserError): error is ParserErrorFailure => {
  return error.kind === 'failure'
}

export const needToForward = <I, O>(result: ParserResult<I, O>): boolean => {
  if (result.isErr()) {
    const error: ParserError = result.unwrapErr()[1]

    return isIncomplete(error) || isFailure(error)
  }

  return false
}
