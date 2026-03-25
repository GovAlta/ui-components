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
  /**
   * The step label text displayed to users.
   */
  @Input() text?: string;
  /** The completion status of the step. Affects visual styling and icons. */
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
