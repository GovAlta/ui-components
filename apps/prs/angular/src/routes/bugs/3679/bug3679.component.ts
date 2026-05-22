import { Component } from "@angular/core";
import { GoabContainer, GoabTable } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3679",
  templateUrl: "./bug3679.component.html",
  imports: [GoabContainer, GoabTable],
})
export class Bug3679Component {}