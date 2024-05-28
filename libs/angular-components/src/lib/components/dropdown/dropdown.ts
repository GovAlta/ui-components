import { GoABDropdownOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-dropdown",
  template: `
    <goa-dropdown
      [name]="name"
      [value]="value"
      [label]="label"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-dropdown>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABDropdown {
  @Input() name?: string;
  @Input() value?: string;
  @Input() label?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABDropdownOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABDropdownOnChangeDetail>).detail;
    this.onChange.emit(detail)
  }
}
