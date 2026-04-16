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
export class GoabPagination extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  @Input({ required: true }) itemCount!: number;
  @Input({ required: true }) pageNumber!: number;
  @Input() perPageCount?: number = 10;
  @Input() variant?: GoabPaginationVariant = "all";

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
