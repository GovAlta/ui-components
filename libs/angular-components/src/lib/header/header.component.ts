import { Component, OnInit, Input } from '@angular/core';
import { ServiceLevel } from "./service-level.enum";

/**
 * A header component for a Government of Alberta hosted microsite.
 * selector: goa-header
 */
@Component({
  selector: 'goa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class GoAHeaderComponent implements OnInit {

  /**
   * The name to show on the header as the microsite.
  */
  @Input() serviceName: string;

  /**
   * The home page URL of the microsite.
   */
  @Input() serviceHome = 'https://www.alberta.ca/index.aspx';

  /**
   * The level at which the service is running within [Alpha | Beta | Live]
   */
  @Input() serviceLevel: ServiceLevel;

  ServiceLevel = ServiceLevel;

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.checkRequiredProps('serviceLevel', 'serviceName', 'serviceHome');
  }

  checkRequiredProps(...props: string[]) {
    props.forEach(prop => {
      if (!this[prop]) {
        throw new TypeError(`Input '${prop}' is required.`);
      }
    });
  }
}
