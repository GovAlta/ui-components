import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat3340",
  templateUrl: "./feat3340.component.html",
  styleUrls: ["./feat3340.component.css"],
  imports: [
    CommonModule,
    GoabxWorkSideMenu,
    GoabxWorkSideMenuGroup,
    GoabxWorkSideMenuItem,
  ],
})
export class Feat3340Component {
  itemClicks = 0;

  onItemClick(): void {
    this.itemClicks += 1;
  }
}
