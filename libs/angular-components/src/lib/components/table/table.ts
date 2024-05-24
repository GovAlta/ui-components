import { ABGovTableVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

type ABGovTableOnSortDetail = {
  sortBy: string;
  sortDir: number;
}

@Component({
  standalone: true,
  selector: "abgov-table",
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
export class ABGovTable {
  @Input() width?: string;
  @Input() variant?: ABGovTableVariant;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onSort = new EventEmitter<ABGovTableOnSortDetail>();

  _onSort(e: Event) {
    const detail = (e as CustomEvent<ABGovTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
