import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goabx-app-footer",
  template: `@if (isReady) {
    <goa-app-footer
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.url]="url"
      [attr.testid]="testId"
      [attr.version]="version"
    >
      <ng-content select="[slot=nav]" />
      <ng-content select="goabx-app-footer-meta-section"></ng-content>
      <ng-content></ng-content>
    </goa-app-footer>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxAppFooter implements OnInit {
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input() url?: string;

  isReady = false;
  version = 2;

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
