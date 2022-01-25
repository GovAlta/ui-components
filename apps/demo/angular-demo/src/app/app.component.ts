import { Component } from '@angular/core';

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  onEvent(event: any) {
    console.log('onEvent', event.detail.data);
  }
  handleClick() {
    console.log('handleClick');
  }
}
