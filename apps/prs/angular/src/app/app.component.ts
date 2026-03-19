import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styles: ``,
  standalone: false,
})
export class AppComponent {
  isFullPage = false;

  private fullPageRoutes = ["/features/2885"];

  constructor(private router: Router) {
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
