import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabBlock,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabNotification,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3667",
  templateUrl: "./bug3667.component.html",
  imports: [GoabBlock, GoabDetails, GoabDivider, GoabLink, GoabNotification, GoabText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug3667Component {}
