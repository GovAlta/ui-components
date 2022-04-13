export interface RadioMessage {
  type: "propChange" | "optionChange";
  value: string;
  disabled?: boolean;
  error?: boolean;
}
