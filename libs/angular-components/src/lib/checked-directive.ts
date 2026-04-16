import {
  forwardRef,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from "@angular/core";
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

// @deprecated: Use the new <goab-checkbox .. /> component
@Directive({
  standalone: true,
  selector: "[goaChecked]",
  providers: [
    {
      useExisting: forwardRef(() => CheckedDirective),
      provide: NG_VALUE_ACCESSOR,
      multi: true,
    },
  ],
})
export class CheckedDirective extends CheckboxControlValueAccessor {
  protected renderer: Renderer2;
  protected elementRef: ElementRef;

  private _checked = false;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  override onChange: any = () => {
    /** No implementation **/
  };
  override onTouched: any = () => {
    /** No implementation **/
  };

  constructor() {
    const renderer = inject(Renderer2);
    const elementRef = inject(ElementRef);

    super(renderer, elementRef);

    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  get value(): string {
    return this._checked ? "checked" : "";
  }

  set value(checked: any) {
    this._checked = !!checked;
    this.onChange(this._checked);
    this.onTouched();
    this.elementRef.nativeElement.checked = checked;
  }

  override writeValue(checked: any) {
    this.value = checked;
  }

  override registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  override registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  @HostListener("_change", ["$event"])
  listenForValueChange(event: Event) {
    const checked = (event as CustomEvent<{ checked: boolean }>).detail.checked;
    this.value = checked;
  }
}
