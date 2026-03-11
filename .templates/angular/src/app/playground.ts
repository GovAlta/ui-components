import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import {
  GoabInput,
  /* Import components here */
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-app",
  template: `
    <div style="width: 1024px; margin: 0 auto;">
      <goab-input placeholder="Hello, World!" />
    </div>
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GoabInput,
    // add test components here
  ],
})
export class PlaygroundComponent {}
