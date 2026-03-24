import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
@Component({
  standalone: true,
  selector: "goab-linear-progress",
  template: `
    @if (isReady) {
      <goa-linear-progress
        [attr.progress]="progress"
        [attr.percent-visibility]="percentVisibility"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.testid]="testid"
      >
      </goa-linear-progress>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabLinearProgress implements OnInit {
  /** Progress value (0-100). When undefined, shows an indeterminate loading animation. */
  @Input() progress?: number | null | undefined;
  /**
   * Controls visibility of the percentage text.
   * @default "visible"
   */
  @Input() percentVisibility?: "visible" | "hidden" | undefined;
  /** Accessible label for the progress bar. */
  @Input() ariaLabel?: string;
  /** ID of the element that labels this progress bar. */
  @Input() ariaLabelledBy?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testid?: string;

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
