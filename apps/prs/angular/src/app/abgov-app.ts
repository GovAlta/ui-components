import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
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
  imports: [CommonModule],
})
export class AbgovAppComponent {}
