import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
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
    this.router.navigateByUrl(path);
  }
}
