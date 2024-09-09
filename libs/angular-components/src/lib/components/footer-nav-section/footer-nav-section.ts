import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer-nav-section",
  template: `
    <goa-app-footer-nav-section
      [attr.maxcolumncount]="maxColumnCount"
      [attr.heading]="heading"
      [attr.data-testid]="testId"
    >
      <ng-content />
    </goa-app-footer-nav-section>
  `,
  styles: [":host { width: 100%; }"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabAppFooterNavSection {
  @Input() heading?: string;
  @Input() maxColumnCount? = 1;
  @Input() testId?: string;
  /** "slot" is required and must equal to "nav" so it can be rendered in the correct position **/
  @Input({ required: true }) slot!: "nav";
}
