import {
  GoabIconType,
  GoabInputAutoCapitalize,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputType,
  Spacing,
} from "@abgov/ui-components-common";
import { NgTemplateOutlet } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  booleanAttribute,
  numberAttribute,
  TemplateRef,
  ChangeDetectorRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  standalone: true,
  selector: "goab-input-number",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
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
        <div slot="leadingContent">
          @if (leadingContent) {
            @if (getLeadingContentAsTemplate()) {
              <ng-container
                [ngTemplateOutlet]="getLeadingContentAsTemplate()"
              ></ng-container>
            } @else {
              {{ getLeadingContentAsString() }}
            }
          }
        </div>

        <ng-content />

        <div slot="trailingContent">
          @if (trailingContent) {
            @if (getTrailingContentAsTemplate()) {
              <ng-container
                [ngTemplateOutlet]="getTrailingContentAsTemplate()"
              ></ng-container>
            } @else {
              {{ getTrailingContentAsString() }}
            }
          }
        </div>
      </goa-input>
    }
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
  isReady = false;
  /** Sets the type of the input field. @default "number" */
  @Input() type: GoabInputType = "number";
  /** Name of input value that is received in the onChange event. */
  @Input() name?: string;
  /** Unique identifier for the input element. Used for label associations and accessibility. */
  @Input() id?: string;
  /** Debounce delay in milliseconds before firing the change event. 0 means no debounce. */
  @Input({ transform: numberAttribute }) debounce?: number;
  /** Disables this input. The input will not receive focus or events. */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** Controls whether and how text input is automatically capitalized as it is entered/edited by the user. This only works on mobile devices. */
  @Input() autoCapitalize?: GoabInputAutoCapitalize;
  /** Text displayed within the input when no value is set. */
  @Input() placeholder?: string;
  /** Icon shown to the left of the text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon shown to the right of the text. */
  @Input() trailingIcon?: GoabIconType;
  /** Sets the visual style variant. 'goa' for standard GoA styling, 'bare' for minimal styling. */
  @Input() variant?: string;
  /** Sets the cursor focus to the input. */
  @Input({ transform: booleanAttribute }) focused?: boolean;
  /** Makes the input readonly. */
  @Input({ transform: booleanAttribute }) readonly?: boolean;
  /** Sets the input to an error state. */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /** Sets the width of the text input area. */
  @Input() width?: string;
  /** @deprecated Use leadingContent slot instead. */
  @Input() prefix?: string;
  /** @deprecated Use trailingContent slot instead. */
  @Input() suffix?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Defines how the input will be translated for the screen reader. If not specified it will fall back to the name. */
  @Input() ariaLabel?: string;
  /** Defines the maximum number of characters (as UTF-16 code units) the user can enter into the input. */
  @Input({ transform: numberAttribute }) maxLength?: number;
  /** A string value that supports any number, or an ISO 8601 format if using the date or datetime type. */
  @Input() min?: string | number;
  /** A string value that supports any number, or an ISO 8601 format if using the date or datetime type. */
  @Input() max?: string | number;
  /** How much a number or date should change by. */
  @Input({ transform: numberAttribute }) step?: number;
  /** The aria-labelledby attribute identifies the element (or elements) that labels the input. */
  @Input() ariaLabelledBy?: string;
  /** Top margin. */
  @Input() mt?: Spacing;
  /** Right margin. */
  @Input() mr?: Spacing;
  /** Bottom margin. */
  @Input() mb?: Spacing;
  /** Left margin. */
  @Input() ml?: Spacing;
  /** Aria label for the trailing icon. Use only when the trailing icon is interactive. */
  @Input() trailingIconAriaLabel?: string;
  /** Sets the text alignment within the input field. @default "right" */
  @Input() textAlign?: "left" | "right" = "right"; // Default to right for numbers

  /** Bound to value. */
  @Input() value: number | null = null;
  /** @required Sets the leading content slot, accepting a string or template reference. */
  @Input() leadingContent!: string | TemplateRef<any>;
  /** @required Sets the trailing content slot, accepting a string or template reference. */
  @Input() trailingContent!: string | TemplateRef<any>;

  /** Emits when the trailing icon is clicked. */
  @Output() onTrailingIconClick = new EventEmitter<void>(); // Keep void type
  /** Emits when the input receives focus. Emits focus detail including the current value. */
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  /** Emits when the input loses focus. Emits blur detail including the current value. */
  @Output() onBlur = new EventEmitter<GoabInputOnBlurDetail>();
  /** Emits when a key is pressed in the input. Emits key press detail including the value and key pressed. */
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  /** Emits when the input value changes. Emits change detail including the new value. */
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  handleTrailingIconClick = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.handleTrailingIconClick = this.onTrailingIconClick.observed;
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
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
    const detail = (e as CustomEvent<GoabInputOnBlurDetail>).detail;
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

  getLeadingContentAsString(): string {
    return this.leadingContent instanceof TemplateRef ? "" : this.leadingContent;
  }

  getLeadingContentAsTemplate(): TemplateRef<any> | null {
    if (!this.leadingContent) return null;
    return this.leadingContent instanceof TemplateRef ? this.leadingContent : null;
  }

  getTrailingContentAsString(): string {
    return this.trailingContent instanceof TemplateRef ? "" : this.trailingContent;
  }

  getTrailingContentAsTemplate(): TemplateRef<any> | null {
    if (!this.trailingContent) return null;
    return this.trailingContent instanceof TemplateRef ? this.trailingContent : null;
  }
}
