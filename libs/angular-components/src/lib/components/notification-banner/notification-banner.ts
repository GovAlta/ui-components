import { GoABAriaLiveType, GoABNotificationType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    <goa-notification
      [type]="type"
      [arialive]="ariaLive"
      [maxcontentwidth]="maxContentWidth"
      [testid]="testId"
      (_dismiss)="_onDismiss()"
    >
      <ng-content />
    </goa-notification>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABNotificationBanner {
  @Input() type?: GoABNotificationType;
  @Input() ariaLive?: GoABAriaLiveType;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;

  @Output() onDismiss = new EventEmitter();

  _onDismiss() {
    this.onDismiss.emit();
  }
}
