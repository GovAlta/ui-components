import { Component } from "@angular/core";
import { GoabFormItem, GoabInput, GoabGrid } from "@abgov/angular-components";

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

  onMeridanChange(event: any) {
    this.meridanValue = event.target.value;
  }

  onRangeChange(event: any) {
    this.rangeValue = event.target.value;
  }

  onTownshipChange(event: any) {
    this.townshipValue = event.target.value;
  }
}
