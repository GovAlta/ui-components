import { GoABDatePickerOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-date-picker",
  template: `
    <goa-date-picker
      [name]="name"
      [value]="value"
      [min]="min"
      [max]="max"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
    >
    </goa-date-picker>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABDatePicker {
  @Input() name?: string;
  @Input() value?: Date | string;
  @Input() min?: Date | string;
  @Input() max?: Date | string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABDatePickerOnChangeDetail>();



  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABDatePickerOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
