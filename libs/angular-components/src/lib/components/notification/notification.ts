import {
  GoabAriaLiveType,
  GoabNotificationEmphasis,
  GoabNotificationType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  booleanAttribute,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    @if (isReady) {
      <goa-notification
        [attr.version]="version"
        [attr.type]="type"
        [attr.arialive]="ariaLive"
        [attr.maxcontentwidth]="maxContentWidth"
        [attr.emphasis]="emphasis"
        [attr.compact]="compact"
        [attr.testid]="testId"
        (_dismiss)="_onDismiss()"
      >
        <ng-content />
      </goa-notification>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabNotification implements OnInit {
  isReady = false;
  version = "2";
  @Input() type?: GoabNotificationType = "information";
  @Input() ariaLive?: GoabAriaLiveType;
  @Input() maxContentWidth?: string;
  @Input() emphasis?: GoabNotificationEmphasis = "high";
  @Input({ transform: booleanAttribute }) compact?: boolean;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onDismiss = new EventEmitter();

  _onDismiss() {
    this.onDismiss.emit();
  }
}
