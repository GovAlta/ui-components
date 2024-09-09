import { Component, Input } from "@angular/core";

@Component({
  selector: "goab-nav-link",
  templateUrl: "./navigation-link.component.html"
})
export class NavigationLinkComponent {
  @Input() label = "test?";
  @Input() path = "";

  constructor() {}
}
