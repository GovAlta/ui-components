import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InputComponentComponent } from './input-component/input-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { DropdownComponent } from './dropdown/dropdown.component';

const routes: Routes = [
  { path: 'button', component: ButtonComponentComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'dropdown', component: DropdownComponent },
  { path: 'textarea', component: TextAreaComponent },
  { path: 'input', component: InputComponentComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
