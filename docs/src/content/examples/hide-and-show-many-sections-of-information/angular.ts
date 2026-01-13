import { Component } from "@angular/core";

@Component({
  selector: "app-hide-and-show-many-sections",
  templateUrl: "./angular.html",
})
export class HideAndShowManySectionsComponent {
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
