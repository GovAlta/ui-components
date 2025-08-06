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
  selector: "goab-app-footer",
  template: `
    <goa-app-footer
      *ngIf="isReady"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.url]="url"
      [attr.testid]="testId"
    >
      <ng-content select="[slot=nav]" />
      <ng-content select="goab-app-footer-meta-section"></ng-content>
      <ng-content></ng-content>
    </goa-app-footer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabAppFooter implements OnInit {
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input() url?: string;

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
