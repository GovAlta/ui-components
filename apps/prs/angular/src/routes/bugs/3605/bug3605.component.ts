import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabChip,
  GoabContainer,
  GoabDataGrid,
  GoabDetails,
  GoabDivider,
  GoabFilterChip,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabMicrositeHeader,
  GoabNotification,
  GoabTable,
  GoabTableSortHeader,
  GoabText,
  GoabTextArea,
  GoabTooltip,
} from "@abgov/angular-components";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3605",
  templateUrl: "./bug3605.component.html",
  imports: [
    CommonModule,
    GoabBadge,
    GoabBlock,
    GoabButton,
    GoabCheckbox,
    GoabChip,
    GoabContainer,
    GoabDataGrid,
    GoabDetails,
    GoabDivider,
    GoabFilterChip,
    GoabLink,
    GoabMenuAction,
    GoabMenuButton,
    GoabMicrositeHeader,
    GoabNotification,
    GoabTable,
    GoabTableSortHeader,
    GoabText,
    GoabTextArea,
    GoabTooltip,
  ],
})
export class Bug3605Component {
  sortablePeople = [
    { name: "Alice Johnson", role: "Developer", age: 32 },
    { name: "Bob Smith", role: "Designer", age: 28 },
    { name: "Carol White", role: "Manager", age: 45 },
    { name: "David Brown", role: "Analyst", age: 38 },
  ];

  onSort(detail: GoabTableOnSortDetail) {
    const by = detail.sortBy as "name" | "role" | "age";
    const dir = detail.sortDir;
    this.sortablePeople = [...this.sortablePeople].sort((a, b) => {
      if (a[by] < b[by]) return dir === 1 ? -1 : 1;
      if (a[by] > b[by]) return dir === 1 ? 1 : -1;
      return 0;
    });
  }
}
