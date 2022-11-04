import type { Message } from "../../common/context-store";

export const BIND = "bind";

export interface RadioMessage extends Message {
  type: "bind";
  value: string;
  label: string;
}
