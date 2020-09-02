import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CheckboxSampleComponent } from './checkbox/checkbox.component';
import { DropdownSampleComponent } from './dropdown/dropdown.component';
import { MicrositeLogoSampleComponent } from './microsite-logo/microsite-logo.component';
import { HeaderSampleComponent } from './header/header.component';

// Import the module from the package.
import { AngularComponentsModule} from '@abgov/angular-components'

@NgModule({
  declarations: [
    AppComponent,
    CheckboxSampleComponent,
    DropdownSampleComponent,
    MicrositeLogoSampleComponent,
    HeaderSampleComponent
  ],
  imports: [
    // Add the module to our imports and we are ready to go!
    AngularComponentsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 