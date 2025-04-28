import { GoabDatePickerOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ElementRef,
  HostListener,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-date-picker",
  template: ` <goa-date-picker
    [attr.name]="name"
    [attr.value]="formatValue(value)"
    [attr.min]="min"
    [attr.max]="max"
    [attr.error]="error"
    [attr.disabled]="disabled"
    [attr.relative]="relative"
    [attr.testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    [attr.width]="width"
    (_change)="_onChange($event)"
  >
  </goa-date-picker>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabDatePicker),
    },
  ],
})
export class GoabDatePicker implements ControlValueAccessor {
  @Input() name?: string;
  @Input() value?: Date | string | null | undefined;
  @Input() min?: Date | string;
  @Input() max?: Date | string;
  @Input() error?: boolean;
  @Input() disabled?: boolean;
  @Input() width?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabDatePickerOnChangeDetail>();

  formatValue(val: Date | string | null | undefined): string {
    if (!val) return "";

    if (val instanceof Date) {
      return val.toISOString();
    }

    return val;
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabDatePickerOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.value);
  }

  // ControlValueAccessor
  constructor(protected elementRef: ElementRef) {}

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener("disabledChange", ["$event.detail.disabled"])
  listenDisabledChange(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }

  private fcChange?: (value: Date | string | undefined) => void;
  private fcTouched?: () => unknown;
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  writeValue(value: Date | null): void {
    this.value = value;

    const datePickerEl = this.elementRef?.nativeElement?.querySelector("goa-date-picker");

    if (datePickerEl) {
      if (!value) {
        datePickerEl.setAttribute("value", "");
      } else {
        datePickerEl.setAttribute(
          "value",
          value instanceof Date ? value.toISOString() : value,
        );
      }
    }
  }

  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fcTouched = fn;
  }
}
