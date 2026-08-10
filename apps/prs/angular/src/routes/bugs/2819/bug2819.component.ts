import { Component } from "@angular/core";
import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabDivider,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2819",
  templateUrl: "./bug2819.component.html",
  imports: [GoabAccordion, GoabBadge, GoabBlock, GoabDivider, GoabText],
})
export class Bug2819Component {}
