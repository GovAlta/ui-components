import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
@Component({
  standalone: true,
  selector: "goax-work-side-menu", // eslint-disable-line
  imports: [NgTemplateOutlet],
  template: `
    <goa-work-side-menu
      [attr.heading]="heading"
      [attr.url]="url"
      [attr.user-name]="userName"
      [attr.user-secondary-text]="userSecondaryText"
      [attr.testid]="testId"
    >
      <div slot="primary">
        <ng-container [ngTemplateOutlet]="primaryContent"></ng-container>
      </div>
      <div slot="secondary">
        <ng-container [ngTemplateOutlet]="secondaryContent"></ng-container>
      </div>
      <div slot="account">
        <ng-container [ngTemplateOutlet]="accountContent"></ng-container>
      </div>
    </goa-work-side-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoaxWorkSideMenu {
  @Input() heading?: string;
  @Input() url?: string;
  @Input() userName?: string;
  @Input() userSecondaryText?: string;
  @Input() testId?: string;
  @Input() primaryContent!: TemplateRef<any>;
  @Input() secondaryContent!: TemplateRef<any>;
  @Input() accountContent!: TemplateRef<any>;
}
