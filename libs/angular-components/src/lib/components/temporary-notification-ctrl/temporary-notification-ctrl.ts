import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

type SnackbarVerticalPosition = "top" | "bottom";
type SnackbarHorizontalPosition = "left" | "center" | "right";

@Component({
  standalone: true,
  selector: "goab-temporary-notification-ctrl",
  template: `
    <goa-temp-notification-ctrl
      *ngIf="isReady"
      [attr.vertical-position]="verticalPosition"
      [attr.horizontal-position]="horizontalPosition"
      [attr.testid]="testId"
    >
    </goa-temp-notification-ctrl>
  `,
  imports: [CommonModule],
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
