import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
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
export class GoabTemporaryNotificationCtrl implements OnInit {
  isReady = false;
  @Input() verticalPosition: SnackbarVerticalPosition = "bottom";
  @Input() horizontalPosition: SnackbarHorizontalPosition = "center";
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
