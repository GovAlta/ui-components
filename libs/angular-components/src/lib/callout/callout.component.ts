import { Component, OnInit, Input } from '@angular/core';
/**
 * Callout component to describe important changes or facts.
 */
@Component({
  selector: 'goa-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss']
})
export class GoACalloutComponent implements OnInit {
  /**
   * The type of the callout, changes stylings and icons.
   */
  @Input() type: 'important' | 'information' | 'event' | 'emergency' = 'information';

  /**
   * The title of callout 
   */
  @Input() title: string; 
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
    if(this.title === undefined || this.title === null) {
      throw new TypeError(`Input 'title' is required.`);
    }
  }
}
