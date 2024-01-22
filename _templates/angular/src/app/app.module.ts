import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { AngularComponentsModule } from "@abgov/angular-components";

import "@abgov/web-components";

// ******
// Routes
// ******

// import { AccordionComponent } from "./accordion/.component";

@NgModule({
  declarations: [AppComponent, /* AccordionComponent */],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), AngularComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
