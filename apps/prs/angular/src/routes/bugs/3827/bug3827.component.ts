import { Component } from "@angular/core";
import { GoabPagination, GoabPaginationOnChangeDetail } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3827",
  templateUrl: "./bug3827.component.html",
  imports: [GoabPagination],
})
export class Bug3827Component {
  basicPage = 1;

  handleBasicPageChange(event: GoabPaginationOnChangeDetail): void {
    this.basicPage = event.page;
  }
}
