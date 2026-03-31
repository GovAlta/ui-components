import { GoabWorkSideNotificationActiveTabType } from "@abgov/ui-components-common";
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
  selector: "goab-work-side-notification-panel", // eslint-disable-line
  template: `
    @if (isReady) {
      <goa-work-side-notification-panel
        [attr.heading]="heading"
        [attr.active-tab]="activeTab"
        [attr.testid]="testId"
        (_markAllRead)="_onMarkAllRead()"
        (_viewAll)="_onViewAll()"
      >
        <ng-content />
      </goa-work-side-notification-panel>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkSideNotificationPanel implements OnInit {
  /** The heading text displayed at the top of the notification panel. */
  @Input() heading?: string;
  /** Sets the initially active tab in the notification panel. */
  @Input() activeTab?: GoabWorkSideNotificationActiveTabType;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  /** Emits when the user clicks "Mark all as read". */
  @Output() onMarkAllRead = new EventEmitter<void>();
  /** Emits when the user clicks "View all". */
  @Output() onViewAll = new EventEmitter<void>();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onMarkAllRead() {
    this.onMarkAllRead.emit();
  }

  _onViewAll() {
    this.onViewAll.emit();
  }
}
