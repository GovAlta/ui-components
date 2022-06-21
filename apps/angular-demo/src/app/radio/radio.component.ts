import { Component } from '@angular/core';

@Component({
  selector: 'abgov-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent {

  constructor() { }

  onChange(e: any) {
    console.log('onChange', e.detail.name, e.detail.value);
  }

}
