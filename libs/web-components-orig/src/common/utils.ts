export function isTruthy(value: string): boolean {
  if (value === 'false') {
    return false;
  }
  return !!value;
}

export function isFalsy(value: string): boolean {
  return !isTruthy(value);
}
