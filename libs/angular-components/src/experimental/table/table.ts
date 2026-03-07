import {
  GoabTableOnSortDetail,
  GoabTableOnMultiSortDetail,
  GoabTableSortMode,
  GoabTableVariant,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  booleanAttribute,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-table",
  template: `
    @if (isReady) {
      <goa-table
        [attr.version]="version"
        [attr.width]="width"
        [attr.variant]="variant"
        [attr.sort-mode]="sortMode"
        [attr.striped]="striped"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_sort)="_onSort($event)"
        (_multisort)="_onMultiSort($event)"
      >
        <table style="width: 100%;">
          <ng-content />
        </table>
      </goa-table>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxTable extends GoabBaseComponent implements OnInit {
  isReady = false;
  version = "2";
  @Input() width?: string;
  @Input() variant?: GoabTableVariant;
  @Input() sortMode?: GoabTableSortMode;
  @Input({ transform: booleanAttribute }) striped?: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onSort = new EventEmitter<GoabTableOnSortDetail>();
  @Output() onMultiSort = new EventEmitter<GoabTableOnMultiSortDetail>();

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }

  _onMultiSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnMultiSortDetail>).detail;
    this.onMultiSort.emit(detail);
  }
}
