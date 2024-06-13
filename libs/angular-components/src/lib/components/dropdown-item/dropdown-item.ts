import { NgForOf } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-dropdown-item",
  template: `
    <goa-dropdown-item
      [value]="value"
      [label]="label"
      [filter]="filter"
    >
    </goa-dropdown-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABDropdownItem {
  @Input() value?: string;
  @Input() filter?: string;
  @Input() label?: string;
}


