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
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goabx-work-side-notification-item", // eslint-disable-line
  imports: [CommonModule],
  template: `
    <goa-work-side-notification-item
      *ngIf="isReady"
      [attr.type]="type"
      [attr.timestamp]="timestamp"
      [attr.title]="title"
      [attr.description]="description"
      [attr.read-status]="readStatus"
      [attr.priority]="priority"
      [attr.testid]="testId"
      (_click)="_onClick()"
    />
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxWorkSideNotificationItem implements OnInit {
  @Input() type?: GoabWorkSideNotificationItemType;
  @Input() timestamp?: string;
  @Input() title?: string;
  @Input({ required: true }) description!: string;
  @Input() readStatus?: GoabWorkSideNotificationReadStatus;
  @Input() priority?: GoabWorkSideNotificationPriority;
  @Input() testId?: string;

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
