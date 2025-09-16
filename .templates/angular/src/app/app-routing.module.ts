import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentWrapperPageComponent } from "./component-wrapper";

const routes: Routes = [
  { path: "/", component: ComponentWrapperPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
