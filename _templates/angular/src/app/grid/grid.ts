import { GoABCard, GoABCardActions, GoABCardContent, GoABCardImage, GoABContainer, GoABGrid } from "@abgov/angular-components";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-grid-page",
  templateUrl: "./grid.html",
  imports: [
    GoABContainer,
    GoABGrid,
    GoABCard,
    GoABCardActions,
    GoABCardImage,
    GoABCardContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridComponent {
  constructor() { }
}
