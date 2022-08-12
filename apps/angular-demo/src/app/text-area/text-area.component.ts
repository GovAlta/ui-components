import { Component } from '@angular/core';

@Component({
  selector: 'abgov-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  value2 = "";
  value3 = "";

  constructor() { }

  onChange(e: any) {
    console.log('changed', e.detail.name, e.detail.value);
  }

  onChange2(e: any) {
    this.value2 = e.detail.value;
    console.log('changed', e.detail.name, e.detail.value);
  }

  onChange3(e: any) {
    this.value3 = e.detail.value;
    console.log('changed', e.detail.name, e.detail.value);
  }
}
