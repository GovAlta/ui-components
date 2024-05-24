import { GoABBadge, GoABBlock, GoABButton, GoABContainer } from "@abgov/angular-components";
import { Component, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-container",
  templateUrl: "./container.component.html",
  imports: [
    GoABContainer,
    GoABButton,
    GoABBlock,
    GoABBadge,
  ],
})
export class ContainerComponent implements OnInit {
  users: string[] = []

  constructor() { }

  ngOnInit() {
    console.log("setting colors in 3 secs")
    setTimeout(() => this.users = ["Chris", "James", "John"], 2000);
  }
}
