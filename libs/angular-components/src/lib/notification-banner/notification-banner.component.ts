import { Component, OnInit, Input, ContentChildren, QueryList } from '@angular/core';
import { GoANotificationComponent } from '../notification/notification.component';

/**
 * Government of Alberta styled notification banner.  Contains one or more notifications.
 * selector: goa-notification-banner
 */
@Component({
  selector: 'goa-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class GoANotificationBannerComponent implements OnInit {

  /**
   * The accessibility title for the notification banner.  Is not displayed.
   */
  @Input() title = 'Notifications';

  /**
   * The notifications in this banner.
   * @ignore
   */
  @ContentChildren(GoANotificationComponent, {descendants: false}) _notifications: QueryList<GoANotificationComponent>;

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }
}
