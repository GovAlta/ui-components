import { Component } from "@angular/core";
import {
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from "@abgov/angular-components";
import { DocsWorkspaceLayoutScrollMonitorComponent } from "./workspace-layout-scroll-monitor.component";

@Component({
  standalone: true,
  selector: "abgov-docs-workspace-layout",
  templateUrl: "./workspace-layout.component.html",
  imports: [
    GoabWorkspaceLayout,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabText,
    GoabButton,
    GoabButtonGroup,
    GoabPushDrawer,
    DocsWorkspaceLayoutScrollMonitorComponent,
  ],
  styles: [
    `
      .wsl-demo {
        margin-bottom: var(--goa-space-2xl, 3rem);
      }
      /* goab-workspace-layout fills the viewport (100vh) by default. Bound each
         demo so they stack on this page; !important overrides the web
         component's :host height rule. */
      :host ::ng-deep goab-workspace-layout,
      :host ::ng-deep abgov-docs-wsl-scroll-monitor {
        display: block;
      }
      :host ::ng-deep goa-workspace-layout {
        height: 600px !important;
      }
    `,
  ],
})
export class DocsWorkspaceLayoutComponent {
  rows = Array.from({ length: 16 }, (_, i) => i + 1);
  open = false;

  handleNavigate(path: string): void {
    console.log("navigate", path);
  }
}
