import { GoabTableSortDirection } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-table-sort-header",
  template: `
    <goa-table-sort-header
      *ngIf="isReady"
      [attr.name]="name"
      [attr.direction]="direction"
    >
      <ng-content />
    </goa-table-sort-header>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabTableSortHeader implements OnInit {
  isReady = false;
  @Input() name?: string;
  @Input() direction?: GoabTableSortDirection = "none";

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
