import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'goa-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GoANumberInputComponent),
      multi: true
    },
  ]
})
export class GoANumberInputComponent implements ControlValueAccessor {
  private _value?: number;
  private _min?: number;
  private _max?: number;
  private _isTouched = false;

  @ViewChild('numberInput')
  private inputElement: ElementRef<HTMLInputElement>;
  private get input() {
    return this.inputElement?.nativeElement;
  }

  @Input()
  disabled: boolean;

  /**
   * Sets the step value that is used when incrementing / decrementing
   *
   * @memberof GoANumberInputComponent
  */
  @Input()
  step = 1;

  /**
   * An event that fires whenever the value is changed
   *
   * @type {EventEmitter<number | undefined | null>}
   * @memberof GoANumberInputComponent
  */
  @Output()
  valueChanged: EventEmitter<number | undefined | null> = new EventEmitter();

  /**
   * The value of the NumberInput
   *
   * @memberof GoANumberInputComponent
   */
  @Input()
  set value(val: number | null) {
    const newVal = (val === undefined || val === null || Number.isNaN(val)) ? null : this.clampValue(val);
    if (this._value !== newVal) {
      this._value = newVal;
      this.onChange?.(newVal);
      this.valueChanged.emit(newVal);
    }
    if (this.input && this.input.valueAsNumber !== newVal) {
      this.input.valueAsNumber = newVal;
    }
  }

  get value(): number | undefined | null {
    return this._value;
  }

  /**
   * Sets the minimum value that the number input can take
   *
   * @memberof GoANumberInputComponent
   */
  @Input()
  set min(min: number | undefined | null) {
    this._min = min;
    // force reevaluation / clamping
    this.value = this._value;
  }

  get min() {
    return this._min
  }

  /**
   * Sets the maximum value that the number input can take
   *
   * @memberof GoANumberInputComponent
   */
  @Input()
  set max(max: number | undefined) {
    this._max = max;
    // force reevaluation / clamping
    this.value = this._value;
  }

  get max() {
    return this._max
  }

  private clampValue(val: number) {
    if (Number.isFinite(this.max)) {
      val = Math.min(this.max, val)
    }
    if (Number.isFinite(this.min)) {
      val = Math.max(val, this.min);
    }
    return val;
  }

  markTouched() {
    if (this._isTouched === false) {
      this._isTouched = true;
      this.onTouched?.();
    }
  }

  handleInput(event: InputEvent) {
    const inputString = event.data ?? '';
    // If someone is typing a negative number, let them
    if (inputString.trim() !== '-') {
      this.value = (event.target as HTMLInputElement).valueAsNumber;
    }
  }

  /**
   * Increment the number input
   *
   * @memberof GoANumberInputComponent
   */
  increment() {
    // use built-in browser increment logic
    this.input.stepUp();
    this.value = this.input.valueAsNumber;
  }

  /**
   * Decrement the number input
   *
   * @memberof GoANumberInputComponent
   */
  decrement() {
    // use built-in browser decrement logic
    this.input.stepDown();
    this.value = this.input.valueAsNumber;
  }

  // CONTROL VALUE ACCESSOR INTERFACE
  writeValue(value: number): void {
    this.value = value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onChange: (newValue?: number | null) => void;
  registerOnChange(handler: (newValue?: number | null) => void): void {
    this.onChange = handler;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onTouched: () => void;
  registerOnTouched(handler: () => void): void {
    this.onTouched = handler;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
