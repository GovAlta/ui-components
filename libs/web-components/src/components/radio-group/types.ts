import type { Message } from "../../common/context-store";

export interface RadioMessage extends Message {
  type: "bind";
  value: string;
  label: string;
}
