import { GoABBadge, GoABBlock, GoABButton, GoABContainer } from "@abgov/angular-components";
import { NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";


@Component({
  standalone: true,
  selector: "abgov-container",
  templateUrl: "./container.component.html",
  imports: [
    GoABContainer,
    GoABButton,
    GoABBlock,
    GoABBadge,
    NgFor,
  ],
})
export class ContainerComponent implements OnInit {
  users: string[] = [];

  constructor() { }

  // FIXME: container also is having issues with props
  ngOnInit() {
    console.log("setting colors in 3 secs");
    setTimeout(() => this.users = ["Chris", "James", "John"], 2000);
  }
}
