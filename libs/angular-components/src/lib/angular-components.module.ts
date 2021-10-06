import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
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
import { GoASkeletonImageContentComponent } from './skeleton/skeleton-image-content.component';
import { GoASkeletonElementComponent } from './skeleton/skeleton-element.component';
import {
  GoACardComponent,
  GoACardHeaderComponent,
  GoACardFooterComponent,
  GoACardContentComponent,
  GoACardThumbImageComponent

} from './card/card.component';
import { GoACardGroupComponent } from './card-group/card.group.component'
import {
  GoAHeroBannerComponent,
  GoAHeroBannerContentComponent,
  GoAHeroBannerLinkComponent,
} from './hero-banner/hero-banner.component';
import { GoAPageLoadIndicatorComponent } from './page-load-indicator/page-load-indicator.component';
import { GoAElementLoadIndicatorComponent } from './element-load-indicator/element-load-indicator.component';
import { GoANumberInputComponent } from './number-input/number-input.component';

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
    GoACardGroupComponent,
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
    GoAPageLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
    GoAElementLoadIndicatorComponent,
    GoANumberInputComponent
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
    GoACardGroupComponent,
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
    GoAPageLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
    GoAElementLoadIndicatorComponent,
    GoANumberInputComponent,
  ],
  providers: [GoARadioService],
})
export class AngularComponentsModule { }

