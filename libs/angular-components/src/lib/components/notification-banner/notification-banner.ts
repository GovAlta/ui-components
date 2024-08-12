import { GoABAriaLiveType, GoABNotificationType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    <goa-notification
      [attr.type]="type"
      [attr.arialive]="ariaLive"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.data-testid]="testId"
      (_dismiss)="_onDismiss()"
    >
      <ng-content />
    </goa-notification>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABNotificationBanner {
  @Input() type?: GoABNotificationType = "information";
  @Input() ariaLive?: GoABAriaLiveType;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;

  @Output() onDismiss = new EventEmitter();

  _onDismiss() {
    this.onDismiss.emit();
  }
}
