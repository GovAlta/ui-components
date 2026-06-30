export type TransformFn = (input: string) => string;

export const lowercase: TransformFn = (input) => input.toLowerCase();

export const kebab: TransformFn = (input) =>
  input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
