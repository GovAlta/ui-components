import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spinner",
  template: `
    @if (isReady) {
      <goa-spinner
        [attr.type]="type"
        [attr.size]="size"
        [attr.invert]="invert"
        [attr.progress]="progress"
        [attr.testid]="testId"
      >
      </goa-spinner>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Loading indicator for async operations. */
export class GoabSpinner implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Sets the spinner type. */
  @Input() type?: GoabSpinnerType;
  /** Sets the size of the spinner. */
  @Input() size?: GoabSpinnerSize;
  /** When true, inverts colors for use on dark backgrounds. */
  @Input({ transform: booleanAttribute }) invert?: boolean;
  /** Progress value (0-100). When >= 0, shows a progress spinner instead of infinite. */
  @Input({ transform: numberAttribute }) progress?: number;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
