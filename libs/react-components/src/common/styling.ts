export type Spacing =
  | "none"
  | "3xs"
  | "2xs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "2xl"
  | "3xl";
export interface Margins {
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
}
export type Direction = "row" | "column";
export type Alignment = "center" | "start" | "end";
