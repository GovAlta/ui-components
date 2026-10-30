import { Component } from "@angular/core";
import {
  GoabAppHeader,
  GoabBadge,
  GoabButton,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug-4364",
  templateUrl: "./bug4364.component.html",
  styleUrl: "./bug4364.component.css",
  imports: [GoabAppHeader, GoabBadge, GoabButton, GoabText],
})
export class Bug4364Component {}
