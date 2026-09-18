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
  inject,
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
/** Displays an individual notification item in the work-side notification panel. */
export class GoabWorkSideNotificationItem implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the visual type/style of the notification item. @default "default" */
  @Input() type?: GoabWorkSideNotificationItemType;
  /** ISO timestamp string representing when the notification occurred. */
  @Input() timestamp?: string;
  /** Title text displayed in the notification card header. */
  @Input() title?: string;
  /** @required The body text content of the notification card. */
  @Input({ required: true }) description!: string;
  /** Indicates whether the notification has been read or is unread. @default "unread" */
  @Input() readStatus?: GoabWorkSideNotificationReadStatus;
  /** Sets the urgency level of the notification. @default "normal" */
  @Input() priority?: GoabWorkSideNotificationPriority;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  /** Emits when the notification item is clicked. */
  @Output() onClick = new EventEmitter<void>();

  isReady = false;

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
