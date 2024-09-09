import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccordionComponent } from "./accordion/accordion.component";
import { AppFooterComponent } from "playground/angular/src/app/app-footer/app-footer.component";
import { AppHeaderComponent } from "playground/angular/src/app/app-header/app-header.component";
import { BadgeComponent } from "playground/angular/src/app/badge/badge.component";
import { ButtonComponent } from "playground/angular/src/app/button-component/button.component";
import { ButtonGroupComponent } from "playground/angular/src/app/button-group/button-group.component";
import { CalloutComponent } from "playground/angular/src/app/callout/callout.component";
import { CheckboxComponent } from "playground/angular/src/app/checkbox/checkbox.component";
import { ChipComponent } from "playground/angular/src/app/chip/chip.component";
import { CircularProgressComponent } from "playground/angular/src/app/circular-progress/circular-progress.component";
import { ContainerComponent } from "./container/ContainerComponent";
import { DetailComponent } from "playground/angular/src/app/detail/detail";
import { DividerComponent } from "playground/angular/src/app/divider/divider.component";
import { DropdownComponent } from "playground/angular/src/app/dropdown/dropdown.component";
import { FileUploadComponent } from "playground/angular/src/app/file-upload/file-upload";
import { FormItemComponent } from "playground/angular/src/app/form-item/form-item.component";
import { FormStepperComponent } from "playground/angular/src/app/form-stepper/form-stepper.component";
import { GridComponent } from "playground/angular/src/app/grid/grid";
import { HeroBannerComponent } from "playground/angular/src/app/hero-banner/hero-banner.component";
import { IconButtonComponent } from "playground/angular/src/app/icon-button/icon-button.component";
import { IconComponent } from "playground/angular/src/app/icon/icon.component";
import { InputComponentComponent } from "playground/angular/src/app/input-component/input-component.component";
import { MicrositeHeaderComponent } from "playground/angular/src/app/microsite-header/microsoft-header.component";
import { ModalComponent } from "playground/angular/src/app/modal/modal.component";
import { NavigationLinkComponent } from "playground/angular/src/app/navigation-link/navigation-link.component";
import {
  NotificationBannerComponent
} from "playground/angular/src/app/notification-banner/notification-banner.component";
import { PaginateComponent } from "playground/angular/src/app/paginate/paginate";
import { PopoverComponent } from "playground/angular/src/app/popover/popover.component";
import { RadioComponent } from "playground/angular/src/app/radio/radio.component";
import { SideMenuComponent } from "playground/angular/src/app/sidemenu/sidemenu.component";
import { SkeletonComponent } from "playground/angular/src/app/skeleton/skeleton.component";
import { SpacingComponent } from "playground/angular/src/app/spacing/spacing";
import { StylesComponent } from "playground/angular/src/app/styles/styles.component";
import { TableComponent } from "playground/angular/src/app/table/table";
import { TextAreaComponent } from "playground/angular/src/app/text-area/text-area.component";
import { ThreeColumnLayoutComponent } from "playground/angular/src/app/three-column-layout/three-column-layout.component";
import { TooltipComponent } from "playground/angular/src/app/tooltip/tooltip.component";
import { TwoColumnLayoutComponent } from "playground/angular/src/app/two-column-layout/two-column-layout.component";
import { TabsComponent } from "playground/angular/src/app/tabs/tabs";
import { ComponentWrapperPage } from "playground/angular/src/app/component-wrapper";
import { Bug1734 } from "./bugs/bug-1734";
import { Bug1756 } from "./bugs/bug-1756";
import { ColumnLayoutComponent } from "playground/angular/src/app/column-layout/column-layout.component";
import { DatePickerComponent } from "playground/angular/src/app/date-picker/date-picker.component";

const routes: Routes = [
  { path: "bug-1734", component: Bug1734 },
  { path: "bug-1756", component: Bug1756 },
  { path: "badge-wrapper", component: ComponentWrapperPage },
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
  { path: "navigation-link", component: NavigationLinkComponent },
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
  { path: "two-column-layout", component: TwoColumnLayoutComponent },
  { path: "three-column-layout", component: ThreeColumnLayoutComponent },
  { path: "tabs", component: TabsComponent },
  { path: "column-layout", component: ColumnLayoutComponent},
  { path: "date-picker", component: DatePickerComponent},
  { path: "", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
