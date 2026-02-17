import { GoabFormStepStatus } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-step",
  template: `
    @if (isReady) {
      <goa-form-step [attr.text]="text" [attr.status]="status"></goa-form-step>
    }
  `,

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
