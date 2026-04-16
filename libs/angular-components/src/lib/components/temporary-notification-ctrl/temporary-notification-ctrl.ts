import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

type SnackbarVerticalPosition = "top" | "bottom";
type SnackbarHorizontalPosition = "left" | "center" | "right";

@Component({
  standalone: true,
  selector: "goab-temporary-notification-ctrl",
  template: `
    @if (isReady) {
      <goa-temp-notification-ctrl
        [attr.vertical-position]="verticalPosition"
        [attr.horizontal-position]="horizontalPosition"
        [attr.testid]="testId"
      >
      </goa-temp-notification-ctrl>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A notification that appears at the bottom of the screen. */
export class GoabTemporaryNotificationCtrl implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Vertical position of the notification container. @default "bottom" */
  @Input() verticalPosition: SnackbarVerticalPosition = "bottom";
  /** Horizontal position of the notification container. @default "center" */
  @Input() horizontalPosition: SnackbarHorizontalPosition = "center";
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
