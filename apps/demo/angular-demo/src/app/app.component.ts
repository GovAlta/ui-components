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
  submitForm() {
    console.log('handleClick');
  }
}
