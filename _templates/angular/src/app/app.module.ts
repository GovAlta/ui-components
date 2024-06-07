import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AngularComponentsModule } from "@abgov/angular-components";

import "@abgov/web-components";
import { AppRoutingModule } from "playground/angular/src/app/app-routing.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AccordionComponent } from "playground/angular/src/app/accordion/accordion.component";
import { AppFooterComponent } from "playground/angular/src/app/app-footer/app-footer.component";
import { AppHeaderComponent } from "playground/angular/src/app/app-header/app-header.component";
import { BadgeComponent } from "playground/angular/src/app/badge/badge.component";
import { ButtonComponent } from "playground/angular/src/app/button-component/button.component";
import { ButtonGroupComponent } from "playground/angular/src/app/button-group/button-group.component";
import { CalloutComponent } from "playground/angular/src/app/callout/callout.component";
import { CheckboxComponent } from "playground/angular/src/app/checkbox/checkbox.component";
import { ChipComponent } from "playground/angular/src/app/chip/chip.component";
import { CircularProgressComponent } from "playground/angular/src/app/circular-progress/circular-progress.component";
import { ContainerComponent } from "playground/angular/src/app/container/container.component";
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

import { Bug1734 } from "playground/angular/src/app/bugs/bug-1734";
import { Bug1756 } from "playground/angular/src/app/bugs/bug-1756";
import { NgForOf, NgIf } from "@angular/common";

// ******
// Routes
// ******

@NgModule({
  declarations: [
    Bug1734,
    Bug1756,
    AppComponent,
    AccordionComponent,
    AppFooterComponent,
    AppHeaderComponent,
    BadgeComponent,
    ButtonComponent,
    ButtonGroupComponent,
    CalloutComponent,
    CheckboxComponent,
    ChipComponent,
    CircularProgressComponent,
    ContainerComponent,
    DetailComponent,
    DividerComponent,
    DropdownComponent,
    FileUploadComponent,
    FormItemComponent,
    FormStepperComponent,
    GridComponent,
    HeroBannerComponent,
    IconButtonComponent,
    IconComponent,
    InputComponentComponent,
    MicrositeHeaderComponent,
    ModalComponent,
    NavigationLinkComponent,
    NotificationBannerComponent,
    PaginateComponent,
    PopoverComponent,
    RadioComponent,
    SideMenuComponent,
    SkeletonComponent,
    SpacingComponent,
    StylesComponent,
    TableComponent,
    TextAreaComponent,
    ThreeColumnLayoutComponent,
    TooltipComponent,
    TwoColumnLayoutComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularComponentsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
