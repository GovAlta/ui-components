type NumericSpacing =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

type TShirtSpacing =
  | "none"
  | "3xs"
  | "2xs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type Spacing = NumericSpacing | TShirtSpacing | null;

const conversions: Record<string, TShirtSpacing> = {
  "0": "none",
  "1": "3xs",
  "2": "2xs",
  "3": "xs",
  "4": "s",
  "5": "m",
  "6": "l",
  "7": "xl",
  "8": "2xl",
  "9": "3xl",
  "10": "4xl",
  "none": "none",
  "3xs": "3xs",
  "2xs": "2xs",
  "xs": "xs",
  "s": "s",
  "m": "m",
  "l": "l",
  "xl": "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  "4xl": "4xl",
};

/**
 * Allow for 0-10 values to be used along side the existing Spacing values
 */
function convertSpacing(size: Spacing): Spacing {
  if (!size) return "none";
  if (!Number.isInteger(+size)) {
    return size;
  }
  return conversions[size] || "none";
}

/**
 * import type { Spacing } from "../../common/types";
 * import { calculateMargin } from "../../common/types";
 *
 * export let mt: Spacing = null;
 * export let mr: Spacing = null;
 * export let mb: Spacing = null;
 * export let ml: Spacing = null;
 *
 * // add the following style attribute to the root element
 * style={calculateMargin(mt, mr, mb, ml)}
 */
export function calculateMargin(
  mt: Spacing,
  mr: Spacing,
  mb: Spacing,
  ml: Spacing,
) {
  mt = convertSpacing(mt);
  mb = convertSpacing(mb);
  ml = convertSpacing(ml);
  mr = convertSpacing(mr);
  return [
    mt && mt !== "none" && `margin-top:var(--goa-space-${mt});` || "",
    mr && mr !== "none" && `margin-right:var(--goa-space-${mr});` || "",
    mb && mb !== "none" && `margin-bottom:var(--goa-space-${mb});` || "",
    ml && ml !== "none" && `margin-left:var(--goa-space-${ml});` || "",
  ].join(" ");
}
