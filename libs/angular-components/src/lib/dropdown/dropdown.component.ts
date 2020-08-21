import { Component, OnInit, AfterViewInit, Input, Output, ContentChildren, EventEmitter, ElementRef, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';

import { GoAOptionComponent } from './option/option.component';
import { GoAOptionGroupComponent } from './option-group/option-group.component';

@Component({
  selector: 'goa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
/**
 * Dropdown component with Government of Alberta styling.
 */
export class GoADropdownComponent implements OnInit, AfterViewInit {
  /**
   * The label for the dropdown.
   */
  @Input() label: string;

  /**
   * Helper text description of the dropdown.
   */
  @Input() description: string;

  /**
   * Is the select disabled.
   */
  @Input() disabled = false;

  /**
   * Is multiple selection?
   */
  @Input() multiple = false;

  /**
   * Is a selection required?
   */
  @Input() required = false;

  /**
   * The select element.
   */
  @ViewChild('selector') selector: ElementRef<HTMLSelectElement>;

  /** 
   * All options options.  
   */
  @ContentChildren(GoAOptionComponent, {descendants: true}) allOptions: QueryList<GoAOptionComponent>;

  /** 
   * The top level options for rendering options.  
   */
  @ContentChildren(GoAOptionComponent, {descendants: false}) options: QueryList<GoAOptionComponent>;

  /** 
   * The option groups for rendering.  
   */
  @ContentChildren(GoAOptionGroupComponent, {descendants: false}) optionGroups: QueryList<GoAOptionGroupComponent>;

   /**
   * Event emitted containing the value field of all selected options when the selection changes.  
   */
  @Output() selectionChange = new EventEmitter<Array<any>>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // The template output cache is populated by child components during render, so tell angular that there have been changes during the render here.
    this.cdr.detectChanges();
  }

  /**
   * Is there a error because no element is selected and required is true?
   */
  get requiredError(): boolean {
    const values = this.selectedItems;
    return this.required === true && values.length === 0;
  }

  onChanged(valueChanged: any) {   
    const options = this.selectedItems;
    const values = options.map((option) => {
      return option.value;
    });
    
    this.selectionChange.emit(values);
  }

  private get selectedItems(): Array<GoAOptionComponent> { 
    if(!this.selector) {
      return [];
    }

    const selectedOptionValues = Array.from(this.selector.nativeElement.selectedOptions).map((option) => {      
      return option.value;
    });

    return this.allOptions.filter((option) => {
      return selectedOptionValues.filter((selectedOption) => {   
        return option.id === selectedOption;
      }).length > 0;
    });
  }
}
