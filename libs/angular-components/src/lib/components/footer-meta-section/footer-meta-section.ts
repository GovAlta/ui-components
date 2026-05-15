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
  selector: "goab-app-footer-meta-section",
  template: `@if (isReady) {
    <goa-app-footer-meta-section [attr.testid]="testId">
      <ng-content />
    </goa-app-footer-meta-section>
  }`,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Copyright and legal links in footer. */
export class GoabAppFooterMetaSection implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** @required Sets the slot to "meta" to render the section in the correct footer position. */
  @Input({ required: true }) slot!: "meta";

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
