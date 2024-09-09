import { GoabCard, GoabCardActions, GoabCardContent, GoabCardImage, GoabContainer, GoabGrid } from "@abgov/angular-components";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-grid-page",
  templateUrl: "./grid.html",
  imports: [
    GoabContainer,
    GoabGrid,
    GoabCard,
    GoabCardActions,
    GoabCardImage,
    GoabCardContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridComponent {
  constructor() { }
}
