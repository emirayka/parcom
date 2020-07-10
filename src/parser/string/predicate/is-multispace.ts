export const isMultiSpace = (char: string): boolean => {
  if (char.length !== 1) {
    throw new Error('isMultiSpace: called with string of length that does not equal to 1')
  }

  const code = char.charCodeAt(0)

  return (code === 9 || code === 10 || code === 13 || code === 32)
}
