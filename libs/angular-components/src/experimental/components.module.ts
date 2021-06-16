import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoAPageLoadIndicatorComponent } from './page-load-indicator/page-load-indicator.component';
import { GoAElementLoadIndicatorComponent } from './element-load-indicator/element-load-indicator.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
