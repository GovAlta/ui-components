import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabCallout,
  GoabContainer,
  GoabText,
  GoabThemeService,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3873",
  templateUrl: "./feat3873.component.html",
  imports: [GoabBlock, GoabButton, GoabCallout, GoabContainer, GoabText],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Feat3873Component {
  readonly theme = inject(GoabThemeService);

  setLight(): void {
    this.theme.setMode("light");
  }

  setDark(): void {
    this.theme.setMode("dark");
  }

  toggle(): void {
    this.theme.toggle();
  }
}
