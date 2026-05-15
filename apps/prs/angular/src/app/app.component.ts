import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { Router, NavigationEnd, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";
import {
  GoabAppFooter,
  GoabAppHeader,
  GoabMicrositeHeader,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuGroup,
} from "@abgov/angular-components";
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
    GoabMicrositeHeader,
    GoabWorkSideMenu,
    GoabWorkSideMenuItem,
    GoabWorkSideMenuGroup,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  isFullPage = false;
  readonly workSideMenuHeight = "calc(100vh - 10.1875rem)";
  readonly bugRouteDefinitions = bugRouteDefinitions;
  readonly featureRouteDefinitions = featureRouteDefinitions;
  readonly docsRouteDefinitions = docsRouteDefinitions;
  readonly baseHref = inject(LocationStrategy).getBaseHref();
  readonly tokenToggleUrl = TOKEN_TOGGLE_URL;
  tokenMode: TokenVersion = resolveTokenVersion();

  private fullPageRoutes = ["/features/2885"];
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isFullPage = this.fullPageRoutes.includes(
          (event as NavigationEnd).urlAfterRedirects,
        );
      });
  }

  handleNavigate(path: string): void {
    if (path === TOKEN_TOGGLE_URL) {
      this.tokenMode = this.tokenMode === "v1" ? "v2" : "v1";
      applyTokenVersion(this.tokenMode);
      return;
    }
    const internal = path.startsWith(this.baseHref)
      ? "/" + path.slice(this.baseHref.length)
      : path;
    this.router.navigateByUrl(internal);
  }
}
