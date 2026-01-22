import { GoabTableOnSortDetail, GoabTableVariant } from "@abgov/ui-components-common";
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
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goabx-table",
  template: `
    <goa-table
      *ngIf="isReady"
      [attr.version]="version"
      [attr.width]="width"
      [attr.variant]="variant"
      [attr.striped]="striped"
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
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxTable extends GoabBaseComponent implements OnInit {
  isReady = false;
  version = "2";
  @Input() width?: string;
  @Input() variant?: GoabTableVariant;
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

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
