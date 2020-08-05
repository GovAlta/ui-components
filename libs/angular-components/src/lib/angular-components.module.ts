import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoAButtonComponent } from './button/button.component';
import { GoAMicrositeLogoComponent } from './microsite-logo/microsite-logo.component';
import { GoAFooterComponent } from './footer/footer.component';
import { GoAHeaderComponent } from './header/header.component';
import { GoAButtonLinkComponent } from './button-link/button-link.component';

@NgModule({
  imports: [CommonModule],
  exports: [GoAButtonComponent],
  declarations: [GoAButtonComponent, GoAMicrositeLogoComponent, GoAFooterComponent, GoAHeaderComponent, GoAButtonLinkComponent],
  bootstrap: [CommonModule]
})
export class AngularComponentsModule {}
