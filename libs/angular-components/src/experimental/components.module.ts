import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoAPageLoadIndicatorComponent } from './page-load-indicator/page-load-indicator.component';
import { GoAElementLoadIndicatorComponent } from './element-load-indicator/element-load-indicator.component';
import { GoASkeletonImageContentComponent } from './skeleton/skeleton-image-content.component';
import { GoASkeletonElementComponent } from './skeleton/skeleton-element.component';
import { GoALoadingCardComponent } from './skeleton/skeleton-card.component';
import { GoACardComponent } from '../lib/card/card.component';

@NgModule({
  imports: [CommonModule, GoACardComponent],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
    GoALoadingCardComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
    GoALoadingCardComponent,
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
