import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDivider,
  GoabText,
  GoabTabs,
  GoabTab,
  GoabTable,
  GoabBadge,
  GoabButton,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3306",
  templateUrl: "./feat3306.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabText,
    GoabDivider,
    GoabTabs,
    GoabTab,
    GoabTable,
    GoabBadge,
    GoabButton,
  ],
})
export class Feat3306Component {
  review = [0, 1, 2, 3];
  complete = [0, 1];
}
