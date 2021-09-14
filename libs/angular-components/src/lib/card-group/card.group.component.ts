import { Component, OnInit, Input } from '@angular/core';

interface CardItem {
  title: string;
  /** Card description */
  description?: string;
  /** Card image , display on top of title */
  cardImageUrl?: string;
  /** Display card size to allow card responsively show in different device*/
  cardWidth?: number;
  /** Navigation to relate webside from Card title */
  titleUrl?: string;
}

/**
 * A wrapper/group for a set of card display
 */
@Component({
  selector: 'goa-card-group',
  templateUrl: './card.group.component.html',
  styleUrls: ['./card.group.component.scss'],
})
export class GoACardGroupComponent implements OnInit {
  /**
   * The appearance style of the button.
   */
  @Input() layout: 'basic' | 'column';

  /**
   * Title header text.
   */
  @Input() title: string;

  /**
   * Card Items JSON array
   */
  @Input() cardItems?: CardItem[];

  constructor() { }

  /* eslint-disable @angular-eslint/no-empty-lifecycle-method */
  ngOnInit() { }
}
