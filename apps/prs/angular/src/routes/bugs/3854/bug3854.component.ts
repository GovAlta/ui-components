import { Component } from "@angular/core";
import {
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3854",
  templateUrl: "./bug3854.component.html",
  imports: [GoabText, GoabWorkSideMenu, GoabWorkSideMenuItem],
})
export class Bug3854Component {
  handleNavigate(_path: string): void {
    // Intentionally no-op for visual verification.
  }
}
