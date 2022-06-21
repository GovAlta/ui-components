import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'abgov-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  colors: string[] = ['red', 'green', 'blue'];
  selectedColor = "red";

  constructor() { }

  selectColor(event: any) {
    this.selectedColor = event.detail.value;
  }

}
