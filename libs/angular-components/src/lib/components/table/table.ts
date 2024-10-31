import { GoabTableOnSortDetail, GoabTableVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-table",
  template: `
    <goa-table
      [attr.width]="width"
      [attr.variant]="variant"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_sort)="_onSort($event)"
    >
      <table style="width: 100%;">
        <ng-content />
      </table>
    </goa-table>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabTable {
  @Input() width?: string;
  @Input() variant?: GoabTableVariant;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onSort = new EventEmitter<GoabTableOnSortDetail>();

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
