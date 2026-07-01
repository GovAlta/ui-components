import { Component } from "@angular/core";
import {
  GoabButton,
  GoabButtonGroup,
  GoabScrollPanel,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-scroll-panel",
  templateUrl: "./scroll-panel.component.html",
  imports: [GoabScrollPanel, GoabText, GoabButton, GoabButtonGroup],
})
export class DocsScrollPanelComponent {
  paragraphs = Array.from({ length: 15 }, (_, i) => i + 1);
  rows = Array.from({ length: 12 }, (_, i) => i + 1);
  tallRows = Array.from({ length: 20 }, (_, i) => i + 1);
}
