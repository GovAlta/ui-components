import {
  GoabDatePickerInputType,
  GoabDatePickerOnChangeDetail,
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
import { CommonModule } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-date-picker",
  imports: [CommonModule],
  template: ` <goa-date-picker
    #goaComponentRef
    *ngIf="isReady"
    [attr.name]="name"
    [attr.value]="formatValue(value)"
    [attr.min]="min"
    [attr.max]="max"
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
export class GoabDatePicker extends GoabControlValueAccessor implements OnInit {
  isReady = false;
  @Input() name?: string;
  @Input() override value?: Date | string | null | undefined;
  @Input() min?: Date | string;
  @Input() max?: Date | string;
  @Input() type?: GoabDatePickerInputType;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  @Input() width?: string;

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

  @HostListener("disabledChange", ["$event.detail.disabled"])
  listenDisabledChange(isDisabled: boolean) {
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
          value instanceof Date ? value.toISOString() : value,
        );
      }
    }
  }
}
