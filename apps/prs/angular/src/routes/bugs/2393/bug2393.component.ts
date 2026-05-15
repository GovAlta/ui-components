import { Component } from "@angular/core";
import {
  GoabTable,
  GoabBadge,
  GoabPopover,
  GoabButton,
  GoabTableSortHeader,
  GoabTableOnSortDetail,
} from "@abgov/angular-components";

@Component({
  selector: "abgov-bug2393",
  standalone: true,
  templateUrl: "./bug2393.component.html",
  styleUrls: ["./bug2393.component.css"],
  imports: [GoabTable, GoabTableSortHeader, GoabBadge, GoabPopover, GoabButton],
})
export class Bug2393Component {
  handleClick(event: Event) {
    console.log("Click event: ", event);
  }

  handleSort(event: GoabTableOnSortDetail) {
    console.log("Sorting Direction: ", event.sortDir);
    console.log("Sorting By: ", event.sortBy);
  }
}
