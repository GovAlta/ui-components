import { ABGovCheckboxOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-checkbox",
  template: `<goa-checkbox
    [name]="name"
    [checked]="checked"
    [disabled]="disabled"
    [error]="error"
    [text]="text"
    [value]="value"
    [testid]="testId"
    [arialabel]="ariaLabel"
    [description]="description"
    [testid]="testId"
    [mt]="mt"
    [mb]="mb"
    [ml]="ml"
    [mr]="mr"

    (_change)="_onChange($event)"
  >
    <ng-content />
  </goa-checkbox>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovCheckbox {
  @Input() name?: string;
  @Input() checked?: boolean;
  @Input() disabled?: boolean;
  @Input() error?: boolean;
  @Input() text?: string;
  @Input() value?: string | number | boolean;
  @Input() testId?: string;
  @Input() ariaLabel?: string;
  @Input() description?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<ABGovCheckboxOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<ABGovCheckboxOnChangeDetail>).detail;
    this.onChange.emit(detail)
  }
}

