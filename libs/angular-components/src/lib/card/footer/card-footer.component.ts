import { Component, OnInit } from '@angular/core';

/**
 * Footer component used for Government of Alberta cards.  
 * Put footer content inside of component and it will project to the confootertent section of the card.
 * selector: goa-card-footer
 * @example <goa-card><goa-card-footer>My content</goa-card-footer></goa-card>
 */
@Component({
  selector: 'goa-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class GoACardFooterComponent implements OnInit {

  constructor() { }
  
  /**
   * @ignore
   */
  ngOnInit(): void {
  }

}
