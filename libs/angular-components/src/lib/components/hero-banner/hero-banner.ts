import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-hero-banner",
  imports: [NgTemplateOutlet],
  template: `
    <goa-hero-banner
      [attr.heading]="heading"
      [attr.backgroundurl]="backgroundUrl"
      [attr.minheight]="minHeight"
      [attr.testid]="testId"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.backgroundColor]="backgroundColor"
      [attr.textcolor]="textColor"
    >
      <ng-content />
      <div slot="actions">
        <ng-container [ngTemplateOutlet]="actions"></ng-container>
      </div>
    </goa-hero-banner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabHeroBanner {
  @Input() heading?: string;
  @Input() backgroundUrl?: string;
  @Input() minHeight?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;

  @Input() actions!: TemplateRef<any>;
}
