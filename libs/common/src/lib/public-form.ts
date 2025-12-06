import { FieldValidator } from "./validators";

export type PFState = {
  data: Record<string, unknown>;
  dataBuffer: Record<string, unknown>;
  history: string[];
};

export type PFOutline = Record<
  string,
  {
    next: string | ((state: PFState) => string);
    validators: Record<string, FieldValidator[]>;
  }
>;
