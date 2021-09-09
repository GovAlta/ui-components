import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoAElementLoadIndicatorComponent } from './element-load-indicator/element-load-indicator.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAElementLoadIndicatorComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAElementLoadIndicatorComponent,
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
