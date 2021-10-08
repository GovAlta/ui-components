import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'goa-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
})
export class GoANumberInputComponent {
  private _value = 0;
  private _min?: number;
  private _max?: number;

  @ViewChild('input')
  private inputElement: ElementRef<HTMLInputElement>;

  @Input()
  name?: string;

  @Input()
  disabled?: boolean;

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
   * @type {EventEmitter<number>}
   * @memberof GoANumberInputComponent
  */
  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter();

  /**
   * The value of the NumberInput
   *
   * @memberof GoANumberInputComponent
   */
  @Input()
  set value(val: number) {
    const newVal = this.clampValue(val);
    if (this._value !== newVal) {
      this.valueChanged.emit(newVal);
      this._value = newVal;
    }
  }

  get value(): number {
    return this._value;
  }

  /**
   * Sets the minimum value that the number input can take
   *
   * @memberof GoANumberInputComponent
   */
  @Input()
  set min(min: number) {
    this._min = min;
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
  set max(max: number) {
    this._max = max;
    this.value = this._value;
  }

  get max() {
    return this._max
  }


  /**
   * Increment the number input
   *
   * @memberof GoANumberInputComponent
   */
  increment() {
    this.input.stepUp()
    this.updateFromInput();
  }

  /**
   * Decrement the number input
   *
   * @memberof GoANumberInputComponent
   */
  decrement() {
    this.input.stepDown();
    this.updateFromInput();
  }

  updateFromInput() {
    const inputVal = this.input.valueAsNumber;
    this.value = inputVal;

    // if the value has been clamped then update the input
    if (inputVal !== this.value) {
      this.input.valueAsNumber = this.value;
    }
  }

  private get input() {
    return this.inputElement.nativeElement;
  }

  private clampValue(val: number) {
    if (this.max !== undefined) {
      val = Math.min(this.max, val)
    }
    if (this.min !== undefined) {
      val = Math.max(val, this.min);
    }
    return val;
  }

}
