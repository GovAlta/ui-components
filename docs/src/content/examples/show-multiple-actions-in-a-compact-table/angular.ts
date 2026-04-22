import { Component } from "@angular/core";

interface TableRow {
  status: string;
  statusText: string;
  name: string;
  id: number;
}

@Component({
  selector: "app-show-multiple-actions-compact-table",
  templateUrl: "./angular.html",
})
export class ShowMultipleActionsCompactTableComponent {
  rows: TableRow[] = [
    {
      status: "information",
      statusText: "In progress",
      name: "Darlene Robertson",
      id: 45904,
    },
    { status: "default", statusText: "Inactive", name: "Floyd Miles", id: 47838 },
    { status: "success", statusText: "Active", name: "Kathryn Murphy", id: 34343 },
    { status: "important", statusText: "Recent", name: "Annette Black", id: 89897 },
    { status: "success", statusText: "Active", name: "Esther Howard", id: 12323 },
    { status: "success", statusText: "Active", name: "Jane Cooper", id: 56565 },
  ];
}
