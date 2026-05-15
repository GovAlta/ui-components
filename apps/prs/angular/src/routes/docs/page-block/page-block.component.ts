import { Component } from "@angular/core";
import {
  GoabAppFooter, GoabAppHeader, GoabGrid, GoabColumnLayout,
  GoabPageBlock, GoabSkeleton, GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-page-block",
  templateUrl: "./page-block.component.html",
  imports: [
    GoabAppFooter, GoabAppHeader, GoabGrid, GoabColumnLayout,
    GoabPageBlock, GoabSkeleton, GoabText,
  ],
})
export class DocsPageBlockComponent {}
