import {
  GoabIconType,
  GoabInputAutoCapitalize,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabInputType,
} from "@abgov/ui-components-common";
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
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";
import { NgTemplateOutlet } from "@angular/common";

export interface IgnoreMe {
  ignore: string;
}

@Component({
  standalone: true,
  selector: "goab-input",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-input
        #goaComponentRef
        [attr.type]="type"
        [attr.name]="name"
        [attr.focused]="focused"
        [attr.value]="value"
        [attr.autocapitalize]="autoCapitalize"
        [attr.autocomplete]="autoComplete"
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
        (_keyPress)="_onKeyPress($event)"
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
      useExisting: forwardRef(() => GoabInput),
    },
  ],
})
export class GoabInput extends GoabControlValueAccessor implements OnInit {
  /**
   * Sets the type of the input field.
   * @default "text"
   */
  @Input() type?: GoabInputType = "text";
  /**
   * Name of input value that is received in the onChange event.
   * @default ""
   */
  @Input() name?: string;
  /**
   * Debounce delay in milliseconds before firing the change event. 0 means no debounce.
   * @default 0
   */
  @Input({ transform: numberAttribute }) debounce?: number;
  /**
   * Controls whether and how text input is automatically capitalized as it is entered/edited by the user. This only works on mobile devices.
   * @default "off"
   */
  @Input() autoCapitalize?: GoabInputAutoCapitalize;
  /**
   * Specifies the autocomplete attribute for the input field.
   * @default ""
   */
  @Input() autoComplete?: string;
  /**
   * Text displayed within the input when no value is set.
   * @default ""
   */
  @Input() placeholder?: string;
  /** Icon shown to the left of the text. */
  @Input() leadingIcon?: GoabIconType;
  /** Icon shown to the right of the text. */
  @Input() trailingIcon?: GoabIconType;
  /**
   * Sets the visual style variant. 'goa' for standard GoA styling, 'bare' for minimal styling.
   * @default "goa"
   */
  @Input() variant?: string;
  /**
   * Sets the cursor focus to the input.
   * @default false
   */
  @Input({ transform: booleanAttribute }) focused?: boolean;
  /**
   * Makes the input readonly.
   * @default false
   */
  @Input({ transform: booleanAttribute }) readonly?: boolean;
  /**
   * Sets the width of the text input area.
   * @default "30ch"
   */
  @Input() width?: string;
  /**
   * @deprecated Use leadingContent slot instead.
   * @default ""
   */
  @Input() prefix?: string;
  /**
   * @deprecated Use trailingContent slot instead.
   * @default ""
   */
  @Input() suffix?: string;
  /**
   * Defines how the input will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  @Input() ariaLabel?: string;
  /** Defines the maximum number of characters (as UTF-16 code units) the user can enter into the input. */
  @Input({ transform: numberAttribute }) maxLength?: number;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  @Input() min?: string | number;
  /**
   * A string value that supports any number, or an ISO 8601 format if using the date or datetime type.
   * @default ""
   */
  @Input() max?: string | number;
  /**
   * How much a number or date should change by.
   * @default 1
   */
  @Input({ transform: numberAttribute }) step?: number;
  /**
   * The aria-labelledby attribute identifies the element (or elements) that labels the input.
   * @default ""
   */
  @Input() ariaLabelledBy?: string;
  /**
   * Aria label for the trailing icon. Use only when the trailing icon is interactive.
   * @default ""
   */
  @Input() trailingIconAriaLabel?: string;
  /**
   * Sets the text alignment within the input field.
   * @default "left"
   */
  @Input() textAlign?: "left" | "right" = "left";
  /** TO DO: Write a description */
  @Input() leadingContent!: string | TemplateRef<any>;
  /** TO DO: Write a description */
  @Input() trailingContent!: string | TemplateRef<any>;

  @Output() onTrailingIconClick = new EventEmitter();
  @Output() onFocus = new EventEmitter<GoabInputOnFocusDetail>();
  @Output() onBlur = new EventEmitter<GoabInputOnBlurDetail>();
  @Output() onKeyPress = new EventEmitter<GoabInputOnKeyPressDetail>();
  @Output() onChange = new EventEmitter<GoabInputOnChangeDetail>();

  isReady = false;
  handleTrailingIconClick = false;

  constructor(
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
  ) {
    super(renderer);
  }
  ngOnInit() {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);

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
    const detail = { ...(e as CustomEvent<GoabInputOnChangeDetail>).detail, event: e };
    this.onChange.emit(detail);

    this.fcChange?.(detail.value);
  }

  _onKeyPress(e: Event) {
    this.markAsTouched();
    const detail = { ...(e as CustomEvent<GoabInputOnKeyPressDetail>).detail, event: e };
    this.onKeyPress.emit(detail);

    this.fcTouched?.();
  }

  _onFocus(e: Event) {
    this.markAsTouched();
    const detail = { ...(e as CustomEvent<GoabInputOnFocusDetail>).detail, event: e };
    this.onFocus.emit(detail);
  }

  _onBlur(e: Event) {
    const detail = { ...(e as CustomEvent<GoabInputOnBlurDetail>).detail, event: e };
    this.onBlur.emit(detail);
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
