import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularComponentsModule } from "@abgov/angular-components";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";

import "@abgov/web-components";

// ******
// Routes
// ******
import { AccordionComponent } from "./accordion/accordion.component";
import { AppFooterComponent } from "./app-footer/app-footer.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { BadgeComponent } from "./badge/badge.component";
import { ButtonComponentComponent } from "./button-component/button-component.component";
import { ButtonGroupComponent } from "./button-group/button-group.component";
import { CalloutComponent } from "./callout/callout.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { ChipComponent } from "./chip/chip.component";
import { CircularProgressComponent } from "./circular-progress/circular-progress.component";
import { ContainerComponent } from "./container/container.component";
import { DetailComponent } from "./detail/detail";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { FormItemComponent } from "./form-item/form-item.component";
import { FormStepperComponent } from "./form-stepper/form-stepper.component";
import { GridComponent } from "./grid/grid";
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { IconComponent } from "./icon/icon.component";
import { IconButtonComponent } from "./icon-button/icon-button.component";
import { InputComponentComponent } from "./input-component/input-component.component";
import { MicrositeHeaderComponent } from "./microsite-header/microsite-header.component";
import { ModalComponent } from "./modal/modal.component";
import { NavigationLinkComponent } from "./navigation-link/navigation-link.component";
import { NotificationBannerComponent } from "./notification-banner/notification-banner.component";
import { PaginateComponent } from "./paginate/paginate";
import { RadioComponent } from "./radio/radio.component";
import { SkeletonComponent } from "./skeleton/skeleton.component";
import { SpacingComponent } from "./spacing/spacing";
import { TableComponent } from "./table/table";
import { TextAreaComponent } from "./text-area/text-area.component";
import { TwoColumnLayoutComponent } from "./two-column-layout/two-column-layout.component";

@NgModule({
  declarations: [
    AccordionComponent,
    AppComponent,
    AppFooterComponent,
    AppHeaderComponent,
    BadgeComponent,
    ButtonComponentComponent,
    ButtonGroupComponent,
    CalloutComponent,
    CheckboxComponent,
    ChipComponent,
    CircularProgressComponent,
    ContainerComponent,
    DetailComponent,
    DropdownComponent,
    FormItemComponent,
    FormStepperComponent,
    GridComponent,
    HeroBannerComponent,
    IconComponent,
    IconButtonComponent,
    InputComponentComponent,
    MicrositeHeaderComponent,
    ModalComponent,
    NavigationLinkComponent,
    NotificationBannerComponent,
    PaginateComponent,
    RadioComponent,
    SkeletonComponent,
    SpacingComponent,
    TableComponent,
    TextAreaComponent,
    TwoColumnLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
