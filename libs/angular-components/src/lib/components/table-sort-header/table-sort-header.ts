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
export class GoabTableSortHeader implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  @Input() name?: string;
  @Input() direction?: GoabTableSortDirection = "none";
  @Input() sortOrder?: GoabTableSortOrder;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
