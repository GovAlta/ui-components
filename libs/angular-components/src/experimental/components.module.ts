import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoAPageLoadIndicatorComponent } from './page-load-indicator/page-load-indicator.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
