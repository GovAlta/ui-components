import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-dropdown-item",
  template: `
    <goa-dropdown-item
      *ngIf="isReady"
      [value]="value"
      [label]="label"
      [attr.filter]="filter"
      [attr.name]="name"
      [attr.mount]="mountType"
    >
    </goa-dropdown-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabDropdownItem implements OnInit {
  @Input() value?: string;
  @Input() filter?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() mountType?: GoabDropdownItemMountType;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
