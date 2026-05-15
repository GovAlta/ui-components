import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { GoabText, GoabBlock } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2721",
  templateUrl: "./bug2721.component.html",
  styleUrls: ["./bug2721.component.css"],
  imports: [GoabText, GoabBlock],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug2721Component {}
