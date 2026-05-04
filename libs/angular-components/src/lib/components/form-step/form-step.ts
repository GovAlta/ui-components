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
/** Individual step in a multi-step form. */
export class GoabFormStep implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The step label text displayed to users. */
  @Input() text?: string;
  /** The completion status of the step. Affects visual styling and icons. */
  @Input() status?: GoabFormStepStatus;

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
