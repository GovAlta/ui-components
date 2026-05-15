import { Component } from "@angular/core";
import {
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-footer",
  templateUrl: "./footer.component.html",
  imports: [GoabAppFooter, GoabAppFooterMetaSection, GoabAppFooterNavSection],
})
export class DocsFooterComponent {}
