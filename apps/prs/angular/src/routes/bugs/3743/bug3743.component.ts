import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabButtonGroup,
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3743",
  templateUrl: "./bug3743.component.html",
  imports: [CommonModule,
  GoabButton,
  GoabButtonGroup,
],
})
export class Bug3743Component {
}
