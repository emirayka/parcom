type CharCodeObject = {
  [key: string]: boolean
}

export const makeCharCodeObject = (s: string): CharCodeObject => {
  const o: CharCodeObject = {}
  
  for (let i = 0; i < 128; i++) {
    const key: string = String.fromCharCode(i)
    o[key] = false
  }

  for (const char of s) {
    o[char] = true
  }
  
  return o
}