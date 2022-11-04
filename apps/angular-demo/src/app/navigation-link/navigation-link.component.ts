import { Component, Input } from "@angular/core";

@Component({
  selector: "abgov-navigation-link",
  templateUrl: "./navigation-link.component.html",
  styleUrls: ["./navigation-link.component.css"],
})
export class NavigationLinkComponent {
  @Input() label = "";
  @Input() path = "";

  constructor() {}
}
