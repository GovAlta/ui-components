import { Component, OnInit, Input, HostBinding } from '@angular/core';

/**
 * Styles an anchor Design system compliant.
 * @example <a goa-button linkType='right' href='...'>Text</a>
 */
@Component({
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
   * The type of arrow to use.
   */
  @Input() linkType: 'up' | 'right' = 'right';

  constructor() { }
  /**
   * @ignore
   */
  ngOnInit() { }
}