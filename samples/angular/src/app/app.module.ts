import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalloutSampleComponent } from './callout/callout.component';
import { CheckboxSampleComponent } from './checkbox/checkbox.component';
import { DropdownSampleComponent } from './dropdown/dropdown.component';
import { MicrositeLogoSampleComponent } from './microsite-logo/microsite-logo.component';
import { NotificationBannerSampleComponent } from './notification/notification.component';
import { HeaderSampleComponent } from './header/header.component';
import { CardSampleComponent } from './card/card.component';
import { RadiosSampleComponent } from './radios/radios.component';

// Import the module from the package.
import { AngularComponentsModule} from '@abgov/angular-components'

@NgModule({
  declarations: [
    AppComponent,
    CalloutSampleComponent,
    CheckboxSampleComponent,
    DropdownSampleComponent,
    MicrositeLogoSampleComponent,
    NotificationBannerSampleComponent,
    HeaderSampleComponent,
    CardSampleComponent,
    RadiosSampleComponent,
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
