import { Component } from "@angular/core";
import { GoabAccordion, GoabText, GoabBadge, GoabButton } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.css"],
  imports: [GoabAccordion, GoabText, GoabBadge, GoabButton],
})
export class DocsAccordionComponent {
  expandedList: boolean[] = [false, false, false, false];
  expandedAll = false;
  accordionStatus = "Show all sections";

  toggleAccordion(index: number, open: boolean): void {
    this.expandedList[index] = open;
    this.updateAccordionStatus();
  }

  onClick(): void {
    const isExpanding = this.expandedList.some((isOpen) => !isOpen);
    this.expandedList = this.expandedList.map(() => isExpanding);
    this.updateAccordionStatus();
  }

  private updateAccordionStatus(): void {
    this.expandedAll = this.expandedList.every((isOpen) => isOpen);
    this.accordionStatus = this.expandedList.every((isOpen) => isOpen)
      ? "Hide all sections"
      : "Show all sections";
  }
}
