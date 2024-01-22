import {
  forwardRef,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from "@angular/core";
import {
  CheckboxControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Directive({
  selector: "[goaChecked]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckedDirective),
      multi: true,
    },
  ],
})

export class CheckedDirective extends CheckboxControlValueAccessor {
  private _checked = false;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  override onChange: any = () => { };
  override onTouched: any = () => { };

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {
    super(renderer, elementRef);
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

  @HostListener("_change", ["$event.detail.checked"])
  listenForValueChange(checked: any) {
    this.value = checked;
  }
}
