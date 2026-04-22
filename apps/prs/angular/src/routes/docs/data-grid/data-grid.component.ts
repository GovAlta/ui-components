import { Component } from "@angular/core";
import {
  GoabDataGrid, GoabTable, GoabBadge, GoabButton, GoabContainer,
  GoabCheckbox, GoabBlock, GoabMenuButton, GoabMenuAction,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-data-grid",
  templateUrl: "./data-grid.component.html",
  imports: [
    GoabDataGrid, GoabTable, GoabBadge, GoabButton, GoabContainer,
    GoabCheckbox, GoabBlock, GoabMenuButton, GoabMenuAction,
  ],
})
export class DocsDataGridComponent {}
