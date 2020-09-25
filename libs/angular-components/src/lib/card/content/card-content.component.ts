import { Component, OnInit } from '@angular/core';

/**
 * Content component used for Government of Alberta cards.  
 * Put content inside of component and it will project to the content section of the card.
 * selector: goa-card-content
 * @example <goa-card><goa-card-content>My content</goa-card-content></goa-card>
 */
@Component({
  selector: 'goa-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class GoACardContentComponent implements OnInit {

  constructor() { }
  
  /**
   * @ignore
   */
  ngOnInit(): void {
  }

}
