import { Component } from "@angular/core";
import {
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3735",
  templateUrl: "./bug3735.component.html",
  styleUrls: ["./bug3735.component.css"],
  imports: [GoabText, GoabWorkSideMenu, GoabWorkSideMenuItem],
})
export class Bug3735Component {
  handleNavigate(_path: string): void {
    // Intentionally no-op for this visual verification page.
  }
}