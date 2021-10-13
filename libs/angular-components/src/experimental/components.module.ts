import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoABadgeComponent } from './badge/badge.component';
import { GoAAppVersionHeaderComponent } from './app-version-header/app-version-header.component';
import { GoANumberInputComponent } from './number-input/number-input.component';
import { AngularComponentsModule } from '../lib/angular-components.module';

@NgModule({
  imports: [
    CommonModule,
    AngularComponentsModule
  ],
  exports: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoANumberInputComponent,
  ],
  declarations: [
    GoABadgeComponent,
    GoAAppVersionHeaderComponent,
    GoANumberInputComponent,
  ],
  providers: [
  ],
})
export class ExperimentalComponentsModule { }
