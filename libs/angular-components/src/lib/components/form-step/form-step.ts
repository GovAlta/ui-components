import { GoabFormStepStatus } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
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
  private cdr = inject(ChangeDetectorRef);

  @Input() text?: string;
  @Input() status?: GoabFormStepStatus;

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
