import { Component } from '@angular/core';

@Component({
  selector: 'abgov-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent {

  constructor() { }

  onInputChangeEvent(event: any) {
    console.log('onEvent', event.detail);
  }

  handleTrailingIconClick() {
    console.log('handleTrailingIconClick');
  }
}
