import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-dropdown-item",
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
export class ABGovDropdownItem {
  @Input() value?: string;
  @Input() filter?: string;
  @Input() label?: string;
}


