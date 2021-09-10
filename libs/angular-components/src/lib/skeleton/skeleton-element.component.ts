import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'goa-skeleton-element',
  templateUrl: './skeleton-element.component.html',
  styleUrls: ['./skeleton-element.component.scss'],
})
export class GoASkeletonElementComponent {
  @Input() type:
    | 'text'
    | 'avatar'
    | 'title'
    | 'paragraph'
    | 'thumbnail'
    | 'card' = 'text';

  constructor() {}

  get elementClass(): string {
    return `skeleton ${this.type}`;
  }

}
