import { Component } from "@angular/core";

import {
  GoabBlock,
  GoabContainer,
  GoabDivider,
  GoabLink,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3447",
  templateUrl: "./bug3447.component.html",
  imports: [GoabBlock, GoabContainer, GoabDivider, GoabLink, GoabText],
})
export class Bug3447Component {}
