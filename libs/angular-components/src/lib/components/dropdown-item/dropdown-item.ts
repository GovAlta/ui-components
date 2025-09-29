import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-dropdown-item",
  template: `
    <goa-dropdown-item
      [value]="value"
      [label]="label"
      [attr.filter]="filter"
      [attr.name]="name"
      [attr.mount]="mountType"
    >
    </goa-dropdown-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabDropdownItem {
  @Input() value?: string;
  @Input() filter?: string;
  @Input() label?: string;
  @Input() name?: string;
  @Input() mountType?: GoabDropdownItemMountType;
}


