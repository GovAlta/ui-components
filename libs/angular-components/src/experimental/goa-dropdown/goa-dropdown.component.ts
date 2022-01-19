import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import '@abgov/web-components'

@Component({
  selector: 'goa-ng-dropdown',
  templateUrl: './goa-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WCDropdownComponent),
      multi: true
    },
  ]
})
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WCDropdownComponent implements ControlValueAccessor {

  @ViewChild('goaWcDropdown')
  private inputElement: ElementRef<HTMLInputElement>;

  private get input() {
    return this.inputElement?.nativeElement;
  }

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
