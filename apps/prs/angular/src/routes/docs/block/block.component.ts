import { Component } from "@angular/core";
import { GoabBlock, GoabContainer } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-block",
  templateUrl: "./block.component.html",
  imports: [GoabBlock, GoabContainer],
})
export class DocsBlockComponent {}
