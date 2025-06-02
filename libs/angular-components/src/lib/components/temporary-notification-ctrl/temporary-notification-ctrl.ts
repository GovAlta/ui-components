import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

type SnackbarVerticalPosition = "top" | "bottom";
type SnackbarHorizontalPosition = "left" | "center" | "right";

@Component({
  standalone: true,
  selector: "goab-temporary-notification-ctrl",
  template: `
    <goa-temp-notification-ctrl
      [attr.vertical-position]="verticalPosition"
      [attr.horizontal-position]="horizontalPosition"
      [attr.testid]="testId"
    >
    </goa-temp-notification-ctrl>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTemporaryNotificationCtrl {
  @Input() verticalPosition: SnackbarVerticalPosition = "bottom";
  @Input() horizontalPosition: SnackbarHorizontalPosition = "center";
  @Input() testId?: string;
}
