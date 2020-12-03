import { Component, OnInit, Input } from '@angular/core';

/**
 * cardImage image component used for Government of Alberta cards.
 * It will project to the content section of the card.
 * selector: goa-card-thumb-image
 * @example <goa-card><goa-card-thumb-image url="" alt=""></goa-card-thumb-image></goa-card>
 */
@Component({
  selector: 'goa-card-thumb-image',
  templateUrl: './card-thumb-image.component.html',
  styleUrls: ['./card-thumb.component.scss'],
})
export class GoACardThumbImageComponent implements OnInit {
  /**
   * The url of the image.
   */
  @Input() url: string;
  /**
   * The alt text for the image.
   */
  @Input() alt: string;

  constructor() {}

  /**
   * @ignore
   */
  ngOnInit(): void {}
}
