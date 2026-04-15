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
export class GoabLinearProgress implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() progress?: number | null | undefined;
  @Input() percentVisibility?: "visible" | "hidden" | undefined;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
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
