import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GoAButtonComponent } from './button/button.component';
import { GoAMicrositeLogoComponent } from './microsite-logo/microsite-logo.component';
import { GoAHeaderComponent } from './header/header.component';
import { GoAButtonLinkComponent } from './button-link/button-link.component';
import { GoAOptionComponent } from './dropdown/option/option.component';
import { GoAOptionGroupComponent } from './dropdown/option-group/option-group.component';
import { GoADropdownComponent } from './dropdown/dropdown.component';
import { GoACheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { GoACalloutComponent } from './callout/callout.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    FormsModule,
    GoAButtonComponent,
    GoAMicrositeLogoComponent,
    GoAHeaderComponent,
    GoAButtonLinkComponent,
    GoAOptionComponent,
    GoADropdownComponent,
    GoAOptionGroupComponent,
    GoACheckboxComponent,
    GoACalloutComponent
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
    GoACalloutComponent
  ],
  bootstrap: [CommonModule]
})
export class AngularComponentsModule {}
