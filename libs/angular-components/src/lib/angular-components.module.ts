import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoAButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule],
  exports: [GoAButtonComponent],
  declarations: [GoAButtonComponent],
  bootstrap: [CommonModule]
})
export class AngularComponentsModule {}
