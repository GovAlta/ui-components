import { GoabTableSortDirection } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-table-sort-header",
  template: `
    @if (isReady) {
      <goa-table-sort-header [attr.name]="name" [attr.direction]="direction">
        <ng-content />
      </goa-table-sort-header>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
