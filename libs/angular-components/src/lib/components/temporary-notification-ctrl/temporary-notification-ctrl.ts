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
export class GoabTemporaryNotificationCtrl implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  @Input() verticalPosition: SnackbarVerticalPosition = "bottom";
  @Input() horizontalPosition: SnackbarHorizontalPosition = "center";
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
