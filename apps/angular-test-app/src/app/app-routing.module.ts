import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InputComponentComponent } from './input-component/input-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';

const routes: Routes = [
  { path: 'button', component: ButtonComponentComponent },
  { path: 'input', component: InputComponentComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
