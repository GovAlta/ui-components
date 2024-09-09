import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-tab",
  template: `
    <goa-tab>
      <ng-content />
      <div slot="heading">
        <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
        {{getHeadingAsString()}}
      </div>
    </goa-tab>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet]
})
export class GoabTab {
  @Input() heading!: string | TemplateRef<any>;

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }
}
