import { GoABDatePickerOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-date-picker",
  template: ` <goa-date-picker
    [attr.name]="name"
    [attr.value]="value"
    [attr.min]="min"
    [attr.max]="max"
    [attr.error]="error"
    [attr.testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_change)="_onChange($event)"
  >
  </goa-date-picker>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GoABDatePicker,
    }
  ]
})
export class GoABDatePicker implements ControlValueAccessor {
  @Input() name?: string;
  @Input() value?: Date | string;
  @Input() min?: Date | string;
  @Input() max?: Date | string;
  @Input() error?: boolean;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABDatePickerOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABDatePickerOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.value);
  }

  // ControlValueAccessor

  private fcChange?: (value: Date | string) => void;
  private fcTouched?: () => {};
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  writeValue(value: Date | string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fcTouched = fn
  }
}
