export type DataTableAction = {
  label: string;
  action: string;
  actionArg: string;
  actionArgs: Record<string, unknown>;
}

export type DataTableItem = {
  name: string;
  value: unknown;
}

export type DataTableRow = {
  el: HTMLElement;
  uid: string;
  actions: DataTableAction[];
  items: DataTableItem[];
}
