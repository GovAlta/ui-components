export type Spacing = "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";

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
export function calculateMargin(mt: string, mr: string, mb: string, ml: string) {
  return [
    mt && `margin-top:var(--goa-spacing-${mt});`,
    mr && `margin-right:var(--goa-spacing-${mr});`,
    mb && `margin-bottom:var(--goa-spacing-${mb});`,
    ml && `margin-left:var(--goa-spacing-${ml});`,
  ].join(" ");
}

/**
 * This allows for :host styles that are dependent on component variables.
 * The injectCss function also allow for dynamic styling to be added where, within the component template, there 
 * is nothing that matches the selector, resulting in the selector being removed on compile.
 *
 * <script>
 *   let el: HTMLElement;
 *   onMount(() => injectCss(el, "span", { color: "red" }))
 * </script>
 * <div bind:this={el}>
 *   <span>Foobar</span>
 * </div
 *
 */
export function injectCss(el: HTMLElement, rootSelector: string, css: Record<string, string | number>, media?: string) {
  const style = document.createElement("style");
  const _css = Object.entries(css).map(entry => `${entry[0]}: ${entry[1]};`).join(" ");
  if (media) {
    style.innerHTML = `@media (${media}) { ${rootSelector} {${_css}} }`;
  } else {
    style.innerHTML = `${rootSelector} {${_css}}`;
  }
  el.appendChild(style);
}
