export const isAlphanumeric = (char: string): boolean => {
  if (char.length !== 1) {
    throw new Error('isAlphanumeric: called with string of length that does not equal to 1')
  }

  const code = char.charCodeAt(0)

  return (code > 47 && code < 58) ||
    (code > 64 && code < 91) ||
    (code > 96 && code < 123)
}
