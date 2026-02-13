import { AnyValidator } from "./validators";

// TODO: right now the value is a string, but for the subform we need to allow for an array
export type PFPage = {
  _id?: `${string}-${string}-${string}-${string}-${string}` | undefined;
  [key: string]: string | undefined;
};

export type PFState = {
  data: Record<string, PFPage | PFPage[]>;
  dataBuffer: PFPage; // Record<string, string>;
  history: string[];
};

export type PFSummary = Omit<PFState, "dataBuffer"> & {
  outline: Omit<PFOutline, "next" | "validators">;
};

export type PFField = {
  label: string;
  formatter?: (input: string) => string;
  hideInSummary: "always" | "ifBlank" | "never";
  type?: "file" | "text"; // Optional field type for special rendering (e.g., file links in summary)
};

export type PFOutline = Record<string, PFOutlineItem>;

export type PFOutlineItem = {
  subform: boolean;
  props: Record<string, string>;
  fields: Record<string, PFField>;
  summarize?: (page: PFPage) => Record<string, string>;
  next: string | ((state: PFState) => string);
  validators: Record<string, AnyValidator[]>;
};
