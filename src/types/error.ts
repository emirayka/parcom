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
  ParserErrorStab

export const isIncomplete = (error: ParserError): error is ParserErrorIncomplete => {
  return error.kind === 'incomplete'
}

export const isFailure = (error: ParserError): error is ParserErrorFailure => {
  return error.kind === 'failure'
}
