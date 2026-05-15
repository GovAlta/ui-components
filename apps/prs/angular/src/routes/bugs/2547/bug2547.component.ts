import { Component } from "@angular/core";
import {
  GoabTooltip,
  GoabPopover,
  GoabIcon,
  GoabMicrositeHeader,
  GoabButton,
  GoabNotification,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2547",
  templateUrl: "./bug2547.component.html",
  styleUrls: ["./bug2547.component.css"],
  imports: [
    GoabTooltip,
    GoabPopover,
    GoabIcon,
    GoabMicrositeHeader,
    GoabButton,
    GoabNotification,
  ],
})
export class Bug2547Component {}
