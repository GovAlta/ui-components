import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoARadioChange } from './radio-change';

export const GOA_RADIO_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoARadioComponent),
  multi: true
}

@Component({
  selector: 'goa-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [GOA_RADIO_CONTROL_VALUE_ACCESSOR],
})
export class GoARadioComponent {
  @Input() name: string;
  @Input() value: any;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() selectionChange: EventEmitter<GoARadioChange> = new EventEmitter<GoARadioChange>();

  onChange() {
    this.selectionChange.emit({name: this.name, value: this.value, checked: !this.checked});
  }
}
