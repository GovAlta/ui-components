import type { Message } from "../../common/context-store";

export const PROP_CHANGE = "prop-change";
export const OPTION_CHANGE = "option-change";

export interface RadioMessage extends Message {
  type: "prop-change" | "option-change";
  value: string;
  disabled?: boolean;
  error?: boolean;
}
