import { GoabTableSortDirection, GoabTableSortOrder } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-table-sort-header",
  template: `
    @if (isReady) {
      <goa-table-sort-header
        [attr.name]="name"
        [attr.direction]="direction"
        [attr.sort-order]="sortOrder"
      >
        <ng-content />
      </goa-table-sort-header>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A set of structured data that is easy for a user to scan, examine, and compare. */
export class GoabTableSortHeader implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Column name identifier for sorting. */
  @Input() name?: string;
  /** Sets the sort direction indicator. @default "none" */
  @Input() direction?: GoabTableSortDirection = "none";
  /** Sort order number for multi-column sort display ("1", "2", etc). */
  @Input() sortOrder?: GoabTableSortOrder;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
