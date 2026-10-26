import { Component } from "@angular/core";
import { GoabNotification, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4353",
  templateUrl: "./bug4353.component.html",
  imports: [GoabNotification, GoabText],
})
export class Bug4353Component {}
