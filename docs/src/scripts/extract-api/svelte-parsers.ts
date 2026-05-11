export {
  buildJSDocMap,
  extractTagName,
  extractTypeAliases,
  extractValidators,
} from "./svelte-jsdoc-tag-helpers";

export { extractEvents, extractProps, extractSlots } from "./svelte-prop-event-helpers";

export type { ValidatorInfo } from "./svelte-jsdoc-tag-helpers";
export type { ParsedPropRaw } from "./svelte-prop-event-helpers";
