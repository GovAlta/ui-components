import { GoABSkeleton } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-skeleton",
  templateUrl: "./skeleton.component.html",
  imports: [
    GoABSkeleton,
  ]
})
export class SkeletonComponent {
  constructor() { }
}
