import {
  GoabIconType,
  GoabInputAutoCapitalize,
  GoaInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputType,
  Spacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-input-number",
  template: `
    <goa-input
      [attr.type]="type"
      [attr.name]="name"
      [attr.focused]="focused"
      [attr.value]="value !== null ? value : ''"
      [attr.autocapitalize]="autoCapitalize"
      [attr.placeholder]="placeholder"
      [attr.leadingicon]="leadingIcon"
      [attr.trailingicon]="trailingIcon"
      [attr.variant]="variant"
      [disabled]="disabled"
      [attr.readonly]="readonly"
      [attr.error]="error"
      [attr.data-testid]="testId"
      [attr.width]="width"
      [attr.arialabel]="ariaLabel"
      [attr.arialabelledby]="ariaLabelledBy"
      [attr.min]="min"
      [attr.max]="max"
      [attr.step]="step"
      [attr.prefix]="prefix"
      [attr.suffix]="suffix"
      [attr.debounce]="debounce"
      [attr.maxlength]="maxLength"
      [attr.id]="id"
      [attr.mt]="mt"
      [attr.mr]="mr"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.handletrailingiconclick]="handleTrailingIconClick"
      [attr.textalign]="textAlign"
      (_trailingIconClick)="_onTrailingIconClick($event)"
      (_change)="_onChange($event)"
      (_focus)="_onFocus($event)"
      (_blur)="_onBlur($event)"
      (_keypress)="_onKeyPress($event)"
      [attr.trailingiconarialabel]="trailingIconAriaLabel"
    >
      <ng-content />
    </goa-input>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // Use forwardRef with the new class name
      useExisting: forwardRef(() => GoabInputNumber),
    },
  ],
})
export class GoabInputNumber implements ControlValueAccessor, OnInit {
  @Input() type: GoabInputType = "number";
  @Input() name?: string;
  @Input() id?: string;
  @Input() debounce?: number;
  @Input() disabled?: boolean;
  @Input() autoCapitalize?: GoabInputAutoCapitalize;
  @Input() placeholder?: string;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() variant?: string;
  @Input() focused?: boolean;
  @Input() readonly?: boolean;
  @Input() error?: boolean;
  @Input() width?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() testId?: string;
  @Input() ariaLabel?: string;
  @Input() maxLength?: number;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() step?: number;
  @Input() ariaLabelledBy?: string;
  @Input() mt?: Spacing;
  @Input() mr?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() trailingIconAriaLabel?: string;
  @Input() textAlign?: "left" | "right" = "right"; // Default to right for numbers

  @Input() value: number | null = null;

  @Output() onTrailingIconClick = new EventEmitter<void>(); // Keep void type
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<GoaInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  handleTrailingIconClick = false;

  ngOnInit() {
    this.handleTrailingIconClick = this.onTrailingIconClick.observed;
  }

  _onTrailingIconClick(_: Event) {
    if (this.handleTrailingIconClick) {
      this.onTrailingIconClick.emit();
    }
  }

  _onChange(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;

    const stringValue = detail.value;
    let numericValue: number | null = null;

    if (stringValue !== null && stringValue.trim() !== "") {
      const parsed = parseFloat(stringValue);
      if (!isNaN(parsed)) {
        numericValue = parsed;
      }
    }

    this.value = numericValue;

    this.fcChange?.(numericValue);

    this.onChange.emit(detail);
  }

  _onKeyPress(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
    this.onKeyPress.emit(detail);
  }

  _onFocus(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoaInputOnBlurDetail>).detail;
    this.onBlur.emit(detail);
  }

  private fcChange?: (value: number | null) => void;
  private fcTouched?: () => void; // Changed type to void for consistency
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  writeValue(value: number | null): void {
    this.value = value === undefined ? null : value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.fcChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.fcTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}