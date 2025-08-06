import { GoabFormStepStatus } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-form-step",
  template: `
    <goa-form-step
      *ngIf="isReady"
      [attr.text]="text"
      [attr.status]="status"
    ></goa-form-step> `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFormStep implements OnInit {
  @Input() text?: string;
  @Input() status?: GoabFormStepStatus;

  isReady = false;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
