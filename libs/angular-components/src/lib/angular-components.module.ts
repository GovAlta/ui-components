import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ValueDirective, ValueListDirective } from "./value-directive";

@NgModule({
  declarations: [ValueDirective, ValueListDirective],
  exports: [ValueDirective, ValueListDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularComponentsModule {}

export { ValueDirective, ValueListDirective };
