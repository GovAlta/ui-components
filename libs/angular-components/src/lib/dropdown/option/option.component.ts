import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'goa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Option component with to use with GoADropdown
 */
export class GoAOptionComponent implements OnInit {    
  
  /**
   * Is the option currently selected
   */
  selected = false;
  
  /**
   * The unique id of the option;
   */
  @Input() id = '';

  /**
   * The value for the option
   */
  @Input() value: any; 

  /**
   * Label to be used for option.
   */
  @Input() label: string;

  /**
   * Is the option selected by default?
   */
  @Input() defaultSelected = false;

  /**
   * The option template
   */
  @ViewChild('optionTemplate') optionTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {
    if(this.label === undefined || this.label === null) {
      throw new TypeError(`Input 'label' is requred.`);
    }

    this.selected = this.defaultSelected;
  }
}
