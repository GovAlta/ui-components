import { FieldValidator } from "./validators";

export type PFState = {
  data: Record<string, Record<string, string>>;
  dataBuffer: Record<string, string>;
  history: string[];
};

export type PFOutline = Record<
  string,
  {
    next: string | ((state: PFState) => string);
    validators: Record<string, FieldValidator[]>;
  }
>;
