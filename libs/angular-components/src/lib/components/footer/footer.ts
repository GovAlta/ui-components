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
  selector: "goab-app-footer",
  template: `@if (isReady) {
    <goa-app-footer [attr.maxcontentwidth]="maxContentWidth" [attr.testid]="testId">
      <ng-content select="[slot=nav]" />
      <ng-content select="goab-app-footer-meta-section"></ng-content>
      <ng-content></ng-content>
    </goa-app-footer>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Provides information related your service at the bottom of every page. */
export class GoabAppFooter implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The maximum width of the main content area. */
  @Input() maxContentWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

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
