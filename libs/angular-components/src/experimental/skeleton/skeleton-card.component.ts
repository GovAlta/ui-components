import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'goa-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: [],
})
export class GoALoadingCardComponent implements OnInit {
  constructor() {}

  @Input() showImage: true;

  /**
   * @ignore
   */
  ngOnInit() {}
}
