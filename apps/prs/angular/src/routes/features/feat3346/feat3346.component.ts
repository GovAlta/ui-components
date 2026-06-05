import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabContainer,
  GoabScrollPanel,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3346",
  templateUrl: "./feat3346.component.html",
  styleUrls: ["./feat3346.component.css"],
  imports: [GoabBlock, GoabContainer, GoabScrollPanel, GoabText],
})
export class Feat3346Component {
  readonly items = Array.from({ length: 8 }, (_, i) => i + 1);
}
