import { Component } from "@angular/core";
import { GoabPagination, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3824",
  templateUrl: "./bug3824.component.html",
  imports: [GoabPagination, GoabText],
})
export class Bug3824Component {
  pageNumber = 1;

  onPageChange(event: { page: number }) {
    this.pageNumber = event.page;
  }
}
