import { GoabTableOnSortDetail, GoabTableVariant } from "@abgov/ui-components-common";
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
  selector: "goab-table",
  template: `
    @if (isReady) {
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
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTable extends GoabBaseComponent implements OnInit {
  isReady = false;
  /**
   * Width of the table. By default it will fit the enclosed content.
   * @default ""
   */
  @Input() width?: string;
  /**
   * A relaxed variant of the table with more vertical padding for the cells.
   * @default "normal"
   */
  @Input() variant?: GoabTableVariant;

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

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
