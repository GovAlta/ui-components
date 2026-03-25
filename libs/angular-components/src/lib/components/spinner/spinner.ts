import { GoabSpinnerSize, GoabSpinnerType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
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
export class GoabSpinner implements OnInit {
  isReady = false;
  @Input() type?: GoabSpinnerType;
  /**
   * Sets the size of the spinner.
   */
  @Input() size?: GoabSpinnerSize;
  /**
   * When true, inverts colors for use on dark backgrounds.
   * @default false
   */
  @Input({ transform: booleanAttribute }) invert?: boolean;
  /**
   * Progress value (0-100). When >= 0, shows a progress spinner instead of infinite.
   * @default -1
   */
  @Input({ transform: numberAttribute }) progress?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
