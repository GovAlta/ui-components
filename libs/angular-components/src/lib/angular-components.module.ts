// Remove this comment the next time you work on this file
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ValueDirective, ValueListDirective } from "./value-directive";
import { CheckedDirective } from "./checked-directive";

@NgModule({
  declarations: [ValueDirective, ValueListDirective, CheckedDirective],
  exports: [ValueDirective, ValueListDirective, CheckedDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularComponentsModule {}

export { ValueDirective, ValueListDirective, CheckedDirective };
