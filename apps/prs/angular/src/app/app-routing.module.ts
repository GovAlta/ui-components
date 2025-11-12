import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AbgovAppComponent } from "./abgov-app";

const routes: Routes = [
  { path: "", component: AbgovAppComponent },
  // add custom paths here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
