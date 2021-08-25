import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoAPageLoadIndicatorComponent } from './page-load-indicator/page-load-indicator.component';
import { GoAElementLoadIndicatorComponent } from './element-load-indicator/element-load-indicator.component';
import { GoASkeletonImageContentComponent } from './skeleton/skeleton-image-content.component';
import { GoASkeletonElementComponent } from './skeleton/skeleton-element.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoAPageLoadIndicatorComponent,
    GoAElementLoadIndicatorComponent,
    GoASkeletonImageContentComponent,
    GoASkeletonElementComponent,
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
