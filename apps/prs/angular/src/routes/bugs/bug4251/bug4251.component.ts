import { Component } from "@angular/core";
import {
  GoabText,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4251",
  templateUrl: "./bug4251.component.html",
  imports: [GoabText, GoabWorkSideNotificationItem, GoabWorkSideNotificationPanel],
})
export class Bug4251Component {}
