import { GoABCheckboxOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-checkbox",
  template: `<goa-checkbox
    [attr.name]="name"
    [attr.checked]="checked"
    [attr.disabled]="disabled"
    [attr.error]="error"
    [attr.text]="text"
    [attr.value]="value"
    [attr.testid]="testId"
    [attr.arialabel]="ariaLabel"
    [attr.description]="description"
    [attr.testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_change)="_onChange($event)"
  >
    <ng-content />
  </goa-checkbox>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GoABCheckbox,
    }
  ]
})
export class GoABCheckbox implements ControlValueAccessor {
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

  @Output() onChange = new EventEmitter<GoABCheckboxOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABCheckboxOnChangeDetail>).detail;
    this.onChange.emit(detail)
    this.markAsTouched();
    this.fcChange?.(detail.binding === "check" ? detail.checked : (detail.value || ""));
  }

  // ControlValueAccessor

  private fcChange?: (value: string | boolean) => void;
  private fcTouched?: () => {};
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }
  writeValue(value: string | boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.fcTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

