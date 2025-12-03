import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
  GoabGrid,
} from "@abgov/angular-components";
import { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3118",
  templateUrl: "./bug3118.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabDivider,
    GoabMenuAction,
    GoabMenuButton,
    GoabText,
    GoabGrid,
  ],
})
export class Bug3118Component {
  protected onAction(detail: GoabMenuButtonOnActionDetail): void {
    console.log(detail);
  }
}
