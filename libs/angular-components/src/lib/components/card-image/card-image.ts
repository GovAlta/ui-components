import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card-image",
  template: `
    <goa-card-image
      [src]="src"
      [height]="height"
    >
      <ng-content />
    </goa-card-image>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCardImage {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) height!: string;
}
