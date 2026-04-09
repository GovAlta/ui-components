import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabPagination,
  GoabText,
} from "@abgov/angular-components";
import { GoabPaginationOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug3663",
  templateUrl: "./bug3663.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabDetails,
    GoabDivider,
    GoabLink,
    GoabPagination,
    GoabText,
  ],
})
export class Bug3663Component {
  pageSmall = 1;
  pageMedium = 1;
  pageLarge = 1;

  onSmallChange(detail: GoabPaginationOnChangeDetail) {
    this.pageSmall = detail.page;
  }

  onMediumChange(detail: GoabPaginationOnChangeDetail) {
    this.pageMedium = detail.page;
  }

  onLargeChange(detail: GoabPaginationOnChangeDetail) {
    this.pageLarge = detail.page;
  }
}
