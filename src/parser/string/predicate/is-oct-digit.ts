export const isOctDigit = (char: string): boolean => {
  if (char.length !== 1) {
    throw new Error('isOctDigit: called with string of length that does not equal to 1')
  }

  const code = char.charCodeAt(0)

  return (code > 47 && code < 56)
}
