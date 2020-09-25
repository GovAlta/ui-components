import { Component, OnInit } from '@angular/core';

/**
 * Header component used for Government of Alberta cards.  
 * Put header content inside of component and it will project to the header section of the card.
 * selector: goa-card-header
 * @example <goa-card><goa-card-header>My content</goa-card-header></goa-card>
 */
@Component({
  selector: 'goa-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class GoACardHeaderComponent implements OnInit {

  constructor() { }
  
  /**
   * @ignore
   */
  ngOnInit(): void {
  }

}
