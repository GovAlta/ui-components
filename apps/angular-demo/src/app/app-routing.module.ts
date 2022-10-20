import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InputComponentComponent } from "./input-component/input-component.component";
import { ButtonComponentComponent } from "./button-component/button-component.component";
import { TextAreaComponent } from "./text-area/text-area.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { RadioComponent } from "./radio/radio.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { ModalComponent } from "./modal/modal.component";
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { BadgeComponent } from "./badge/badge.component";
import { CalloutComponent } from "./callout/callout.component";
import { ChipComponent } from "./chip/chip.component";
import { CircularProgressComponent } from "./circular-progress/circular-progress.component";
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { MicrositeHeaderComponent } from "./microsite-header/microsite-header.component";
import { ContainerComponent } from "./container/container.component";
import { SkeletonComponent } from "./skeleton/skeleton.component";
import { FormItemComponent } from "./form-item/form-item.component";
import { TwoColumnLayoutComponent } from "./two-column-layout/two-column-layout.component";
import { IconButtonComponent } from "./icon-button/icon-button.component";

const routes: Routes = [
  { path: "button", component: ButtonComponentComponent },
  { path: "radio", component: RadioComponent },
  { path: "checkbox", component: CheckboxComponent },
  { path: "dropdown", component: DropdownComponent },
  { path: "textarea", component: TextAreaComponent },
  { path: "input", component: InputComponentComponent },
  { path: "app-header", component: AppHeaderComponent },
  { path: "app-footer", component: AppFooterComponent },
  { path: "badge", component: BadgeComponent },
  { path: "callout", component: CalloutComponent },
  { path: "chip", component: ChipComponent },
  { path: "container", component: ContainerComponent },
  { path: "skeleton", component: SkeletonComponent },
  { path: "form-item", component: FormItemComponent },
  { path: "circular-progress", component: CircularProgressComponent },
  { path: "hero-banner", component: HeroBannerComponent },
  { path: "microsite-header", component: MicrositeHeaderComponent },
  { path: "modal", component: ModalComponent },
  { path: "two-column-layout", component: TwoColumnLayoutComponent },
  { path: "icon-button", component: IconButtonComponent },
  { path: "", redirectTo: "/input", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
