import { ABGovIconType, ABGovInputOnBlurDetail, ABGovInputOnChangeDetail, ABGovInputOnFocusDetail, ABGovInputOnKeyPressDetail, ABGovInputType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-input",
  template: `
    <goa-input
      [type]="type"
      [name]="name"
      [value]="value"
      [autocapitalize]="autoCapitalize"
      [placeholder]="placeholder"
      [leadingicon]="leadingIcon"
      [trailingicon]="trailingIcon"
      [variant]="variant"
      [disabled]="disabled"
      [focused]="focused"
      [readonly]="readonly"
      [error]="error"
      [testId]="testId"
      [width]="width"
      [arialabel]="ariaLabel"
      [arialabelledby]="ariaLabelledBy"
      [min]="min"
      [max]="max"
      [step]="step"
      [prefix]="prefix"
      [suffix]="suffix"
      [debounce]="debounce"
      [maxlength]="maxLength"
      [id]="id"
      [mt]="mt"
      [mr]="mr"
      [mb]="mb"
      [ml]="ml"
      (ontrailingiconclick)="_onTrailingIconClick($event)"
      (onchange)="_onChange($event)"
      (onfocus)="_onFocus($event)"
      (onblur)="_onBlur($event)"
      (onkeypress)="_onKeyPress($event)"
    >
    </goa-input>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovInput {
  @Input() type?: ABGovInputType = "text";
  @Input() name?: string;
  @Input() value?: string = "";
  @Input() autoCapitalize?: boolean;
  @Input() placeholder?: string;
  @Input() leadingIcon?: ABGovIconType;
  @Input() trailingIcon?: ABGovIconType;
  @Input() variant?: string;
  @Input() disabled?: boolean;
  @Input() focused?: boolean;
  @Input() readonly?: boolean;
  @Input() error?: boolean;
  @Input() testId?: string;
  @Input() width?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() debounce?: boolean;
  @Input() maxLength?: number;
  @Input() id?: string;
  @Input() mt?: Spacing;
  @Input() mr?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;

  @Output() onTrailingIconClick = new EventEmitter();
  @Output() onFocus = new EventEmitter<ABGovInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<ABGovInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<ABGovInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<ABGovInputOnChangeDetail>();

  _onTrailingIconClick(_: Event) {
    this.onTrailingIconClick.emit();
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<ABGovInputOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }

  _onKeyPress(e: Event) {
    const detail = (e as CustomEvent<ABGovInputOnKeyPressDetail>).detail
    this.onKeyPress.emit(detail);
  }

  _onFocus(e: Event) {
    const detail = (e as CustomEvent<ABGovInputOnFocusDetail>).detail
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = (e as CustomEvent<ABGovInputOnBlurDetail>).detail
    this.onBlur.emit(detail);
  }
}
