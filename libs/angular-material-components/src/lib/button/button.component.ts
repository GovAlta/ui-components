import { Component, OnInit, Input, HostBinding } from '@angular/core';

/**
 * A Government of Alberta styled button.
 */
@Component({
  selector:
    'button[goa-button], input[type="button"][goa-button], input[type="submit"][goa-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  /**
   * Adds class goa-button to the host.
   * @ignore
   */
  @HostBinding('class.goa-button') get primaryBinding() {
    return true;
  }

  /**
   * Adds class goa--secondary to the host if the buttonStyle = secondary.
   * @ignore
   */
  @HostBinding('class.goa--secondary') get secondaryBinding() {
    return this.buttonType === 'secondary';
  }

  /**
   * Adds class goa--tertiary to the host if the buttonStyle = tertiary.
   * @ignore
   */
  @HostBinding('class.goa--tertiary') get tertiaryBinding() {
    return this.buttonType === 'tertiary';
  }

  /**
   * The appearance style of the button.
   */
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';

  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
