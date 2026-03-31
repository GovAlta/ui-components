import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer-nav-section",
  template: `@if (isReady) {
    <goa-app-footer-nav-section
      [attr.maxcolumncount]="maxColumnCount"
      [attr.heading]="heading"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-app-footer-nav-section>
  }`,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppFooterNavSection implements OnInit {
  /** The section heading displayed above the navigation links. */
  @Input() heading?: string;
  /** Maximum number of columns to display links in on larger screens. @default 1 */
  @Input() maxColumnCount? = 1;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** @required Sets the slot to "nav" to render the section in the correct footer position. */
  @Input({ required: true }) slot!: "nav";

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
