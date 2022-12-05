import type { Message } from "../../common/context-store";

export interface SelectMessage extends Message {
  type: "bind";
  value: string;
  label: string;
}
