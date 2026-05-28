import { Component, computed, inject } from "@angular/core";
import { GoabWorkspaceLayoutScrollStateService } from "@abgov/angular-components";
import { GoabWorkspaceLayoutScrollState } from "@abgov/ui-components-common";

@Component({
  selector: "app-scroll-state-workspace-layout",
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
      </goab-work-side-menu-group>
    </ng-template>

    <!-- Header reads the live scroll state and collapses once the user scrolls
         past the top. scrollPosition transitions: no-scroll → at-top → middle →
         at-bottom. -->
    <ng-template #pageHeaderTpl>
      <div class="page-header" [class.page-header--collapsed]="collapsed()">
        <h1
          class="page-header__title"
          [class.page-header__title--collapsed]="collapsed()"
        >
          Cases overview
        </h1>
        <goab-badge
          [type]="scrollState.isScrollable() ? 'information' : 'archived'"
          [content]="'scroll: ' + scrollState.scrollPosition()"
        />
      </div>
    </ng-template>

    <ng-template #pageFooterTpl>
      <div class="page-footer">
        State: {{ scrollState.scrollPosition() }} · scrollable:
        {{ scrollState.isScrollable() }}
      </div>
    </ng-template>

    <goab-workspace-layout
      [sideMenu]="sideMenuTpl"
      [pageHeader]="pageHeaderTpl"
      [pageFooter]="pageFooterTpl"
    >
      @if (collapsed()) {
        <div class="back-to-top-bar">
          <div class="back-to-top-bar__action">
            <goab-button type="secondary" size="compact" leadingIcon="arrow-up">
              Back to top
            </goab-button>
          </div>
        </div>
      }
      <div class="content">
        <h2 class="content__heading">Reacting to scroll state</h2>
        <p>
          The header above shows the live <code>scrollPosition</code> read from
          <code>GoabWorkspaceLayoutScrollStateService</code>. As you scroll,
          the header collapses (smaller padding + smaller heading) and a
          "Back to top" button appears once you have moved off the top.
        </p>
        @for (n of paragraphs; track n) {
          <p>
            Paragraph {{ n }} — scroll through this content to drive the scroll
            state changes above.
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
        background: var(--goa-color-greyscale-white);
        transition: padding 0.15s ease;
      }
      .page-header--collapsed {
        padding: var(--goa-space-xs) var(--goa-space-l);
      }
      .page-header__title {
        margin: 0;
        font-size: var(--goa-font-size-5);
        transition: font-size 0.15s ease;
      }
      .page-header__title--collapsed {
        font-size: var(--goa-font-size-4);
      }
      .page-footer {
        padding: var(--goa-space-m) var(--goa-space-l);
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-2);
      }
      .back-to-top-bar {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        justify-content: flex-end;
        padding: var(--goa-space-s) var(--goa-space-l);
        pointer-events: none;
      }
      .back-to-top-bar__action {
        pointer-events: auto;
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
export class WorkspaceLayoutScrollStateComponent {
  scrollState = inject(GoabWorkspaceLayoutScrollStateService);
  paragraphs = Array.from({ length: 40 }, (_, i) => i + 1);

  // Collapse the header once the user moves off the top.
  collapsed = computed(() => {
    const pos = this.scrollState.scrollPosition();
    return (
      pos === GoabWorkspaceLayoutScrollState.MIDDLE ||
      pos === GoabWorkspaceLayoutScrollState.AT_BOTTOM
    );
  });
}
