import { GoabAppFooter, GoabAppFooterMetaSection, GoabAppFooterNavSection } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-footer",
  templateUrl: "./app-footer.component.html",
  imports: [
    GoabAppFooter,
    GoabAppFooterMetaSection,
    GoabAppFooterNavSection,
  ],
})
export class AppFooterComponent {
  constructor() { }
}
