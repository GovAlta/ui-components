import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
