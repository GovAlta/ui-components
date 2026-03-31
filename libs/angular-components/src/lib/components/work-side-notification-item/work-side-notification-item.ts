import {
  GoabWorkSideNotificationItemType,
  GoabWorkSideNotificationReadStatus,
  GoabWorkSideNotificationPriority,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-work-side-notification-item", // eslint-disable-line
  template: `
    @if (isReady) {
      <goa-work-side-notification-item
        [attr.type]="type"
        [attr.timestamp]="timestamp"
        [attr.title]="title"
        [attr.description]="description"
        [attr.read-status]="readStatus"
        [attr.priority]="priority"
        [attr.testid]="testId"
        (_click)="_onClick()"
      />
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkSideNotificationItem implements OnInit {
  /** Sets the visual style of the notification item. */
  @Input() type?: GoabWorkSideNotificationItemType;
  /** The timestamp for when the notification was created. */
  @Input() timestamp?: string;
  /** The title text of the notification item. */
  @Input() title?: string;
  /** @required The description text of the notification item. */
  @Input({ required: true }) description!: string;
  /** Indicates whether the notification is read or unread. */
  @Input() readStatus?: GoabWorkSideNotificationReadStatus;
  /** Sets the priority level of the notification. */
  @Input() priority?: GoabWorkSideNotificationPriority;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  /** Emits when the notification item is clicked. */
  @Output() onClick = new EventEmitter<void>();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onClick() {
    this.onClick.emit();
  }
}
