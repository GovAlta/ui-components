import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the module from the package.
import { AngularComponentsModule} from '@abgov/angular-components'

@NgModule({
  declarations: [
    AppComponent
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
