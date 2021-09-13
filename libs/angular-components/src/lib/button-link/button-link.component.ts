import { Component, OnInit, Input, HostBinding } from '@angular/core';

/**
 * Styles an anchor Design system compliant.
 * selector: a[goa-button]
 * @example <a goa-button linkType='right' href='...'>Text</a>
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[goa-button]',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class GoAButtonLinkComponent implements OnInit {
  /**
   * Adds class goa-link-button to the host.
   * @ignore
   */
  @HostBinding('class.goa-link-button') get primaryBinding() {
    return true;
  }

  /**
   * Adds class right-arrow to the host if the linkType = right.
   * @ignore
   */
  @HostBinding('class.right-arrow') get rightBinding() {
    return this.linkType === 'right';
  }

  /**
   * Adds class right-arrow to the host if the linkType = right.
   * @ignore
   */
  @HostBinding('class.up-arrow') get upBinding() {
    return this.linkType === 'up';
  }

  /**
   * Adds class btn-small to the host if the buttonSize = small.
   * @ignore
   */
  @HostBinding('class.btn-small') get smallBinding() {
    return this.buttonSize === 'small';
  }

  /**
   * The type of arrow to use.
   */
  @Input() linkType: 'up' | 'right' = 'right';

  /**
   * The size of the button, controls font size and padding.
   */
  @Input() buttonSize: 'small' | 'normal' = 'normal';

  constructor() { }

  /* eslint-disable @angular-eslint/no-empty-lifecycle-method */
  ngOnInit() { }
}
