import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer-meta-section",
  template: `
    <goa-app-footer-meta-section [attr.testid]="testId">
      <ng-content />
    </goa-app-footer-meta-section>
  `,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppFooterMetaSection {
  @Input() testId?: string;
  /** "slot" is required and must equal to "meta" so it can be rendered in the correct position **/
  @Input({ required: true }) slot!: "meta";
}
