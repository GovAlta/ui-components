import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    @if (isReady) {
      <goa-notification
        [attr.type]="type"
        [attr.arialive]="ariaLive"
        [attr.maxcontentwidth]="maxContentWidth"
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
  /**
   * Define the context and colour of the notification.
   * @default "information"
   */
  @Input() type?: GoabNotificationType = "information";
  /**
   * Indicates how assistive technology should handle updates to the live region.
   * @default "polite"
   */
  @Input() ariaLive?: GoabAriaLiveType;
  /**
   * Maximum width of the content area.
   * @default "100%"
   */
  @Input() maxContentWidth?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
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
