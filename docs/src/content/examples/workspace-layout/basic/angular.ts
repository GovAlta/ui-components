import { Component } from "@angular/core";

@Component({
  selector: "app-basic-workspace-layout",
  template: `
    <ng-template #sideMenuTpl>
      <goab-work-side-menu
        heading="Workspace"
        url="/"
        [open]="true"
        [primaryContent]="primaryTpl"
      />
    </ng-template>

    <ng-template #primaryTpl>
      <goab-work-side-menu-group icon="grid" heading="Work">
        <goab-work-side-menu-item icon="document" label="Cases" url="/cases" />
        <goab-work-side-menu-item icon="folder" label="Documents" url="/documents" />
        <goab-work-side-menu-item icon="bar-chart" label="Reports" url="/reports" />
      </goab-work-side-menu-group>
      <goab-work-side-menu-group icon="settings" heading="Admin">
        <goab-work-side-menu-item icon="people" label="Users" url="/users" />
        <goab-work-side-menu-item icon="cog" label="Settings" url="/settings" />
      </goab-work-side-menu-group>
    </ng-template>

    <ng-template #pageHeaderTpl>
      <div class="page-header">
        <h1 class="page-header__title">Cases overview</h1>
        <span class="page-header__actions">Page header actions</span>
      </div>
    </ng-template>

    <ng-template #pageFooterTpl>
      <div class="page-footer">Last updated 2 minutes ago</div>
    </ng-template>

    <goab-workspace-layout
      [sideMenu]="sideMenuTpl"
      [pageHeader]="pageHeaderTpl"
      [pageFooter]="pageFooterTpl"
    >
      <div class="content">
        <h2 class="content__heading">About this workspace</h2>
        @for (n of paragraphs; track n) {
          <p>
            Paragraph {{ n }} — long-running text content. Scroll the main area: the
            side menu, page header, and page footer stay fixed while content
            scrolls inside the card. A soft shadow appears under the sticky
            header once content scrolls past it.
          </p>
        }
      </div>
    </goab-workspace-layout>
  `,
  styles: [
    `
      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--goa-space-m) var(--goa-space-l);
      }
      .page-header__title {
        margin: 0;
        font-size: var(--goa-font-size-5);
      }
      .page-header__actions {
        color: var(--goa-color-text-secondary);
      }
      .page-footer {
        padding: var(--goa-space-m) var(--goa-space-l);
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-2);
      }
      .content {
        padding: var(--goa-space-l);
      }
      .content__heading {
        margin-top: 0;
      }
    `,
  ],
})
export class BasicWorkspaceLayoutComponent {
  paragraphs = Array.from({ length: 25 }, (_, i) => i + 1);
}
