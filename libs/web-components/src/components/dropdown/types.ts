import type { Message } from "../../common/context-store";

export interface Option {
  name: string;
  label: string;
  value: string;
  selected: boolean;
}

export interface BindMessage extends Message {
  type: "bind";
  name: string;
  value: string;
  label: string;
}
