import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css']
})
export class InputComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onInputChangeEvent(event: any) {
    console.log('onEvent', event.detail);
  }

  handleTrailingIconClick() {
    console.log('handleTrailingIconClick');
  }
}
