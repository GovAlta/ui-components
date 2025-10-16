import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3102",
  templateUrl: "./feat3102.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabMenuAction,
    GoabMenuButton,
    GoabText,
    GoabDivider,
  ],
})
export class Feat3102Component {
  onAction(e: unknown) {
    console.log(e);
  }
}
