import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoARadioChange } from './radio-change';

@Injectable({
  providedIn: 'root',
})
export class GoARadioService {
  radioChangeMessage = new BehaviorSubject(new GoARadioChange());

  constructor() {}

  selectRadio(radioChange) {
    this.radioChangeMessage.next(radioChange);
  }
}
