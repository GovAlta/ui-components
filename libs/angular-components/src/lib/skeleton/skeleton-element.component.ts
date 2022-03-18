import { Component, Input } from '@angular/core';

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

  @Input()
  style?: string;

  @Input()
  class?: string;
}
