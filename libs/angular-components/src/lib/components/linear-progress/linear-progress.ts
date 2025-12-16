import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-linear-progress",
  template: `
    <goa-linear-progress
      *ngIf="isReady"
      [attr.progress]="progress"
      [attr.percent-visibility]="percentVisibility"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.testid]="testid"
    >
    </goa-linear-progress>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabLinearProgress implements OnInit {
  @Input() progress?: number | null | undefined;
  @Input() percentVisibility?: "visible" | "hidden" | undefined;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
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
