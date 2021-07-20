import { createContext } from 'react';
import { GoAOptionProps } from './option/option.component'

export class DropdownOption {
  value: string;
  label: string;
  selected: boolean;

  constructor(val: string, label: string, sel: boolean) {
    this.value = val;
    this.label = label;
    this.selected = sel;
  }
}

/** Used to store the options in the dropdown */
export interface KeyOptionPair {
  [value: string]: DropdownOption
}

/** Interface for the context for the dropdown and its children */
export interface DropdownContextProps {
  selectionChanged?: (option: GoAOptionProps) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DropdownContext = createContext<DropdownContextProps>({
});
