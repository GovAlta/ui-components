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
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

export interface IgnoreMe {
  ignore: string;
}

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
      (_keyPress)="_onKeyPress($event)"
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
      useExisting: forwardRef(() => GoabInput),
    },
  ],
})
export class GoabInput extends GoabControlValueAccessor implements OnInit {
  @Input() type?: GoabInputType = "text";
  @Input() name?: string;
  @Input() debounce?: number;
  @Input() autoCapitalize?: GoabInputAutoCapitalize;
  @Input() placeholder?: string;
  @Input() leadingIcon?: GoabIconType;
  @Input() trailingIcon?: GoabIconType;
  @Input() variant?: string;
  @Input() focused?: boolean;
  @Input() readonly?: boolean;
  @Input() width?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() ariaLabel?: string;
  @Input() maxLength?: number;
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() step?: number;
  @Input() ariaLabelledBy?: string;
  @Input() trailingIconAriaLabel?: string;

  @Output() onTrailingIconClick = new EventEmitter();
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<GoaInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  private handleTrailingIconClick = false;

  ngOnInit() {
    this.handleTrailingIconClick = this.onTrailingIconClick.observed;
    if (typeof this.value === "number") {
      console.warn("For numeric values use goab-input-number.");
    }
  }

  _onTrailingIconClick(_: Event) {
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
    const detail = (e as CustomEvent<GoabInputOnKeyPressDetail>).detail;
    this.onKeyPress.emit(detail);

    this.fcTouched?.();
  }

  _onFocus(e: Event) {
    this.markAsTouched();
    const detail = (e as CustomEvent<GoabInputOnFocusDetail>).detail;
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = (e as CustomEvent<GoaInputOnBlurDetail>).detail;
    this.onBlur.emit(detail);
  }
}
