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
  /** Define the context and colour of the notification. @default "information" */
  @Input() type?: GoabNotificationType = "information";
  /** Indicates how assistive technology should handle updates to the live region. */
  @Input() ariaLive?: GoabAriaLiveType;
  /** Maximum width of the content area. */
  @Input() maxContentWidth?: string;
  /** Sets the visual prominence. 'high' for full background, 'filled' for medium. @default "high" */
  @Input() emphasis?: GoabNotificationEmphasis = "high";
  /** When true, reduces padding for a more compact notification. */
  @Input({ transform: booleanAttribute }) compact?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the notification is dismissed. */
  @Output() onDismiss = new EventEmitter();

  _onDismiss() {
    this.onDismiss.emit();
  }
}
