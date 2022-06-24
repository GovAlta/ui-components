import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    console.log('onChange', e.detail.name, e.detail.value);
  }

}
