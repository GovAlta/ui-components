import { GoabAriaLiveType, GoabNotificationType } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-notification",
  template: `
    <goa-notification
      *ngIf="isReady"
      [attr.type]="type"
      [attr.arialive]="ariaLive"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.testid]="testId"
      (_dismiss)="_onDismiss()"
    >
      <ng-content />
    </goa-notification>
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabNotification implements OnInit {
  isReady = false;
  @Input() type?: GoabNotificationType = "information";
  @Input() ariaLive?: GoabAriaLiveType;
  @Input() maxContentWidth?: string;
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
