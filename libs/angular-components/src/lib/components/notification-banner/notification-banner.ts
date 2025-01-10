import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    <goa-notification
      [attr.type]="type"
      [attr.arialive]="ariaLive"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.testid]="testId"
      (_dismiss)="_onDismiss()"
    >
      <ng-content />
    </goa-notification>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabNotificationBanner {
  @Input() type?: GoabNotificationType = "information";
  @Input() ariaLive?: GoabAriaLiveType;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;

  @Output() onDismiss = new EventEmitter();

  _onDismiss() {
    this.onDismiss.emit();
  }
}
