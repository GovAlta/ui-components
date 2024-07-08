import { NgForOf } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-dropdown-item",
  template: `
    <goa-dropdown-item
      [attr.data-testid]="testId"
      [value]="value"
      [label]="label"
      [attr.filter]="filter"
      [attr.name]="name"
    >
    </goa-dropdown-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABDropdownItem {
  @Input() value?: string;
  @Input() filter?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() testId?: string;
}


