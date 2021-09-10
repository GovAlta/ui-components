import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-skeleton-image-content',
  templateUrl: './skeleton-image-content.component.html',
  styleUrls: ['./skeleton-element.component.scss'],
})
export class GoASkeletonImageContentComponent {
  @Input() rows = 1;

  arr = Array;
  constructor() {}


}
