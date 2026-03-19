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
  selector: "goabx-work-side-notification-panel", // eslint-disable-line
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
export class GoabxWorkSideNotificationPanel implements OnInit {
  @Input() heading?: string;
  @Input() activeTab?: GoabWorkSideNotificationActiveTabType;
  @Input() testId?: string;

  @Output() onMarkAllRead = new EventEmitter<void>();
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
