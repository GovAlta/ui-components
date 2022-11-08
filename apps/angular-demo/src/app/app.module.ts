import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import "@abgov/web-components";
import { AngularComponentsModule } from "@abgov/angular-components";

// ******
// Routes
// ******
import { InputComponentComponent } from "./input-component/input-component.component";
import { ButtonComponentComponent } from "./button-component/button-component.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationLinkComponent } from "./navigation-link/navigation-link.component";
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
import { ButtonGroupComponent } from "./button-group/button-group.component";

@NgModule({
  declarations: [
    TwoColumnLayoutComponent,
    AppComponent,
    InputComponentComponent,
    ButtonComponentComponent,
    NavigationLinkComponent,
    TextAreaComponent,
    CheckboxComponent,
    RadioComponent,
    DropdownComponent,
    ModalComponent,
    AppFooterComponent,
    BadgeComponent,
    CalloutComponent,
    ChipComponent,
    CircularProgressComponent,
    HeroBannerComponent,
    AppHeaderComponent,
    MicrositeHeaderComponent,
    ContainerComponent,
    SkeletonComponent,
    FormItemComponent,
    IconButtonComponent,
    ButtonGroupComponent,
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
export class AppModule { }
