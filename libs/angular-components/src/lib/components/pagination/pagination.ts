import {
  GoabPaginationOnChangeDetail,
  GoabPaginationVariant,
  Spacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-pagination",
  template: `
    @if (isReady) {
      <goa-pagination
        [attr.version]="version"
        [attr.itemcount]="itemCount"
        [attr.perpagecount]="perPageCount"
        [attr.pagenumber]="pageNumber"
        [attr.variant]="variant"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_change)="_onChange($event)"
      >
      </goa-pagination>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Help users navigation between multiple pages or screens as part of a set. */
export class GoabPagination extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  /** @required Total number of data items within all pages. */
  @Input({ required: true }) itemCount!: number;
  /** @required The current page being viewed (non-zero based). */
  @Input({ required: true }) pageNumber!: number;
  /** Number of data items shown per page. @default 10 */
  @Input() perPageCount?: number = 10;
  /** Controls which nav controls are visible. @default "all" */
  @Input() variant?: GoabPaginationVariant = "all";

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the page changes. Emits the new page number as part of the change detail. */
  @Output() onChange = new EventEmitter<GoabPaginationOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabPaginationOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
