import {
  CalendarDate,
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
  Once,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ElementRef,
  HostListener,
  OnInit,
  ChangeDetectorRef,
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-date-picker",

  template: ` @if (isReady) {
    <goa-date-picker
      #goaComponentRef
      [attr.name]="name"
      [attr.value]="valueString()"
      [attr.min]="minString()"
      [attr.max]="maxString()"
      [attr.error]="error"
      [attr.disabled]="disabled"
      [attr.relative]="relative"
      [attr.type]="type"
      [attr.testid]="testId"
      [attr.width]="width"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
    </goa-date-picker>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabDatePicker),
    },
  ],
})
export class GoabDatePicker extends GoabControlValueAccessor implements OnInit {
  isReady = false;
  /**
   * Name of the date field.
   * @default ""
   */
  @Input() name?: string;
  @Input() override value?: Date | string | null | undefined;
  /**
   * Minimum date value allowed.
   * @default ""
   */
  @Input() min?: Date | string;
  /**
   * Maximum date value allowed.
   * @default ""
   */
  @Input() max?: Date | string;
  /**
   * Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input.
   * @default "calendar"
   */
  @Input() type?: GoabDatePickerInputType;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  /**
   * Sets the width of the date picker input.
   * @default ""
   */
  @Input() width?: string;

  @Output() onChange = new EventEmitter<GoabDatePickerOnChangeDetail>();

  private once: Once = new Once();

  private formatValue(param: string, val: Date | string | null | undefined): string {
    if (!val) return "";

    this.once.when(val instanceof Date).do(param, () => {
      console.warn(
        `GoabDatePicker: Using Date for '${param}' is deprecated. Use a string in YYYY-MM-DD format instead.`,
      );
    });

    return new CalendarDate(val).toString();
  }
  valueString(): string {
    return this.formatValue("value", this.value);
  }

  minString(): string {
    return this.formatValue("min", this.min);
  }

  maxString(): string {
    return this.formatValue("max", this.max);
  }

  _onChange(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabDatePickerOnChangeDetail>).detail,
      event: e,
    };
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.value);
  }

  constructor(
    protected elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
  ) {
    super(renderer);
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);

    if (this.value && typeof this.value !== "string") {
      console.warn(
        "Using a `Date` type for value is deprecated. Instead use a string of the format `yyyy-mm-dd`",
      );
    }
  }

  override setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener("disabledChange", ["$event"])
  listenDisabledChange(event: Event) {
    const isDisabled = (event as CustomEvent<{ disabled: boolean }>).detail.disabled;
    this.setDisabledState(isDisabled);
  }

  override writeValue(value: Date | null): void {
    this.value = value;

    const datePickerEl = this.goaComponentRef?.nativeElement as HTMLElement | undefined;
    if (datePickerEl) {
      if (!value) {
        this.renderer.setAttribute(datePickerEl, "value", "");
      } else {
        this.renderer.setAttribute(
          datePickerEl,
          "value",
          value instanceof Date ? new CalendarDate(value).toString() : value,
        );
      }
    }
  }
}
