import { Component } from "@angular/core";
import {
  GoabContainer,
  GoabDivider,
  GoabGrid,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-grid",
  templateUrl: "./grid.component.html",
  imports: [GoabContainer, GoabDivider, GoabGrid, GoabText],
})
export class DocsGridComponent {}
