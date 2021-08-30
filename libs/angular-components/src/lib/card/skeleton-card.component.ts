import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'goa-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class GoALoadingCardComponent {
  constructor() {}

  @Input() showImage: true;

}
