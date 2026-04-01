import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

import { GoabDropdownItemMountType } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-dropdown-item",
  template: ` @if (isReady) {
    <goa-dropdown-item
      [value]="value"
      [label]="label"
      [attr.filter]="filter"
      [attr.name]="name"
      [attr.mount]="mountType"
    >
    </goa-dropdown-item>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Present a list of options to the user to select from. */
export class GoabDropdownItem implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The value submitted when this item is selected. */
  @Input() value?: string;
  /** Text used to filter and match this item in typeahead search. */
  @Input() filter?: string;
  /** Display label for the dropdown item. */
  @Input() label?: string;
  /** Sets the name attribute of the dropdown item. */
  @Input() name?: string;
  /** Controls how the item is registered with the parent dropdown. */
  @Input() mountType?: GoabDropdownItemMountType;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
