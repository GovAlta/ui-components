import { forwardRef, Directive, ElementRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

// @deprecated: Use the new <goab-input .. /> component
@Directive({
  selector: "[goaValue]", providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ValueDirective),
    multi: true,
  }],
})
export class ValueDirective implements ControlValueAccessor {
  private _value = "";
  private _disabled = false;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  onChange: any = () => { /* default implementation */ };
  onTouched: any = () => { /* default implementation */ };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.elementRef.nativeElement.value = val;
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  constructor(protected elementRef: ElementRef) { }

  @HostListener("_change", ["$event.detail.value"])
  listenForValueChange(value: string) {
    this.value = value;
  }
  @HostListener("disabledChange", ["$event.detail.disabled"])
  listenForDisabledChange(isDisabled: boolean) {
    this.setDisabledState(isDisabled);
  }
}

@Directive({
  selector: "[goaValueList]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ValueListDirective),
    multi: true,
  }],
})
export class ValueListDirective implements ControlValueAccessor {
  private _value?: string[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): string[] | undefined {
    return this._value;
  }

  set value(val: string[] | undefined) {
    if (val && val !== this._value) {
      this._setValue(val);
      this.elementRef.nativeElement.value = JSON.stringify(val);
    }
  }

  writeValue(value?: string[]) {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  constructor(protected elementRef: ElementRef) { }

  @HostListener("_change", ["$event.detail.value"])
  listenForValueChange(value: string) {
    if (!value) {
      this._setValue(undefined);
      return;
    }

    try {
      this.value = JSON.parse(value);
    } catch (e) {
      // we still need to trigger the events to prevent any previous valid value to remain set.
      const v = value.match(/^[\w\s,]*$/) ? value.split(",") : undefined;
      this._setValue(v);
    }
  }

  _setValue(value?: string[]) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }
}
