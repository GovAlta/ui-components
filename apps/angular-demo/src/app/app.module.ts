import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import '@abgov/web-components';
import { InputComponentComponent } from './input-component/input-component.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, InputComponentComponent, ButtonComponentComponent, NavigationLinkComponent, TextAreaComponent, CheckboxComponent, RadioComponent, DropdownComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
