import { forwardRef, Directive, ElementRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: "[goaValue]", providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueDirective),
      multi: true,
    },
  ],
})
export class ValueDirective implements ControlValueAccessor {
  private _value = "";

  /* eslint-disable @typescript-eslint/no-explicit-any */
  onChange: any = () => { };
  onTouched: any = () => { };

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
    this.value = value;
  }
}

@Directive({
  selector: "[goaValueList]",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueListDirective),
      multi: true,
    },
  ],
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
