import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccordionComponent } from "./accordion/accordion.component";
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { BadgeComponent } from "./badge/badge.component";
import { ButtonComponent } from "./button-component/button.component";
import { ButtonGroupComponent } from "./button-group/button-group.component";
import { CalloutComponent } from "./callout/callout.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { ChipComponent } from "./chip/chip.component";
import { CircularProgressComponent } from "./circular-progress/circular-progress.component";
import { ContainerComponent } from "./container/ContainerComponent";
import { DetailComponent } from "./detail/detail";
import { DividerComponent } from "./divider/divider.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { FileUploadComponent } from "./file-upload/file-upload";
import { FormItemComponent } from "./form-item/form-item.component";
import { FormStepperComponent } from "./form-stepper/form-stepper.component";
import { GridComponent } from "./grid/grid";
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { IconButtonComponent } from "./icon-button/icon-button.component";
import { IconComponent } from "./icon/icon.component";
import { InputComponentComponent } from "./input-component/input-component.component";
import { MicrositeHeaderComponent } from "./microsite-header/microsoft-header.component";
import { ModalComponent } from "./modal/modal.component";
import { NotificationBannerComponent } from "./notification-banner/notification-banner.component";
import { PaginateComponent } from "./paginate/paginate";
import { PopoverComponent } from "./popover/popover.component";
import { RadioComponent } from "./radio/radio.component";
import { SideMenuComponent } from "./sidemenu/sidemenu.component";
import { SkeletonComponent } from "./skeleton/skeleton.component";
import { SpacingComponent } from "./spacing/spacing";
import { StylesComponent } from "./styles/styles.component";
import { TableComponent } from "./table/table";
import { TextAreaComponent } from "./text-area/text-area.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { TabsComponent } from "./tabs/tabs";
import { Bug1734 } from "./bugs/bug-1734";
import { Bug1756 } from "./bugs/bug-1756";

const routes: Routes = [
  { path: "bug-1734", component: Bug1734 },
  { path: "bug-1756", component: Bug1756 },
  { path: "accordion", component: AccordionComponent },
  { path: "app-footer", component: AppFooterComponent },
  { path: "app-header", component: AppHeaderComponent },
  { path: "badge", component: BadgeComponent },
  { path: "button", component: ButtonComponent },
  { path: "button-group", component: ButtonGroupComponent },
  { path: "callout", component: CalloutComponent },
  { path: "checkbox", component: CheckboxComponent },
  { path: "chip", component: ChipComponent },
  { path: "circular-progress", component: CircularProgressComponent },
  { path: "container", component: ContainerComponent },
  { path: "detail", component: DetailComponent },
  { path: "divider", component: DividerComponent },
  { path: "dropdown", component: DropdownComponent },
  { path: "file-upload", component: FileUploadComponent },
  { path: "form-item", component: FormItemComponent },
  { path: "form-stepper", component: FormStepperComponent },
  { path: "grid", component: GridComponent },
  { path: "hero-banner", component: HeroBannerComponent },
  { path: "icon", component: IconComponent },
  { path: "icon-button", component: IconButtonComponent },
  { path: "input", component: InputComponentComponent },
  { path: "microsite-header", component: MicrositeHeaderComponent },
  { path: "modal", component: ModalComponent },
  { path: "notification-banner", component: NotificationBannerComponent },
  { path: "paginate", component: PaginateComponent },
  { path: "popover", component: PopoverComponent },
  { path: "radio", component: RadioComponent },
  { path: "side-menu", component: SideMenuComponent },
  { path: "skeleton", component: SkeletonComponent },
  { path: "spacing", component: SpacingComponent },
  { path: "styles", component: StylesComponent },
  { path: "table", component: TableComponent },
  { path: "textarea", component: TextAreaComponent },
  { path: "tooltip", component: TooltipComponent },
  { path: "tabs", component: TabsComponent },
  { path: "", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
