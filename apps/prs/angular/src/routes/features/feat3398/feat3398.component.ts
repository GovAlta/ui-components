import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabButton,
  GoabText,
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3398",
  templateUrl: "./feat3398.component.html",
  imports: [
    CommonModule,
    GoabButton,
    GoabText,
    GoabxWorkSideMenu,
    GoabxWorkSideMenuGroup,
    GoabxWorkSideMenuItem,
  ],
})
export class Feat3398Component {
  groupOpen = false;

  toggleGroup(): void {
    this.groupOpen = !this.groupOpen;
  }
}
