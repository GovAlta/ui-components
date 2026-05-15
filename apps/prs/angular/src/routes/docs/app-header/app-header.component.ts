import { Component } from "@angular/core";
import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabButton,
  GoabMenuAction,
  GoabMenuButton,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-app-header",
  templateUrl: "./app-header.component.html",
  imports: [
    GoabAppHeader,
    GoabAppHeaderMenu,
    GoabBadge,
    GoabButton,
    GoabMenuAction,
    GoabMenuButton,
  ],
})
export class DocsAppHeaderComponent {}
