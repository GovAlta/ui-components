import { Component } from "@angular/core";

@Component({
  selector: "app-card-view-of-case-files",
  templateUrl: "./angular.html",
  styles: [
    `
      .case-file-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: var(--goa-space-m);
      }
    `,
  ],
})
export class CardViewOfCaseFilesComponent {}
