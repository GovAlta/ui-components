import { ABGovPaginationVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

export type ABGovPaginationOnChangeDetail = {
  page: number;
}

@Component({
  standalone: true,
  selector: "abgov-pagination",
  template: `
    <goa-pagination
      [itemcount]="itemCount"
      [perpagecount]="perPageCount"
      [pagenumber]="pageNumber"
      [variant]="variant"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
    >
    </goa-pagination>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovPagination {
  @Input({ required: true }) itemCount!: number;
  @Input({ required: true }) pageNumber!: number;
  @Input() perPageCount?: number = 10;
  @Input() variant?: ABGovPaginationVariant = "all";
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<ABGovPaginationOnChangeDetail>();

  _onChange(e: any) {
    const detail = (e as CustomEvent<ABGovPaginationOnChangeDetail>).detail;
    this.onChange.emit(detail)
  }
}
