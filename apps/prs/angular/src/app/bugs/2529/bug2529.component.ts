import { Component } from "@angular/core";
import {
  GoabFormItem,
  GoabInput,
  GoabGrid,
  GoabInputOnChangeDetail,
} from "@abgov/angular-components";

@Component({
  selector: "abgov-bug2529",
  standalone: true,
  templateUrl: "./bug2529.component.html",
  styleUrls: ["./bug2529.component.css"],
  imports: [GoabFormItem, GoabInput, GoabGrid],
})
export class Bug2529Component {
  meridanValue = "";
  rangeValue = "";
  townshipValue = "";

  onMeridanChange(detail: GoabInputOnChangeDetail) {
    this.meridanValue = detail.value;
  }

  onRangeChange(detail: GoabInputOnChangeDetail) {
    this.rangeValue = detail.value;
  }

  onTownshipChange(detail: GoabInputOnChangeDetail) {
    this.townshipValue = detail.value;
  }
}
