import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import {
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-circular-progress",
  template: `
    @if (isReady) {
      <goa-circular-progress
        [attr.variant]="variant || 'inline'"
        [attr.size]="size || 'large'"
        [attr.message]="message"
        [attr.visible]="visible"
        [attr.progress]="progress"
        [attr.testid]="testId"
      >
      </goa-circular-progress>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCircularProgress implements OnInit {
  /**
   * Stretch across the full screen or use it inline
   * @default "inline"
   */
  @Input() variant?: GoabCircularProgressVariant;
  /**
   * Size of the progress indicator
   * @default "large"
   */
  @Input() size?: GoabCircularProgressSize;
  /**
   * Loading message displayed under the progress indicator
   * @default ""
   */
  @Input() message?: string;
  /**
   * Show/hide the page loader. This allows for fade transition to be applied in each transition.
   * @default false
   */
  @Input({ transform: booleanAttribute }) visible?: boolean;
  /**
   * Set the progress value. Setting this value will change the type from infinite to progress
   * @default -1
   */
  @Input({ transform: numberAttribute }) progress?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
