import { Component } from '@angular/core';

@Component({
  selector: 'abgov-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  constructor() { }

  onChange(e: any) {
    console.log(e.detail.name, e.detail.checked, e.detail.value);
  }

}
