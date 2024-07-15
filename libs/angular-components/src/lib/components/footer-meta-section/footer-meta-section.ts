import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer-meta-section",
  template: `
    <goa-app-footer-meta-section [attr.data-testid]="testId">
      <ng-content />
    </goa-app-footer-meta-section>
  `,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABAppFooterMetaSection {
  @Input() testId?: string;
}
