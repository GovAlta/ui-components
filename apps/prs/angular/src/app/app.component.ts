import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styles: ``,
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {}

  handleNavigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}
