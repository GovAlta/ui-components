import { GoabSkeleton } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-skeleton",
  templateUrl: "./skeleton.component.html",
  imports: [
    GoabSkeleton,
  ]
})
export class SkeletonComponent {
  constructor() { }
}
