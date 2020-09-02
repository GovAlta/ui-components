import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoACheckboxChange } from './checkbox-change';

export const GOA_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoACheckboxComponent),
  multi: true
}

@Component({
  selector: 'goa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  //register our custom ControlValueAccessor with angular DI system so angular knows how to get instance of it for ngModel binding
  providers: [GOA_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Checkbox component with Government of Alberta styling.
 */
export class GoACheckboxComponent implements ControlValueAccessor {

  static idNum = 0;
  uniqueId: string;

  /**
   * The label text to display beside the checkbox.
   */
  @Input() label: string;

  /**
   * Value/unique identifier for the object the checkbox represents.
   */
  @Input() value: string;

  /**
   * Boolean indicating whether or not the checkbox is checked/selected.
   */
  @Input() checked: boolean;

  /**
   * Boolean indicating whether or not the checkbox is disabled.
   */
  @Input() disabled: boolean;

  /**
   * Boolean indicating whether or not the checkbox is required.
   */
  @Input() required: boolean;

  /**
   * Boolean indicating whether or not the checkbox should display as indeterminate (i.e. it has associated 'child' checkboxes, some of which are selected).
   */
  private _indeterminate = false;
  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {
    // only do something if value has changed from current
    if (value !== this.indeterminate) {
      this._indeterminate = value;

      // can't be indeterminate and checked, so clear checked
      if (this._indeterminate){
        this.checked = false;
      }
    }
  }

  /**
   * The position to display the label/text for the checbox.  Valid values are before and after.
   */
  @Input() labelPosition: 'before' | 'after' = 'after';

   /**
   * Event emitted containing the source checkbox, and whether or not it is checked.
   */
  @Output() selectionChange: EventEmitter<GoACheckboxChange> = new EventEmitter<GoACheckboxChange>();

  _onTouchedCallback: () => {};
  _propagateChange = (_: any) => { };

  constructor(private _changeDetectorRef: ChangeDetectorRef,) {
    this.uniqueId = `goa-checkbox-${GoACheckboxComponent.idNum++}`
  }

  /**
   * Boolean indicating if the checkbox is required and not checked
   */
  hasError(): boolean {
    return this.required && !this.checked;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param value The model bound property, i.e. the value of checked
   */
  writeValue(value: any) {
    if ((value !== undefined) && (value !== null)) {
      this.checked = value;
      this._changeDetectorRef.detectChanges();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param fn The function to call on change.  Provided by ControlValueAccessor
   */
  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param fn The function to call on touch.  Provided by ControlValueAccessor
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  };

  /**
   * Toggles the checked value of the checkbox
   */
  toggle(): void {
    this.checked = !this.checked;
  }

  /**
   * User interaction event on click of the checkbox or its label to indicate toggling of the current checked status.
   * Emits selectionChange to parent components.
   */
  onClick() {
    this.toggle();

    // user manually clicking overrides indeterminate and sets it to false
    // this is because if they click and set to checked/unchecked, all 'child' checkboxes should get set to checked/unchecked (by user routine, not here),
    // so this checkbox is no longer indeterminate
    this.indeterminate = false;

    const checkBoxChange = {
      source: this,
      checked: this.checked
    } as GoACheckboxChange;

    this._propagateChange(this.checked);
    this.selectionChange.emit(checkBoxChange);
  }

}
