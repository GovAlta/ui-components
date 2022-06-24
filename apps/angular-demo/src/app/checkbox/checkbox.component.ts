import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    console.log(e.detail.name, e.detail.checked, e.detail.value);
  }

}
