import { FieldValidator } from "./validators";

export type PFState = {
  data: PFData;
  editPage: Record<string, unknown>;
  history: string[];
};

export type PFData = Record<string, Record<string, unknown>>;

export type PFOutline = Record<
  string,
  {
    next: string | (() => string);
    validators: Record<string, FieldValidator>;
  }
>;
