const dimensionRegex = /^[1-9]+[0-9]*(px|em|rem|ch|vh|vw|%)$/
export function isValidDimension(value: string): boolean {
  return dimensionRegex.test(value)
}
