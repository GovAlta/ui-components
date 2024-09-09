import { GoabPaginationOnChangeDetail, GoabPaginationVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-pagination",
  template: `
    <goa-pagination
      [attr.itemcount]="itemCount"
      [attr.perpagecount]="perPageCount"
      [attr.pagenumber]="pageNumber"w
      [attr.variant]="variant"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
    </goa-pagination>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPagination {
  @Input({ required: true }) itemCount!: number;
  @Input({ required: true }) pageNumber!: number;
  @Input() perPageCount?: number = 10;
  @Input() variant?: GoabPaginationVariant = "all";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabPaginationOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabPaginationOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
