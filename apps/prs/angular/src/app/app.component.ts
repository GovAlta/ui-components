import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabButton,
  GoabButtonGroup,
  GoabPushDrawer,
  GoabThemeService,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
  GoabWorkspaceLayout,
} from "@abgov/angular-components";
import { PushDrawerHostService } from "../routes/features/feat3347PushDrawer/push-drawer-host.service";
import {
  bugRouteDefinitions,
  docsRouteDefinitions,
  featureRouteDefinitions,
} from "./generated/pr-route-manifest.generated";
import {
  applyTokenVersion,
  resolveTokenVersion,
  TokenVersion,
} from "./token-version/token-version";

// Sentinel URL handled by handleNavigate to toggle tokens instead of routing.
const TOKEN_TOGGLE_URL = "#tokens";

@Component({
  standalone: true,
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styles: ``,
  imports: [
    RouterOutlet,
    GoabAppFooter,
    GoabAppHeader,
    GoabButton,
    GoabButtonGroup,
    GoabPushDrawer,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabWorkSideMenuGroup,
    GoabWorkspaceLayout,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  isFullPage = false;
  isPushDrawerRoute = false;
  readonly bugRouteDefinitions = bugRouteDefinitions;
  readonly featureRouteDefinitions = featureRouteDefinitions;
  readonly docsRouteDefinitions = docsRouteDefinitions;
  readonly baseHref = inject(LocationStrategy).getBaseHref();
  readonly tokenToggleUrl = TOKEN_TOGGLE_URL;
  tokenMode: TokenVersion = resolveTokenVersion();
  readonly pushDrawerParagraphs = Array.from({ length: 30 }, (_, i) => i + 1);

  private fullPageRoutes = ["/features/2885"];
  private router = inject(Router);
  readonly theme = inject(GoabThemeService);
  private pushDrawerHost = inject(PushDrawerHostService);
  readonly pushDrawerOpen = this.pushDrawerHost.open;

  constructor() {
    // Resolve route state synchronously from the current URL so the
    // workspace-layout sees the push-drawer slot on its very first render.
    // Svelte's `$$slots` is captured at mount time — if we wait for the async
    // NavigationEnd, the slot is wired up too late and never gets projected.
    const initialUrl = window.location.pathname.startsWith(this.baseHref)
      ? "/" + window.location.pathname.slice(this.baseHref.length)
      : window.location.pathname;
    this.isFullPage = this.fullPageRoutes.includes(initialUrl);
    this.isPushDrawerRoute = initialUrl.startsWith("/features/3347-push");
    if (this.isPushDrawerRoute) this.pushDrawerHost.openDrawer();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = (event as NavigationEnd).urlAfterRedirects;
        this.isFullPage = this.fullPageRoutes.includes(url);
        this.isPushDrawerRoute = url.startsWith("/features/3347-push");
        if (this.isPushDrawerRoute) this.pushDrawerHost.openDrawer();
      });
  }

  closePushDrawer() {
    this.pushDrawerHost.closeDrawer();
  }

  handleNavigate(path: string): void {
    if (path === TOKEN_TOGGLE_URL) {
      this.tokenMode = this.tokenMode === "v1" ? "v2" : "v1";
      applyTokenVersion(this.tokenMode);
      return;
    }
    if (path === "#toggle-theme") {
      this.theme.toggle();
      return;
    }
    const internal = path.startsWith(this.baseHref)
      ? "/" + path.slice(this.baseHref.length)
      : path;
    this.router.navigateByUrl(internal);
  }
}
