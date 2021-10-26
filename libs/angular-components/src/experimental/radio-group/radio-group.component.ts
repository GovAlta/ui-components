import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  QueryList,
  ContentChildren,
  InjectionToken,
  AfterContentInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GoARadioComponent } from '../radio/radio.component';
import { GoARadioChange } from '../radio/radio-change';

export const GOA_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoARadioGroupComponent),
  multi: true,
};

export const GOA_RADIO_GROUP = new InjectionToken<GoARadioGroupComponent>('GoARadioGroup');

@Component({
  selector: 'goa-radio-group',
  templateUrl: './radio-group.component.html',
  providers: [
    GOA_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    { provide: GOA_RADIO_GROUP, useExisting: GoARadioGroupComponent },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoARadioGroupComponent implements ControlValueAccessor, AfterContentInit {

  @ContentChildren(forwardRef(() => GoARadioComponent), { descendants: true })
  _radios: QueryList<GoARadioComponent>;

  @Input() name: string;

  @Input() value: string;

  @Input() selected: GoARadioComponent;

  @Input() disabled: boolean;

  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  @Output() selectionChange: EventEmitter<GoARadioChange> = new EventEmitter<GoARadioChange>();

  constructor(private _changeDetector: ChangeDetectorRef) { }

  _onTouchedCallback: () => void;

  _propagateChange = (_: any) => { };

  ngAfterContentInit() {
    this._radios?.forEach((radio) => {
      radio.name = this.name;
      radio.selectionChange = this.selectionChange;
    });
  }

  writeValue(value: any) {
    if (value) {
      this.selected = value;
      this._changeDetector.detectChanges();
    }
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
