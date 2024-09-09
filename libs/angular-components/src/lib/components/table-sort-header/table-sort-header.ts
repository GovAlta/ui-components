import { GoabTableSortDirection } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-table-sort-header",
  template: `
    <goa-table-sort-header
      [attr.name]="name"
      [attr.direction]="direction"
    >
      <ng-content />
    </goa-table-sort-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabTableSortHeader {
  @Input() name?: string;
  @Input() direction?: GoabTableSortDirection = "none";
}
