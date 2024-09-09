import { GoabRadioGroupOnChangeDetail, GoabRadioGroupOrientation, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-radio-group",
  template: `
    <goa-radio-group
      [attr.name]="name"
      [attr.value]="value"
      [disabled]="disabled"
      [attr.orientation]="orientation"
      [attr.error]="error"
      [attr.arialabel]="ariaLabel"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-radio-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabRadioGroup),
    },
  ],
})
export class GoabRadioGroup implements ControlValueAccessor {
  @Input() name?: string;
  @Input() value?: string;
  @Input() disabled?: boolean;
  @Input() orientation?: GoabRadioGroupOrientation;
  @Input() error?: boolean;
  @Input() ariaLabel?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabRadioGroupOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabRadioGroupOnChangeDetail>).detail;
    this.markAsTouched();
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }

  // ControlValueAccessor

  private fcChange?: (value: string) => void;
  private fcTouched?: () => unknown;
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fcTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
