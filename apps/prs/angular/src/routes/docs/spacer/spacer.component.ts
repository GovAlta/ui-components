import { Component } from "@angular/core";
import {
  GoabDivider,
  GoabIcon,
  GoabSpacer,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-spacer",
  templateUrl: "./spacer.component.html",
  imports: [GoabDivider, GoabIcon, GoabSpacer, GoabText],
})
export class DocsSpacerComponent {}
