import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { AngularComponentsModule } from "@abgov/angular-components";

import "@abgov/web-components";

import {
  GoabAppHeader,
  GoabAppFooter,
  GoabMicrositeHeader,
  GoabAppHeaderMenu,
  GoabSideMenu,
  GoabSideMenuGroup,
} from "@abgov/angular-components";

@NgModule({
  declarations: [AppComponent],
  imports: [
    GoabAppHeader,
    GoabAppFooter,
    GoabMicrositeHeader,
    GoabAppHeaderMenu,
    GoabSideMenu,
    GoabSideMenuGroup,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
