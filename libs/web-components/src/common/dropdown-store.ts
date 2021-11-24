import { writable } from 'svelte/store';

// Stores

export const messageChannel = writable<{ [id: string]: Message }>({})

// Types

export interface Message {
  tag?: string;
  payload?: FilterChangePayload | DropdownActionPayload | DropdownInitPayload;
}

export interface FilterChangePayload {
  type: "FilterChange";
  filter: string;
}

export interface DropdownActionPayload {
  type: "DropDownAction";
  action: "select" | "deselect";
  multiSelect?: boolean;
  label: string;
  value: string;
}

export interface DropdownInitPayload {
  type: "DropDownInit";
  values: string[];
  multiSelect: boolean;
}
