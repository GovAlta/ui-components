import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-skeleton-grid-column',
  templateUrl: './skeleton-grid-column.component.html',
  styleUrls: ['./skeleton-element.component.scss'],
})
export class GoASkeletonGridColumnComponent {
  @Input() rows = 1;

  arr = Array;

  constructor() {}

}
