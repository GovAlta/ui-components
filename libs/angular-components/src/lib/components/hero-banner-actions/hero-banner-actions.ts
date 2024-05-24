import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-hero-banner-actions",
  template: `
    <goa-hero-banner-actions>
      <ng-content />
    </goa-hero-banner-actions>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABHeroBannerActions {
  // nothing
}

