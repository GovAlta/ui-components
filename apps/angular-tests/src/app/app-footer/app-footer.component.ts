import { GoABAppFooter, GoABAppFooterMetaSection, GoABAppFooterNavSection } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-footer",
  templateUrl: "./app-footer.component.html",
  imports: [
    GoABAppFooter,
    GoABAppFooterMetaSection,
    GoABAppFooterNavSection,
  ],
})
export class AppFooterComponent {
  constructor() { }
}
