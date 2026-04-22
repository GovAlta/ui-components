import { Component } from "@angular/core";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-set-a-max-width-on-a-long-radio-item",
  templateUrl: "./angular.html",
})
export class SetAMaxWidthOnALongRadioItemComponent {
  selectOne = "1";

  onRadioChange(event: GoabRadioGroupOnChangeDetail): void {
    this.selectOne = event.value;
  }
}
