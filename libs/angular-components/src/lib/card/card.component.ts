import { Component, OnInit, Input } from '@angular/core';

export * from './header/card-header.component';
export * from './footer/card-footer.component';
export * from './thumb/card-thumb.component';
export * from './content/card-content.component';

/**
 * Card component with Government of Alberta styling.
 * Place desired sub-components (goa-card-thumb-image, goa-card-header, goa-card-content, goa-card-footer) inside of content.
 * selector: goa-card
 */
@Component({
  selector: 'goa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class GoACardComponent implements OnInit {

  /**
   * What percentage of container width to take.
   */
  @Input() cardSize: 'third' | 'half' | 'full' | 'auto' = 'full';

  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

}
