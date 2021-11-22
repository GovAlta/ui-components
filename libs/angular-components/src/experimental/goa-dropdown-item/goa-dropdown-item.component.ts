import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'goa-ng-dropdown-item',
  templateUrl: './goa-dropdown-item.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WCDropdownItemComponent),
      multi: true
    },
  ]
})
export class WCDropdownItemComponent implements ControlValueAccessor {

  @Input()
  name: string;

  @Input()
  selectedValues: string[];


  @Output()
  valueChanged: EventEmitter<string[] | undefined | null> = new EventEmitter();


  handleInput(event: InputEvent) {
  }

  // CONTROL VALUE ACCESSOR INTERFACE
  writeValue(values: string[]): void {
    this.selectedValues = values;
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

}
