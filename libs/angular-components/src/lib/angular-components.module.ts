import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';

import { GoAButtonComponent } from './button/button.component';
import { GoAMicrositeLogoComponent } from './microsite-logo/microsite-logo.component';
import { GoAHeaderComponent } from './header/header.component';
import { GoAButtonLinkComponent } from './button-link/button-link.component';
import { GoAOptionComponent } from './dropdown/option/option.component';
import { GoAOptionGroupComponent } from './dropdown/option-group/option-group.component';
import { GoADropdownComponent } from './dropdown/dropdown.component';
import { GoACheckboxComponent } from './checkbox/checkbox.component';
import { GoARadioComponent } from './radio/radio.component';
import { GoARadioService } from './radio/radio.service';
import { GoARadioGroupComponent } from './radio-group/radio-group.component';
import { GoACalloutComponent } from './callout/callout.component';
import { GoANotificationComponent } from './notification/notification.component';
import { GoANotificationBannerComponent } from './notification-banner/notification-banner.component';
import {
  GoACardComponent,
  GoACardHeaderComponent,
  GoACardFooterComponent,
  GoACardContentComponent,
  GoACardThumbImageComponent,
} from './card/card.component';
import {
  GoAHeroBannerComponent,
  GoAHeroBannerContentComponent,
  GoAHeroBannerLinkComponent,
} from './hero-banner/hero-banner.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  exports: [
    FormsModule,
    OverlayModule,
    CommonModule,
    GoAButtonComponent,
    GoAMicrositeLogoComponent,
    GoAHeaderComponent,
    GoAButtonLinkComponent,
    GoAOptionComponent,
    GoADropdownComponent,
    GoAOptionGroupComponent,
    GoACheckboxComponent,
    GoACalloutComponent,
    GoANotificationComponent,
    GoANotificationBannerComponent,
    GoACardComponent,
    GoACardHeaderComponent,
    GoACardFooterComponent,
    GoACardContentComponent,
    GoACardThumbImageComponent,
    GoARadioComponent,
    GoARadioGroupComponent,
    GoAHeroBannerComponent,
    GoAHeroBannerContentComponent,
    GoAHeroBannerLinkComponent,
  ],
  declarations: [
    GoAButtonComponent,
    GoAMicrositeLogoComponent,
    GoAHeaderComponent,
    GoAButtonLinkComponent,
    GoAOptionComponent,
    GoADropdownComponent,
    GoAOptionGroupComponent,
    GoACheckboxComponent,
    GoACalloutComponent,
    GoANotificationComponent,
    GoANotificationBannerComponent,
    GoACardComponent,
    GoACardHeaderComponent,
    GoACardFooterComponent,
    GoACardContentComponent,
    GoACardThumbImageComponent,
    GoARadioComponent,
    GoARadioGroupComponent,
    GoAHeroBannerComponent,
    GoAHeroBannerContentComponent,
    GoAHeroBannerLinkComponent, 
  ],
  providers: [GoARadioService],
})
export class AngularComponentsModule {} 
