import { Component, inject } from "@angular/core";
import { GoabButton } from "@abgov/angular-components";
import { PushDrawerHostService } from "./push-drawer-host.service";

@Component({
  standalone: true,
  selector: "abgov-feat3347-push",
  templateUrl: "./feat3347PushDrawer.component.html",
  imports: [GoabButton],
})
export class Feat3347PushDrawerComponent {
  private pushDrawerHost = inject(PushDrawerHostService);

  openPushDrawer() {
    this.pushDrawerHost.openDrawer();
  }
}
