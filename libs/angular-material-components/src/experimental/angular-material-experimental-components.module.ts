import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { GoaAccordionHeaderComponent } from './accordion-header/accordion-header.component';



@NgModule({
  declarations: [GoaAccordionHeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [GoaAccordionHeaderComponent]
})
export class AngularMaterialExperimentalComponentsModule { }
