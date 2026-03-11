import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
@Component({
  standalone: true,
  selector: "goab-app-footer-meta-section",
  template: `
    @if (isReady) {
      <goa-app-footer-meta-section [attr.testid]="testId">
        <ng-content />
      </goa-app-footer-meta-section>
    }
  `,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppFooterMetaSection implements OnInit {
  @Input() testId?: string;
  /** "slot" is required and must equal to "meta" so it can be rendered in the correct position **/
  @Input({ required: true }) slot!: "meta";

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
