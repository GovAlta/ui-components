import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabButton, GoabBlock, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3504-text-button",
  templateUrl: "./feat3504.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [GoabButton, GoabBlock, GoabText],
})
export class Feat3504TextButtonComponent {}
