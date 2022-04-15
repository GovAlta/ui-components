import type { Message } from "../../common/context-store";

export const INIT = "init";
export const INIT_RESPONSE = "init-response";
export const CHANGE = "change";
export const SELECT = "select";
export const FILTER = "filter";

export interface BindSelectedMessage extends Message {
  type: "change";
  multiSelect: boolean;
  values: string[];
}

export interface ChangeSelectedMessage extends Message {
  type:  "init-response" | "select";
  value: string;
  label: string;
  selected: boolean;
}

export interface ChangeFilterMessage extends Message {
  type:  "filter";
  filter: string;
}
