import { Component, OnInit, Input, QueryList, ContentChildren, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { GoAOptionComponent } from '../option/option.component';

@Component({
  selector: 'goa-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss']
})
/**
 * Option component with to use with GoADropdown
 */
export class GoAOptionGroupComponent implements OnInit {
  
  /**
   * Filtered options to show in the view.
   */
  _filteredOptions: Array<GoAOptionComponent>;

  /**
   * The label of the option group
   */
  @Input() label: string;

  /** 
   * The defined options.  
   */
  @ContentChildren(GoAOptionComponent, {descendants: true}) options: QueryList<GoAOptionComponent>;

  /**
   * The option template
   */
  @ViewChild('optionGroupTemplate') optionGroupTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if(this.label === undefined || this.label === null || this.label === '') {
      throw new TypeError(`The input 'label' is required.`);
    }
  }

  ngAfterViewInit() {
    this._filteredOptions = [...this.options];
    // The template output cache is populated by child components during render, so tell angular that there have been changes during the render here.
    this.cdr.detectChanges();
  }
}
