import { GoABTableVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

type GoABTableOnSortDetail = {
  sortBy: string;
  sortDir: number;
}

@Component({
  standalone: true,
  selector: "goab-table",
  template: `
    <goa-table
      [width]="width"
      [variant]="variant"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_sort)="_onSort($event)"
    >
      <ng-content />
    </goa-table>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABTable {
  @Input() width?: string;
  @Input() variant?: GoABTableVariant;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onSort = new EventEmitter<GoABTableOnSortDetail>();

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoABTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
