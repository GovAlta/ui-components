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
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-pagination",
  template: `
    @if (isReady) {
      <goa-pagination
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
export class GoabPagination extends GoabBaseComponent implements OnInit {
  isReady = false;
  /**
   * Total number of data items within all pages.
   * @required
   */
  @Input({ required: true }) itemCount!: number;
  /**
   * The current page being viewed (non-zero based).
   * @required
   */
  @Input({ required: true }) pageNumber!: number;
  /**
   * Number of data items shown per page.
   * @default 10
   */
  @Input() perPageCount?: number = 10;
  /**
   * Controls which nav controls are visible.
   * @default "all"
   */
  @Input() variant?: GoabPaginationVariant = "all";

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabPaginationOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabPaginationOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
