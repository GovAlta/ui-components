import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

/**
 * Option component with to use with GoADropdown
 */
@Component({
  selector: 'goa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoAOptionComponent implements OnInit {    
  
  /**
   * Is the option currently selected
   * @ignore
   */
  selected = false;
  
  /**
   * The unique id of the option.
   */
  @Input() id: string;

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
   * @ignore
   */
  @ViewChild('optionTemplate') optionTemplate: TemplateRef<any>;

  constructor() {}

  /**
   * Lifecycle hook OnInit
   * @ignore
   */
  ngOnInit() {
    if(this.id === undefined || this.id === null) {
      throw new TypeError(`Input 'id' is required.`);
    }

    if(this.label === undefined || this.label === null) {
      throw new TypeError(`Input 'label' is required.`);
    }

    this.selected = this.defaultSelected;
  }
}
