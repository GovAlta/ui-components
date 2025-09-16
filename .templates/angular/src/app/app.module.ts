import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AngularComponentsModule } from "@abgov/angular-components";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { ComponentWrapperPageComponent } from "./component-wrapper";
import "@abgov/web-components";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularComponentsModule,
    ComponentWrapperPageComponent,
    BrowserModule,
    FormsModule,
    NgForOf,
    NgIf,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
