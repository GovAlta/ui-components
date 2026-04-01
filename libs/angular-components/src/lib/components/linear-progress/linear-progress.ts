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
/** Provide visual feedback to users while loading. */
export class GoabLinearProgress implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Progress value (0-100). When undefined, shows an indeterminate loading animation. */
  @Input() progress?: number | null | undefined;
  /** Controls visibility of the percentage text. */
  @Input() percentVisibility?: "visible" | "hidden" | undefined;
  /** Accessible label for the progress bar. */
  @Input() ariaLabel?: string;
  /** ID of the element that labels this progress bar. */
  @Input() ariaLabelledBy?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testid?: string;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
