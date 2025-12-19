import { Component } from "@angular/core";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-header-with-menu-click-event",
  templateUrl: "./angular.html",
})
export class HeaderWithMenuClickEventComponent {
  deviceWidth = "5000";

  changeDeviceWidth(event: GoabRadioGroupOnChangeDetail): void {
    this.deviceWidth = event.value;
  }

  handleMenuClick(): void {
    alert("Menu not being displayed and you can do anything");
  }
}
