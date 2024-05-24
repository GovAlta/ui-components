import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-hero-banner",
  template: `
    <goa-hero-banner
      [heading]="heading"
    >
      <ng-content />
    </goa-hero-banner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovHeroBanner {
  @Input() heading?: string;
}

