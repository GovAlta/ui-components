import { createContext } from 'react';

export class DropdownOption {
  value: string;
  description: string;
  selected: boolean;

  constructor(val: string, desc: string, sel: boolean) {
    this.value = val;
    this.description = desc;
    this.selected = sel;
  }
}

/** Used to store the options in the dropdown */
export interface KeyOptionPair {
  [value: string]: DropdownOption
}

/** Interface for the context for the dropdown and its children */
interface DropdownContextProps {
  options: KeyOptionPair;
  filter: string;
  matchesFilter?: (filter: string, value: string) => boolean;
  updateOption?: (value: string, option: DropdownOption) => void;
  selectionChanged?: (option: DropdownOption) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DropdownContext = createContext<DropdownContextProps>({
  options: {},
  filter: '',
  matchesFilter: () => true
});
