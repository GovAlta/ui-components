import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

type SnackbarType = "basic" | "success" | "failure";
type AnimationDirection = "up" | "down";

@Component({
  standalone: true,
  selector: "goab-temporary-notification",
  template: `
    <goa-temp-notification
      [attr.message]="message"
      [attr.type]="type"
      [attr.duration]="duration"
      [attr.progress]="progress"
      [attr.testid]="testId"
      [attr.action-text]="actionText"
      [attr.visible]="visible"
      [attr.animation-direction]="animationDirection"
      (action)="_onAction()"
    >
    </goa-temp-notification>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabTemporaryNotification {
  @Input() message = "";
  @Input() type: SnackbarType = "basic";
  @Input() duration?: number;
  @Input() progress?: number;
  @Input() testId?: string;
  @Input() actionText?: string;
  @Input() visible = true;
  @Input() animationDirection: AnimationDirection = "down";

  @Output() onAction = new EventEmitter();

  _onAction() {
    this.onAction.emit();
  }
}
