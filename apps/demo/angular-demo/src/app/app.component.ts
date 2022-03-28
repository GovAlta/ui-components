import { Component } from '@angular/core';

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  onInputChangeEvent(event: any) {
    console.log('onEvent', event.detail);
  }

  onCheckboxChangeEvent(event: any) {
    console.log('onChange event of checkbox', event.detail);
  }

  onRadioChange(e: any) {
    console.log('onRadioChange', e.detail.name, e.detail.value);
  }

  submitForm() {
    console.log('handleClick');
  }

}
