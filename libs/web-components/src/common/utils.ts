export function isTruthy(value: string): boolean {
  return !['', 'false'].includes(value);
}
