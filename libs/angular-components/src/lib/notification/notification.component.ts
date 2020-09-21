import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
/**
 * Government of Alberta styled notification, comes in 4 variants: emergency, event, information, important.
 * Can set the message and optionally a link url.
 */
@Component({
  selector: 'goa-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class GoANotificationComponent implements OnInit {

  /**
   * Whether or not the notification has been dismissed.
   * @ignore
   */
  _isDismissed = false;

  /**
   * The type of the notification, changes stylings and icons.
   */
  @Input() type: 'important' | 'information' | 'event' | 'emergency' = 'information';

  /**
   * Message to display.
   */
  @Input() message: string;

  /**
   * Optional link for notification, if no link is provided notification will not contain anchor.
   */
  @Input() notificationUrl?: string;

  /**
   * Can the notification be dismissed?
   */
  @Input() isDismissable = true;

   /**
   * Event emitted containing the source checkbox, and whether or not it is checked.
   */
  @Output() onDismiss: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * @ignore
   */
  dismissClick() {    
    this._isDismissed = true;
    this._changeDetectorRef.detectChanges();

    this.onDismiss.emit();
  }
}
