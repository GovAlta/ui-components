import { GoabTableOnSortDetail, GoabTableVariant } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTable extends GoabBaseComponent {
  @Input() width?: string;
  @Input() variant?: GoabTableVariant;

  @Output() onSort = new EventEmitter<GoabTableOnSortDetail>();

  _onSort(e: Event) {
    const detail = (e as CustomEvent<GoabTableOnSortDetail>).detail;
    this.onSort.emit(detail);
  }
}
