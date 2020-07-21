import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-button',
  templateUrl: './goa-button.component.html',
  styleUrls: ['./goa-button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  @Input() title: string;
  @Input() buttonType: string = 'primary';

  constructor() { }

  ngOnInit() { }
}