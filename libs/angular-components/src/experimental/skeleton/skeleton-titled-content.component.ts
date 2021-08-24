import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-skeleton-content',
  templateUrl: './skeleton-titled-content.component.html',
  styleUrls: ['./skeleton-element.component.scss'],
})
export class GoASkeletonContentComponent implements OnInit {
  @Input() rows = 1;

  arr = Array;

  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}
}
