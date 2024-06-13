import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-hero-banner-actions",
  template: `
    <div slot="actions">
      <ng-content />
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABHeroBannerActions {
  // nothing
}
