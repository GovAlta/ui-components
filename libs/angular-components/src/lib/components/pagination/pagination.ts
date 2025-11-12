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
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-pagination",
  template: `
    <goa-pagination
      *ngIf="isReady"
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
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPagination extends GoabBaseComponent implements OnInit {
  isReady = false;
  @Input({ required: true }) itemCount!: number;
  @Input({ required: true }) pageNumber!: number;
  @Input() perPageCount?: number = 10;
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
