import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicationComponent } from "../routes/ApplicationComponent";
import { FamilyServicesComponent } from "../routes/FamilyServicesComponent";
import { FSOS } from "../routes/FSOS";
import { SupportOrderDetails } from "../routes/SupportOrderDetails";
import { PriorRegistrations } from "../routes/PriorRegistrations";
import { OtherPartyProfile } from "../routes/OtherPartyProfile";

const routes: Routes = [
  { path: "example", component: ApplicationComponent },
  { path: "family-services", component: FamilyServicesComponent },
  { path: "fsos", component: FSOS },
  { path: "support-order-details", component: SupportOrderDetails },
  { path: "prior-registrations", component: PriorRegistrations },
  { path: "other-party-profile", component: OtherPartyProfile },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
