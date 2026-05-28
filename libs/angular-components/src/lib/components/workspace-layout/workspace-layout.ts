import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabWorkspaceLayoutOnScrollStateChangeDetail } from "@abgov/ui-components-common";
import { GoabWorkspaceLayoutScrollStateService } from "./workspace-layout-scroll-state.service";

@Component({
  standalone: true,
  selector: "goab-workspace-layout",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-workspace-layout
      [attr.testid]="testId"
      (_scrollStateChange)="_onScrollStateChange($event)"
    >
      @if (sideMenu) {
        <div slot="side-menu">
          <ng-container [ngTemplateOutlet]="sideMenu"></ng-container>
        </div>
      }
      @if (pageHeader) {
        <div slot="page-header">
          <ng-container [ngTemplateOutlet]="pageHeader"></ng-container>
        </div>
      }
      <ng-content />
      @if (pageFooter) {
        <div slot="page-footer">
          <ng-container [ngTemplateOutlet]="pageFooter"></ng-container>
        </div>
      }
      @if (pushDrawer) {
        <div slot="push-drawer">
          <ng-container [ngTemplateOutlet]="pushDrawer"></ng-container>
        </div>
      }
    </goa-workspace-layout>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkspaceLayout implements OnInit {
  /** Template ref for the side navigation region (e.g. work-side-menu). */
  @Input() sideMenu?: TemplateRef<unknown>;
  /** Template ref for the sticky page header region. */
  @Input() pageHeader?: TemplateRef<unknown>;
  /** Template ref for the sticky page footer region. */
  @Input() pageFooter?: TemplateRef<unknown>;
  /**
   * Template ref for a GoabPushDrawer rendered as a sibling of the main card.
   * Use when the page needs a push drawer alongside the workspace layout —
   * the layout gives it the shell-level height and flex context. The side
   * menu is not pushed; only the card is.
   */
  @Input() pushDrawer?: TemplateRef<unknown>;
  /** Sets the data-testid attribute for automated testing. */
  @Input() testId?: string;

  /**
   * Emitted whenever the internal scroll state changes (no-scroll → at-top →
   * middle → at-bottom).
   */
  @Output() onScrollStateChange =
    new EventEmitter<GoabWorkspaceLayoutOnScrollStateChangeDetail>();

  isReady = false;

  private cdr = inject(ChangeDetectorRef);
  private scrollStateService = inject(GoabWorkspaceLayoutScrollStateService);

  ngOnInit(): void {
    // For Angular, delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onScrollStateChange(e: Event) {
    const detail = (e as CustomEvent<GoabWorkspaceLayoutOnScrollStateChangeDetail>)
      .detail;
    this.scrollStateService._setState(detail.state, detail.isScrollable);
    this.onScrollStateChange.emit({ ...detail, event: e });
  }
}
