import { Component } from "@angular/core";

@Component({
  selector: "app-add-a-filter-chip",
  templateUrl: "./angular.html",
})
export class AddAFilterChipComponent {
  activeFilters: string[] = [];

  removeFilter(filter: string): void {
    this.activeFilters = this.activeFilters.filter((f) => f !== filter);
  }

  addFilter(): void {
    const randomFilter = "Filter " + Math.floor(Math.random() * 100);
    if (!this.activeFilters.includes(randomFilter)) {
      this.activeFilters.push(randomFilter);
    }
  }
}
