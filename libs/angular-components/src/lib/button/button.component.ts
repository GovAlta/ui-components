import { Component, OnInit, Input, HostBinding } from '@angular/core';
const i = 0;
@Component({
  selector:
    'button[goa-button], input[type="button"][goa-button], input[type="submit"][goa-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  @HostBinding('class.goa-button') get primaryBinding() {
    return true;
  }

  @HostBinding('class.goa--secondary') get secondaryBinding() {
    return this.buttonType === 'secondary';
  }

  @HostBinding('class.goa--tertiary') get tertiaryBinding() {
    return this.buttonType === 'tertiary';
  }

  /**
   * The appearance style of the button.
   */
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';

  constructor() {}

  ngOnInit() {}
}
