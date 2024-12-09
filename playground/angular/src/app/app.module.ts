import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularComponentsModule } from "@abgov/angular-components";
import { ReactiveFormsModule } from "@angular/forms";

import "@abgov/web-components";

@NgModule({
  declarations: [AppComponent /* AccordionComponent */],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
