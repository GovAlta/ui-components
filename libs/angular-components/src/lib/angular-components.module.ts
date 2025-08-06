import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValueDirective, ValueListDirective } from "./value-directive";
import { CheckedDirective } from "./checked-directive";

@NgModule({
  imports: [CommonModule, ValueDirective, ValueListDirective, CheckedDirective],
  exports: [ValueDirective, ValueListDirective, CheckedDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularComponentsModule {}

export { ValueDirective, ValueListDirective, CheckedDirective };
