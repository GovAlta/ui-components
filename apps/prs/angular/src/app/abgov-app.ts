import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import {} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-app",
  template: `
    <div style="width: 1024px; margin: 0 auto;">
      <router-outlet />
    </div>
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AbgovAppComponent {}
