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

export class ParserErrorStab {
  public readonly kind: 'stab' = 'stab'
}

export type ParserError = ParserErrorIncomplete |
  ParserErrorFailure |
  ParserErrorTag |
  ParserErrorAlt |
  ParserErrorPair |
  ParserErrorSeparatedPair |
  ParserErrorMap |
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
  ParserErrorStab

export const isIncomplete = (error: ParserError): error is ParserErrorIncomplete => {
  return error.kind === 'incomplete'
}

export const isFailure = (error: ParserError): error is ParserErrorFailure => {
  return error.kind === 'failure'
}
