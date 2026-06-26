import { Component, computed, inject } from "@angular/core";
import {
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
  GoabWorkspaceLayoutScrollStateService,
} from "@abgov/angular-components";

/**
 * Scroll-state example, isolated in its own component so its
 * GoabWorkspaceLayoutScrollStateService instance does not cross-talk with the
 * other workspace layouts stacked on the same docs page (the service is normally
 * root-scoped, and "most recent update wins").
 */
@Component({
  standalone: true,
  selector: "abgov-docs-wsl-scroll-monitor",
  providers: [GoabWorkspaceLayoutScrollStateService],
  imports: [GoabWorkspaceLayout, GoabWorkSideMenu, GoabWorkSideMenuItem, GoabText],
  template: `
    <goab-workspace-layout [sideMenu]="sideMenuTpl" [pageHeader]="pageHeaderTpl">
      <div style="padding: 24px">
        @for (n of rows; track n) {
          <p>Case row {{ n }}</p>
        }
      </div>
    </goab-workspace-layout>

    <ng-template #pageHeaderTpl>
      <goab-text tag="h1" size="heading-m" mt="none" mb="none">My cases</goab-text>
      @if (!collapsed()) {
        <goab-text size="body-s" mt="none" mb="none"
          >Scroll down to collapse this subtitle.</goab-text
        >
      }
    </ng-template>

    <ng-template #sideMenuTpl>
      <goab-work-side-menu
        heading="Workspace layout"
        url="/"
        [primaryContent]="menuItems"
      ></goab-work-side-menu>
    </ng-template>
    <ng-template #menuItems>
      <goab-work-side-menu-item
        icon="grid"
        label="Dashboard"
        url="/dashboard"
      ></goab-work-side-menu-item>
      <goab-work-side-menu-item icon="list" label="Cases" url="/cases"></goab-work-side-menu-item>
    </ng-template>
  `,
})
export class DocsWorkspaceLayoutScrollMonitorComponent {
  rows = Array.from({ length: 20 }, (_, i) => i + 1);

  private scrollState = inject(GoabWorkspaceLayoutScrollStateService);

  // Collapse once the user scrolls past the top.
  collapsed = computed(() => {
    const pos = this.scrollState.scrollPosition();
    return pos === "middle" || pos === "at-bottom";
  });
}
