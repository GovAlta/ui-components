import { GoabIconType, GoabInputAutoCapitalize, GoaInputOnBlurDetail, GoabInputOnChangeDetail, GoabInputOnFocusDetail, GoabInputOnKeyPressDetail, GoabInputType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-input",
  template: `
    <goa-input
      [attr.type]="type"
      [attr.name]="name"
      [attr.focused]="focused"
      [attr.value]="value"
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
      [attr.handletrailingiconclick]="!!_onTrailingIconClick"
      (_trailingIconClick)="_onTrailingIconClick($event)"
      (_change)="_onChange($event)"
      (_focus)="_onFocus($event)"
      (_blur)="_onBlur($event)"
      (_keypress)="_onKeyPress($event)"
    >
      <ng-content/>
    </goa-input>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabInput),
    }
  ]
})
export class GoabInput implements ControlValueAccessor, OnInit {
  @Input() type?: GoabInputType = "text";
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
  @Input() value?: string | null = "";
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() ariaLabelledBy?: string;
  @Input() mt?: Spacing;
  @Input() mr?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;

  @Output() onTrailingIconClick = new EventEmitter();
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<GoaInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  private handleTrailingIconClick = false;

  ngOnInit() {
    this.handleTrailingIconClick = this.onTrailingIconClick.observed;
  }

  _onTrailingIconClick(_: Event) {
    console.log("in the click")
    if (this.handleTrailingIconClick) {
      this.onTrailingIconClick.emit();
    }
  }

  _onChange(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnChangeDetail>).detail;
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }

  _onKeyPress(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail
    this.onKeyPress.emit(detail);

    this.fcTouched?.();
  }

  _onFocus(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = (e as CustomEvent<GoaInputOnBlurDetail>).detail
    this.onBlur.emit(detail);
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
    this.fcTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
