export interface BindSelectedMessage {
  type:  "onPropChange";
  multiSelect: boolean;
  values: string[];
}

export interface ChangeSelectedMessage {
  type:  "onChange";
  value: string;
  label: string;
  selected: boolean;
}

export interface ChangeFilterMessage {
  type:  "onFilterChange";
  filter: string;
}
